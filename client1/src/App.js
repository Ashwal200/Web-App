import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lobby from './components/Lobby';
import CodeBlock from './components/CodeBlock';
import AddCodeBlock from './components/AddCodeBlock';
import io from 'socket.io-client';

const socket = io(); // Establish socket connection

function App() {

    // useEffect(() => {
    //     return () => {
    //         socket.disconnect(); // Clean up socket connection on component unmount
    //     };
    // }, []);
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
