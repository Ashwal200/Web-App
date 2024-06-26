// socket.js

import io from 'socket.io-client';

const socket = io('https://web-app-release.onrender.com'); // Initialize Socket.IO client with server URL
//const socket = io('http://localhost:5010/');
export default socket;
