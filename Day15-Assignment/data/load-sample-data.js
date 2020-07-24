require('dotenv').config();
const fs = require('fs');
const moment = require('moment');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises

// import all of our models - they need to be imported only once
const User = require('../models/UserModel');
const Appointment = require('../models/AppointmentModel');

const users = JSON.parse(fs.readFileSync(__dirname + '/users.json', 'utf-8'));
//const appointments = JSON.parse(fs.readFileSync(__dirname + '/appointments.json', 'utf-8'));

async function deleteData() {
  console.log('😢😢 Goodbye Data...');
  await Appointment.deleteMany({});
  await User.deleteMany({});
  console.log('Data Deleted. To load sample data, run\n\n\t npm run sample\n');
  process.exit();
}

async function getAppointments() {
  let appointments = [];

  const doctors = users.filter((u) => u.role === 'Doctor');
  const patients = users.filter((u) => u.role === 'Patient');
  const now = moment(new Date());

  // Loop through each doctor
  doctors.forEach(function (doctor, idx) {
    const patient1 = patients[0];
    const patient2 = patients[1];
    const appointment = { status: 'Open', doctorId: doctor._id };

    // Create 10 Open appointments for each patient for next 10 days
    Array.from({ length: 5 }).forEach(function (_, i) {
      const day = now
        .clone()
        .add(i + 1, 'days')
        .startOf('day');
      const appointment1 = { ...appointment, patientId: patient1._id, date: day.hour(10 + idx).toDate() };
      const appointment2 = { ...appointment, patientId: patient2._id, date: day.hour(13 + idx).toDate() };
      appointments.push(appointment1);
      appointments.push(appointment2);
    });
  });

  return appointments;
}

async function loadData() {
  try {
    await User.insertMany(users);
    const appointments = await getAppointments();
    await Appointment.insertMany(appointments);
    console.log('👍 Done!');
    process.exit();
  } catch (e) {
    console.log(
      '\n👎 Error! The Error info is below but if you are importing sample data make sure to drop the existing database first with.\n\n\t npm run blowitallaway\n\n\n'
    );
    console.log(e);
    process.exit();
  }
}
if (process.argv.includes('--delete')) {
  deleteData();
} else {
  loadData();
}
