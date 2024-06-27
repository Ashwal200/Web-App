import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lobby from './components/Lobby';
import CodeBlock from './components/CodeBlock';
import AddCodeBlock from './components/AddCodeBlock';
import io from 'socket.io-client';

// Create socket connection
const socket = io(); 

function App() {

    useEffect(() => {
        return () => {
            // Clean up socket connection on component unmount
            socket.disconnect(); 
        };
    }, []);
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Lobby />} />
                <Route path="/codeblock/:id" element={<CodeBlock />} />
                <Route path="/add" element={<AddCodeBlock />} />
            </Routes>
        </Router>
    );
}

export default App;
