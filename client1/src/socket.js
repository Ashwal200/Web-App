// socket.js

import io from 'socket.io-client';

const socket = io('https://web-app-release.onrender.com'); // Initialize Socket.IO client with server URL

export default socket;
