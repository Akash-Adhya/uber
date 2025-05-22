/**
 * @fileoverview Main Express application setup and configuration.
 * Sets up the server, middleware, routes, and database connection.
 * 
 * Environment Variables:
 * - PORT: Server port number
 * - DB_CONNECT: MongoDB connection string
 * - JWT_SECRET: Secret key for JWT tokens
 * 
 * Available Routes:
 * - /users: User authentication and management
 * - /captains: Captain authentication and management
 * - /maps: Mapping and location services
 */

// Main Express application setup and configuration for the Uber clone backend.

const dotenv = require('dotenv'); // Loads environment variables from .env file
const express = require('express'); // Express web framework
const cors = require('cors'); // Cross-Origin Resource Sharing middleware
const app = express(); // Create Express app instance
const cookieParser = require('cookie-parser'); // Middleware to parse cookies
const connectToDB = require('./db/db'); // MongoDB connection function
const userRoutes = require('./routes/user.routes'); // User routes
const captainRoutes = require('./routes/captain.routes'); // Captain routes
const mapRoutes = require('./routes/map.routes'); // Map/location routes
const rideRoutes = require('./routes/ride.routes'); // Ride routes

// Load environment variables
dotenv.config();
// Connect to MongoDB
connectToDB();

// Enable CORS for all origins
app.use(cors());
// Parse incoming JSON requests
app.use(express.json());
// Parse URL-encoded data
app.use(express.urlencoded({extended: true}));
// Parse cookies
app.use(cookieParser());

// Root endpoint for health check
app.get('/', (req, res) => {
    res.send('I am building the backend for my application!');
});

// Register user, captain, and map routes
app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use('/maps', mapRoutes);
app.use('/rides', rideRoutes);

module.exports = app;