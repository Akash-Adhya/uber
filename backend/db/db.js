// MongoDB connection configuration and setup for the Uber clone backend.

/**
 * @fileoverview MongoDB connection configuration and setup.
 * Establishes connection to MongoDB using mongoose.
 * 
 * Environment Variables Required:
 * - DB_CONNECT: MongoDB connection URI string
 * 
 * Connection Options:
 * - useNewUrlParser: Parse MongoDB connection strings
 * - useUnifiedTopology: Use new Server Discovery and Monitoring engine
 * 
 * Error Handling:
 * - Logs connection errors to console
 * - Exits process on critical connection failures
 */

/**
 * Establishes connection to MongoDB database.
 * @function connection
 * @returns {void}
 */
const mongoose = require('mongoose'); // Import mongoose for MongoDB connection

/**
 * Connects to MongoDB using the connection string from environment variables.
 * Logs success or error and exits process on failure.
 */
function connection() {
    mongoose.connect(process.env.DB_CONNECT, {
        useNewUrlParser: true, // Use new URL string parser
        useUnifiedTopology: true, // Use new server discovery and monitoring engine
    })
    .then(() => {
        console.log("Connected to MongoDB successfully!");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err.message);
        process.exit(1); // Exit process on critical connection failure
    });
}

module.exports = connection;
