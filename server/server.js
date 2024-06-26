const app = require('express')();
const express = require('express')
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cors = require('cors'); // Import the cors middleware
const path = require('path');
const port = process.env.PORT || 5000;

// Serve static files with correct MIME types
app.use(express.static('public', {
    setHeaders: (res, path, stat) => {
      if (path.endsWith('.css')) {
        res.set('Content-Type', 'text/css');
      }
    }
  }));
// Enable CORS for all origins
app.use(cors());

const connectedClients = new Map(); // Map to track connected clients

io.on('connection', function(socket) {
    
    // Store client information when a new client connects
    connectedClients.set(socket.id, { id: socket.id });

    socket.on('joinRoom', (room) => {
        // Associate client's socket ID with the specified room
        // You can store additional information about the client in the room object if needed
        // For simplicity, we'll just associate the socket ID with the room name
        socket.join(room);
        console.log(`Client ${socket.id} joined room: ${room}`);
    });

    socket.on("updatedCode" , function(data) {
        io.emit("newUpdatedCode" , data)
    });

    socket.on('disconnect', () => {
        // Remove client from the tracking data structure when they disconnect
        connectedClients.delete(socket.id);
        console.log('Client disconnected:', socket.id);
    });
});


// production code
if (process.env.NODE_ENV === "production") {
    const publicPath = path.resolve(__dirname, ".", "build");
    const filePath = path.join(__dirname, ".", "build", "index.html");
    app.use(express.static(publicPath));
    app.get("*", (req, res) => {
      return res.sendFile(filePath);
    });
  }
http.listen(port, () => console.log(`server started: listening on ${port}`));
