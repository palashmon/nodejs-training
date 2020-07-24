const express = require('express');
const DoctorController = require('../controllers/DoctorController');
const authorize = require('../middlewares/authorize');
const Role = require('../helpers/role');

const router = express.Router();

// Any logged in user can access this route
router.get('/', authorize(), DoctorController.getAllDoctors);

// Only `Patient` role should be able to access these routes
router.get('/:id/slots', authorize(Role.Patient), DoctorController.getAvailableSlots);
router.post('/:id', authorize(Role.Patient), DoctorController.setAppointment);

// Only `Doctor` role can view his appointments
// Date is optional here, if no date is passed, then it defaults to today's date
router.get('/appointments/:date?', authorize(Role.Doctor), DoctorController.getAppointments);
router.post('/appointment/:id', authorize(Role.Doctor), DoctorController.updateAppointmentStatus);

module.exports = router;
