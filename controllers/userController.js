const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwtToken'); 
const User = require('../models/userModel');


// Register a new user
exports.register = async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;
  
      // Check if user already exists
      let user = await User.findOne({ email });
      if (user) {
        console.log('User already exists'); // Debugging statement
        return res.status(400).json({ msg: 'User already exists' });
      }
  
      // Hash the password and save the new user
      const hashedPassword = await bcrypt.hash(password, 10);
      user = new User({ firstName, lastName, email, password: hashedPassword });
      await user.save();
  
      res.status(201).json({ msg: 'User registered successfully' });
    } catch (error) {
      console.error('Error during user registration:', error); // Log the error for debugging
      res.status(500).json({ msg: 'Server error' });
    }
  };

// Login a user
exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        // Send response and return immediately to avoid further execution
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  
      // Verify password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        // Send response and return immediately to avoid further execution
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  
      // Generate token
      const token = generateToken(user);
      
      // Send the token as response
      return res.json({ token });
    } catch (error) {
      // Catch any unexpected errors and return a 500 response
      console.error("Error during login:", error);
      return res.status(500).json({ msg: 'Server error' });
    }
  };

// Get user details
exports.getAccount = async (req, res) => {
    try {
      const user = await User.findById(req.user.userId); // Use req.user.userId here
      if (!user) return res.status(404).json({ msg: "User not found" });
  
      res.json({ 
        firstName: user.firstName, 
        lastName: user.lastName, 
        email: user.email 
      });
    } catch (error) {
      res.status(500).json({ msg: "Server error" });
    }
  };
