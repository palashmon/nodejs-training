/**
 * Appointment Model
 *
 * @description :: This represents the Appointment table
 * @help        :: See https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statusEnum = ['Open', 'Closed', 'Cancelled'];
const AppointmentSchema = new Schema(
  {
    patientId: { type: Schema.ObjectId, ref: 'User', required: true },
    doctorId: { type: Schema.ObjectId, ref: 'User', required: true },
    status: { type: String, required: true, enum: statusEnum, default: 'Open' },
    date: { type: Date, required: 'Appointment date is required' },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

AppointmentSchema.path('date').validate(function (value, done) {
  return value > new Date();
}, 'The appointment cannot be scheduled in the past');

module.exports = mongoose.model('Appointment', AppointmentSchema);
