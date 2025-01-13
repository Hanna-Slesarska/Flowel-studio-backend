const express = require('express');
const { createAppointment } = require('../controllers/appointmentController');

const router = express.Router();

// Define the route for creating an appointment
router.post('/', createAppointment);

module.exports = router;