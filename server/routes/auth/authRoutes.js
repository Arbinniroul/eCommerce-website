const express = require('express');
const { registerUser } = require('../../controllers/auth/authController'); // Correctly import the function
const router = express.Router();

router.post('/register', registerUser); // Use the imported registerUser function

module.exports = router; // Export the router
