const express = require('express');
const DoctorController = require('../controllers/DoctorController');
const authorize = require('../middlewares/authorize');

const router = express.Router();

// Only logged in users can view these routes
// Month is optional here, if no month is passed, then it defaults to current month
router.get('/monthly/:month?', authorize(), DoctorController.getMonthlyReport);
router.get('/appointment/:id', authorize(), DoctorController.getAppointmentDetailsReport);

module.exports = router;
