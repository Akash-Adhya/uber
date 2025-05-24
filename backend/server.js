// Entry point for starting the HTTP server for the Uber clone backend.

const http = require('http'); // Node.js HTTP server module
const app = require('./app'); // Express app
const { initializeSocket } = require('./socket'); // Import the initializeSocket function

const port = process.env.PORT || 3000; // Server port

// Create and start the HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
initializeSocket(server);

// Start the server
server.listen(port, () =>{
    console.log("Server is running on port " + port);
});