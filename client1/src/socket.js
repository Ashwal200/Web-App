// socket.js

import io from 'socket.io-client';

const socket = io('http://localhost:5010'); // Initialize Socket.IO client with server URL

export default socket;
