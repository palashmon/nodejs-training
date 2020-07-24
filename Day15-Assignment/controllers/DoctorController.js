/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming User/Doctor/Patient requests.
 * @help        :: See https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes
 */

const moment = require('moment');
const mongoose = require('mongoose');
const UserService = require('../services/UserService');
const AppointmentService = require('../services/AppointmentService');
const ApiResponse = require('../helpers/apiResponse');
const Utility = require('../helpers/utility');

/**
 * Get all the active status doctors
 *
 */
exports.getAllDoctors = UserService.getAllDoctors;

/**
 * Get all the open slots for a given doctor
 *
 */
exports.getAvailableSlots = async (req, res) => {
  try {
    // Get doctor id
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return ApiResponse.validationErrorWithData(res, 'Invalid Error.', 'Invalid Doctor ID');
    }

    const now = moment(new Date()); //.hour(12).minutes(1);
    //now.add(1, 'days');
    //console.log(now);

    const nextTwoDays = now.clone().add(1, 'days');
    const configuration = Utility.getConfig();

    const startAt = configuration.firstAppointmentHour || '10:00';
    const stopAt = configuration.lastAppointmentHour || '16:00';
    const duration = configuration.appointmentTime || 30;

    const response = {};
    response.open_slots = [];
    const appointmentHours = [];

    let firstAppointmentHour = moment(startAt, 'HH:mm');
    const firstAppointmentHourToday = moment(startAt, 'HH:mm');
    const lastAppointmentHourToday = moment(stopAt, 'HH:mm');

    // Validate firstAppointmentHour is less than lastAppointmentHourToday
    if (now >= lastAppointmentHourToday) {
      firstAppointmentHour.add(1, 'days');
      firstAppointmentHourToday.add(1, 'days');
      lastAppointmentHourToday.add(1, 'days');
      nextTwoDays.add(1, 'days');
    }

    // Load slots starting from current time or after it only
    if (now >= firstAppointmentHour) {
      const currentMin = now.minute();

      if (currentMin >= 30) {
        firstAppointmentHour = now.clone().add(1, 'hours').minutes(0);
      } else if (currentMin >= 0) {
        firstAppointmentHour = now.clone().minutes(0).add(30, 'minutes');
      }
    }

    const lastAppointmentHour = nextTwoDays.hour(+stopAt.split(':')[0]).minutes(+stopAt.split(':')[1]);
    const appointmentObj = { id, firstAppointmentHour, lastAppointmentHour };

    // Get slots for selected doctor for next 2 days
    const data = await UserService.getFilledSlots(appointmentObj);

    // If no valid doctor was found
    if (!data.doctor) return ApiResponse.error(res, 'No doctor was found with given id');
    if (!data.slots) return ApiResponse.error(res, 'No slots were found for selected doctor');

    response.doctor = data.doctor;
    //data.slots = data.slots.map(({ date }) => moment(date));

    const startFormatted = firstAppointmentHourToday.format('hh:mm A');
    const endFormatted = lastAppointmentHourToday.format('hh:mm A');
    response.doctor_schedule = `Everyday from ${startFormatted} - ${endFormatted} for ${duration} minutes each`;

    while (firstAppointmentHour < lastAppointmentHour) {
      if (firstAppointmentHour < lastAppointmentHourToday) {
        // Check if any appointment slot have already been taken
        const isOpenSlot = data.slots.every(({ date }) => moment(date).diff(firstAppointmentHour, 'minutes') !== 0);

        // Skip the already taken slots
        if (isOpenSlot) appointmentHours.push(firstAppointmentHour.clone().utc().toDate());
        firstAppointmentHour.add(duration, 'minutes');
      } else {
        firstAppointmentHour = firstAppointmentHourToday.add(1, 'days');
        lastAppointmentHourToday.add(1, 'days');
      }
    }
    appointmentHours.sort((a, b) => +new Date(a) - +new Date(b));
    response.open_slots = Utility.formatDates(Utility.eliminateDuplicates(appointmentHours));

    //console.log(appointmentHours);
    //res.status(200).json({ response });
    ApiResponse.successWithData(res, 'Available Slots:', response);
    //res.status(200).json('Hi');
  } catch (error) {
    ApiResponse.error(res, error.stack);
  }
};

/**
 * Set an appointment with the selected doctor
 *
 */
exports.setAppointment = async (req, res) => {
  try {
    // Create a new appointment object
    const appointment = {
      doctorId: req.params.id,
      patientId: req.user._id,
      date: req.body.date,
    };

    const status = await AppointmentService.saveAppointment(appointment);
    if (status && status === 1) {
      ApiResponse.success(res, 'New Appointment successfully created!');
    } else if (status === -1) {
      ApiResponse.error(res, 'Please provide a valid date first in `DD-MM-YYYY hh:mm A` format');
    } else if (status === -2) {
      ApiResponse.error(res, 'Please select a valid time slot. Visit /api/doctor/:id/slots to find one.');
    } else if (status === -3) {
      ApiResponse.error(
        res,
        'Selected doctor has already an appointment on same date & time. Please select a different slot.'
      );
    } else if (status === -4) {
      ApiResponse.error(
        res,
        'You already have an appointment on same date & time with different doctor. Please select a different slot.'
      );
    }
  } catch (error) {
    ApiResponse.error(res, error.message);
  }
};

/**
 * Get all appointments for the selected doctor
 *
 */
exports.getAppointments = async (req, res) => {
  try {
    const { date } = req.params;

    // Date should be in DD-MM-YYYY format
    // If no date is passed, then it defaults to today's date
    const format = 'DD-MM-YYYY';
    if (date && !moment(date, format, true).isValid()) {
      return ApiResponse.error(res, 'Please provide a valid date in `DD-MM-YYYY` format');
    }
    const selectedDate = date ? moment(date, [format]).startOf('day') : moment(new Date());

    // Create a new appointment object
    const appointmentObj = { doctorId: req.user._id, date: selectedDate };
    const appointments = await AppointmentService.getDoctorAppointments(appointmentObj);

    if (appointments && appointments.length) {
      ApiResponse.successWithData(res, 'Upcoming Appointments found!', appointments);
    } else {
      ApiResponse.error(res, 'No appointments were found for selected doctor!');
    }
  } catch (error) {
    ApiResponse.error(res, error.message);
  }
};

/**
 * A doctor should have the option to close (seen patient) or cancel (patient no-show) appointments
 * i.e. status will change to 'Closed' or 'Cancelled'
 */
exports.updateAppointmentStatus = async (req, res) => {
  try {
    // Get appointment id
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return ApiResponse.validationErrorWithData(res, 'Invalid Error.', 'Invalid Appointment ID');
    }

    // Find appointment with selected id
    const appointment = await AppointmentService.findAppointmentById(id);

    if (appointment === null) {
      return ApiResponse.notFound(res, 'Appointment not exists with this id');
    }

    //Check authorized user
    // Only the doctor who is assigned to the appointment, should be able to update the status
    if (appointment.doctorId.toString() !== req.user._id) {
      return ApiResponse.unauthorized(res, 'You are not authorized to do this operation.');
    }

    const statusEnum = ['open', 'closed', 'cancelled'];
    if (!status || status.trim() === '' || !statusEnum.includes(status.toLowerCase())) {
      return ApiResponse.validationErrorWithData(
        res,
        'Invalid Error.',
        "Please select a valid status: 'Open', 'Closed' or 'Cancelled'"
      );
    }

    // Create a new appointment object
    const appointmentObj = {
      id: req.params.id,
      status: Utility.capitalize(status),
    };

    await AppointmentService.updateAppointmentStatus(appointmentObj);
    ApiResponse.success(res, 'Appointment has been updated successfully!');
  } catch (error) {
    ApiResponse.error(res, error.message);
  }
};

/**
 * Get all appointments summary with all doctor's and patient info for selected month
 */
exports.getMonthlyReport = async (req, res) => {
  try {
    // Get month id by number.. 0 = Jan & 11 = Dec respectively
    const currentMonth = moment(new Date()).month();
    const { month = currentMonth } = req.params;

    const data = await AppointmentService.getMonthlyReport(month);
    ApiResponse.successWithData(res, 'Appointment Monthly Report', data);
  } catch (error) {
    ApiResponse.error(res, error.message);
  }
};

/**
 * Get appointment Detailed Report for a single appointment
 */
exports.getAppointmentDetailsReport = async (req, res) => {
  try {
    // Get appointment id
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return ApiResponse.validationErrorWithData(res, 'Invalid Error.', 'Invalid Appointment ID');
    }

    const appointment = await AppointmentService.getAppointmentById(id);
    ApiResponse.successWithData(res, 'Appointment Details:', appointment);
  } catch (error) {
    ApiResponse.error(res, error.message);
  }
};
