import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';
import { DataBase } from '../back/DataBase'
import socket from '../socket'; 

const Lobby = () => {
    const [codeBlocks, setCodeBlocks] = useState([]);

    useEffect(() => {
        const fetchCodeBlocks = async () => {
            try {
                const querySnapshot = await DataBase.getDocsList();
                const codeBlocksList = querySnapshot.docs.map(doc => ({ id: doc.id, title: doc.data().title, data: doc.data().data }));
                setCodeBlocks(codeBlocksList);
                console.log("codeBlocksList:", codeBlocksList);
            } catch (error) {
                console.error('Error fetching code blocks:', error);
            }
        };
        fetchCodeBlocks();
        socket.emit('joinRoom', "Lobby");

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div className="container">
            <div className="code-container">
            <h1>Choose code block</h1>
                <div className="scrollable-section">
                    <ul>
                        {codeBlocks.map(block => (
                            <li key={block.id}>
                                <Link to={`/codeblock/${block.id}`}>{block.title}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="add-code-block">
                <h2>Add Code Block</h2>
                <Link to="/add">
                    <button>Add</button>
                </Link>
            </div>
        </div>
    );
};

export default Lobby;
