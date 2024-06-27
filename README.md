# Real-time Code Collaboration App

## Overview

This is a React application that allows real-time code collaboration between clients. The app uses sockets to enable communication between the client and server. The data is passed between clients in real time using sockets. Additionally, users can add new code blocks as needed.

## [Link](https://web-app-release.onrender.com)

## Features

- Real-time code collaboration
- Add new code blocks
- Syntax highlighting using Highlight.js

## Technologies Used

- React
- Socket.io
- Node.js 
- Highlight.js (for syntax highlighting)

## Usage

1. Open your browser and navigate to `http://localhost:3000` to access the client.
2. On the lobby page, choose a code block from the list.
3. The first user to open the code block page will be the mentor.
4. Subsequent users opening the same code block page will be students.
5. The mentor can view the code block in read-only mode.
6. The student can edit the code block.
7. Changes made by the student are displayed in real-time to the mentor and other students.
8. New code blocks can be added as needed.

