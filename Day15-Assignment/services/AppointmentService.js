/**
 * Appointment Service
 *
 * @description :: This service is used to handle all Appointment related database calls.
 */

const Appointment = require('../models/AppointmentModel');
const moment = require('moment');

/**
 * Save an appointment with the selected doctor in database
 *
 */
async function saveAppointment(appointmentObj) {
  try {
    // Please provide a valid date first in `DD-MM-YYYY hh:mm A` format
    if (!appointmentObj.date) return -1;

    // Check if date string is in correct format
    const format = 'DD-MM-YYYY hh:mm A';
    if (!moment(appointmentObj.date, format, true).isValid()) return -1;

    const selectedDate = moment(appointmentObj.date, [format]).seconds(0);
    appointmentObj.date = selectedDate.clone();

    // Please select a valid time slot, like 10.30am, 11.00am, etc
    // 10.45am, 11.10am etc are not valid
    if (selectedDate.minute() !== 0 && selectedDate.minute() !== 30) return -2;

    // Check if the doctor has any open appointment on same date and time
    const { doctorId, patientId } = appointmentObj;
    const params = { doctorId, status: 'Open', date: selectedDate };

    const data = await Appointment.find(params).exec();
    if (data && data.length) {
      // Doctor has an open appointment on same date and time
      return -3;
    }

    // Check if the patient has any open appointment on same date and time with other doctor
    const params2 = { patientId, status: 'Open', date: selectedDate };
    const data2 = await Appointment.find(params2).exec();
    if (data2 && data2.length) {
      // Patient has an open appointment on same date and time
      return -4;
    }

    // Create a new appointment instance
    const newAppointment = new Appointment(appointmentObj);
    await newAppointment.save();
    return 1;
  } catch (error) {
    throw error;
  }
}

/**
 * Get all appointments for the selected doctor
 *
 */
async function getDoctorAppointments(appointmentObj) {
  try {
    // Find all appointments between start and end of the selected date
    const params = {
      doctorId: appointmentObj.doctorId,
      status: 'Open',
      date: {
        $gte: appointmentObj.date.startOf('day').toDate(),
        $lt: appointmentObj.date.endOf('day').toDate(),
      },
    };

    const data = await Appointment.find(params).sort({ date: 1 }).populate('patientId').exec();

    const appointments = data.map((d) => {
      return {
        _id: d._id,
        patient: {
          //_id: d.patientId._id,
          name: d.patientId.fullName,
          email: d.patientId.email,
        },
        date: moment(d.date).format('DD.MM.YYYY hh:mm A'),
      };
    });
    return appointments;
  } catch (error) {
    throw error;
  }
}

async function findAppointmentById(id) {
  return await Appointment.findById(id).exec();
}

async function getAppointmentById(id) {
  const d = await Appointment.findById(id)
    .select('patientId doctorId status date -_id')
    .populate({ path: 'patientId', select: 'firstName lastName email -_id' })
    .populate({ path: 'doctorId', select: 'firstName lastName email -_id' })
    .exec();

  const appointment = {
    status: d.status,
    patient: {
      name: d.patientId.fullName,
      email: d.patientId.email,
    },
    doctor: {
      name: d.doctorId.fullName,
      email: d.doctorId.email,
    },
    date: moment(d.date).format('DD.MM.YYYY hh:mm A'),
  };

  return appointment;
}

/**
 * Update selected appointment status
 *
 */
async function updateAppointmentStatus(appointmentObj) {
  const { id, status } = appointmentObj;
  return await Appointment.findByIdAndUpdate(id, { status }).exec();
}

/**
 * Get all appointments summary with all doctor's and patient info for selected month
 *
 */
async function getMonthlyReport(month) {
  try {
    // Get date based on selected month
    const date = moment().month(month);

    // Get first and last day of selected month
    const startDate = date.clone().startOf('month');
    const endDate = date.clone().endOf('month');

    // Get all appointments within above date range
    const params = {
      date: {
        $gte: startDate.toDate(),
        $lt: endDate.toDate(),
      },
    };

    const data = await Appointment.find(params)
      .select('patientId doctorId status date -_id')
      .sort({ date: 1 })
      .populate({ path: 'patientId', select: 'firstName lastName email -_id' })
      .populate({ path: 'doctorId', select: 'firstName lastName email -_id' })
      .exec();

    const appointments = data.map((d) => {
      return {
        status: d.status,
        patient: {
          name: d.patientId.fullName,
          email: d.patientId.email,
        },
        doctor: {
          name: d.doctorId.fullName,
          email: d.doctorId.email,
        },
        date: moment(d.date).format('DD.MM.YYYY hh:mm A'),
      };
    });

    return appointments;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  saveAppointment,
  getDoctorAppointments,
  getAppointmentById,
  findAppointmentById,
  updateAppointmentStatus,
  getMonthlyReport,
};
