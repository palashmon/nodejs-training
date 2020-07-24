/**
 * User Service
 *
 * @description :: This service is used to handle all `User` related database calls.
 */

const User = require('../models/UserModel');
const Appointment = require('../models/AppointmentModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ApiResponse = require('../helpers/apiResponse');

/**
 * Business logic to registering a new Patient or Doctor
 */
function register(req, res) {
  //hash input password
  bcrypt.hash(req.body.password, 10, function (err, hash) {
    if (err) {
      return ApiResponse.error(res, err.message);
    }

    // Create User object with escaped and trimmed data
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash,
      role: req.body.role,
    });

    // Save user.
    user.save(function (err) {
      if (err) {
        return ApiResponse.error(res, err.message);
      }
      let userData = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };
      return ApiResponse.successWithData(res, 'Registration Success.', userData);
    });
  });
}

/**
 * Business logic to sign in into the app
 */
function login(req, res) {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        //Compare given password with db's hash.
        bcrypt.compare(req.body.password, user.password, function (err, same) {
          if (err) {
            return ApiResponse.error(res, err.message);
          }
          if (same) {
            // Check User's account active or not.
            if (user.isActive) {
              let userData = {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
              };
              //Prepare JWT token for authentication
              const jwtPayload = userData;
              const jwtData = { expiresIn: process.env.JWT_TIMEOUT_DURATION };
              const secret = process.env.JWT_SECRET;
              //Generated JWT token with Payload and secret.
              userData.token = jwt.sign(jwtPayload, secret, jwtData);
              return ApiResponse.successWithData(res, 'Login Success.', userData);
            } else {
              return ApiResponse.unauthorized(res, 'Account is not active. Please contact admin.');
            }
          } else {
            return ApiResponse.unauthorized(res, 'Email or Password wrong.');
          }
        });
      } else {
        return ApiResponse.unauthorized(res, 'Email or Password wrong.');
      }
    })
    .catch((error) => {
      return ApiResponse.error(res, error.message);
    });
}

function getAllDoctors(req, res) {
  User.find({ role: 'Doctor', isActive: true }).then((data) => {
    const doctors = data.map((doctor) => {
      return { _id: doctor._id, name: doctor.fullName, email: doctor.email };
    });
    res.status(200).json({ doctors });
  });
}

async function getFilledSlots(obj) {
  const response = { doctor: null, slots: null };
  const { id: doctorId, firstAppointmentHour, lastAppointmentHour } = obj;

  // Check if a doctor exists with the given id first
  const doctor = await User.findById(doctorId);
  if (!doctor) return response;

  // Get all the filled slots for a day for the selected doctor
  // Filled slots means the slots that have been already assigned to an appointment
  const params = {
    doctorId,
    status: 'Open',
    date: {
      $gte: firstAppointmentHour.toDate(),
      $lt: lastAppointmentHour.toDate(),
    },
  };
  const slots = await Appointment.find(params).sort({ date: 1 }).select('date -_id').exec();
  response.doctor = doctor.fullName;
  if (!slots) return response;

  response.slots = slots;
  return response;
}

module.exports = {
  register,
  login,
  getAllDoctors,
  getFilledSlots,
};
