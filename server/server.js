// server.js (backend)

// Required dependencies
// Express framework for Node.js
const express = require('express');

// HTTP module for creating HTTP server
const http = require('http'); 

// Path module for working with file and directory paths
const path = require("path"); 

// Socket.IO for real-time communication
const socketIo = require('socket.io'); 

// CORS middleware for enabling cross-origin requests
const cors = require('cors'); 

// Initialize Express application
const app = express();

// Enable CORS for all routes
app.use(cors()); 

// Create HTTP server using Express app
const server = http.createServer(app);

// Attach Socket.IO to the HTTP server with CORS configuration
const io = socketIo(server, {
  cors: {
    origin: '*', // Allow requests from all origins
    methods: ['GET', 'POST'], // Allow GET and POST requests
    credentials: true // Allow credentials (cookies, authorization headers)
  }
});


// Socket.IO event listeners
io.on('connection', (socket) => {

  // Event listener for 'updatedCode' event from clients
  socket.on("updatedCode", function (data, id) {
    // Broadcast updated code to all clients
    io.emit("newUpdatedCode", data, id); 
  });

  // Event listener for 'disconnect' event from clients
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });

  // Event listener for 'reconnect' event from clients
  socket.on('reconnect', () => {
    console.log('Client reconnected:', socket.id);
  });
});

// Serve static files from the 'build' directory
const publicPath = path.resolve(__dirname, ".", "build");
const filePath = path.join(__dirname, ".", "build", "index.html");
app.use(express.static(publicPath));

// Serve 'index.html' for all routes that are not explicitly defined
app.get("*", (req, res) => {
  return res.sendFile(filePath);
});

// Port number for the server to listen on
const port = 5010; 
server.listen(port, () => console.log(`Server started: listening on ${port}`)); 
