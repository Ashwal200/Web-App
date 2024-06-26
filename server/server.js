// server.js (backend)

const express = require('express');
const http = require('http');
const path = require("path");
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true
    }
});   

const connectedClients = new Map(); // Map to track connected clients

io.on('connection', (socket)=> {
    
    // Store client information when a new client connects
    connectedClients.set(socket.id, { id: socket.id });

    socket.on("updatedCode" , function(data) {
        io.emit("newUpdatedCode" , data)
    });

    socket.on('disconnect', () => {
        // Remove client from the tracking data structure when they disconnect
        connectedClients.delete(socket.id);
        console.log('Client disconnected:', socket.id);
    });
});

const publicPath = path.resolve(__dirname, ".", "build");
const filePath = path.join(__dirname, ".", "build", "index.html");
app.use(express.static(publicPath));

app.get("*", (req, res) => {
  return res.sendFile(filePath);
});

const port = 5010
server.listen(port, () => console.log(`server started: listening on ${port}`));
