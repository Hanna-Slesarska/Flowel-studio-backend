// controllers/appointmentController.js
// controllers/appointmentController.js
const axios = require('axios');
const Appointment = require('../models/appointmentModel'); // Import the Appointment model

const createAppointment = async (req, res) => {
  const { appointmentTypeID, datetime, firstName, lastName, email, lessonName, userId } = req.body;

  try {
    // Step 1: Make the Acuity API request
    const response = await axios.post(
      'https://acuityscheduling.com/api/v1/appointments',
      {
        appointmentTypeID,
        datetime,
        firstName,
        lastName,
        email,
        fields: [
          { id: 'lessonName', value: lessonName }
        ]
      },
      {
        auth: {
          username: process.env.ACUITY_USER_ID,
          password: process.env.ACUITY_API_KEY,
        },
      }
    );

    // Step 2: Save appointment details in MongoDB
    const newAppointment = new Appointment({
      userId, // Assuming this is provided in the request body
      appointmentId: response.data.id,
      dateTime: response.data.datetime,
      details: response.data, // Storing the full response from Acuity for reference
    });

    await newAppointment.save();

    // Step 3: Send a success response with the appointment data
    res.status(200).json(newAppointment);
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: 'Failed to create appointment' });
  }
};

module.exports = { createAppointment };
