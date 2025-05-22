// Entry point for starting the HTTP server for the Uber clone backend.

const http = require('http'); // Node.js HTTP server module
const app = require('./app'); // Express app

const port = process.env.PORT || 3000; // Server port

// Create and start the HTTP server
const server = http.createServer(app);
server.listen(port, () =>{
    console.log("Server is running on port " + port);
});