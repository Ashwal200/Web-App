const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// // Load code blocks from a JSON file
// const codeBlocks = JSON.parse(fs.readFileSync('codeBlocks.json', 'utf8'));

// // Endpoint to get code blocks
// app.get('/api/codeblocks', (req, res) => {
//     res.json(codeBlocks);
// });

// Serve the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('joinRoom', async (room) => {
        socket.join(room);

        // Check if this is the first visitor for the code block
        if (!firstVisitors[room]) {
            firstVisitors[room] = socket.id;
            socket.emit('role', 'writer'); // Send 'writer' role to the first visitor
        } else {
            socket.emit('role', 'reader'); // Send 'reader' role to subsequent visitors
        }

        console.log(`Client joined room: ${room}`);
    });

    socket.on('codeChange', (data) => {
        const { room, code } = data;
        socket.to(room).emit('codeUpdate', code);
        console.log('Client change the code');
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});


const PORT = process.env.PORT || 5008;
server.listen(PORT);
console.log(`Server running on port ${PORT}`);
