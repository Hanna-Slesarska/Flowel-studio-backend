require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoute");
const authRoutes = require("./routes/auth");
const appointmentRoutes = require('./routes/appointmentRoutes');
const reviewRoutes = require('./routes/reviewRoute'); 

// Enable CORS
app.use(cors({
  origin:  ['https://flowel-studio.vercel.app', 'https://flowel-studio.com'],
  credentials: true 
}));

// Middleware to parse JSON requests
app.use(express.json());
app.use(cookieParser());

// CORS preflight
app.options('*', cors());

// Root route to handle GET requests to '/'
app.get('/', (req, res) => {
  res.send('Welcome to the Express backend!');
});

// MongoDB connection
const { MONGO_URL, PORT } = process.env;
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB is connected successfully"))
  .catch((err) => console.error(err));

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/booking', appointmentRoutes);
app.use('/api/reviews', reviewRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});



