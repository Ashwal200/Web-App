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
                const codeBlocksList = querySnapshot.docs.map(doc => ({ id: doc.id, title: doc.data().title, data: doc.data().data , mentor : doc.data().mentor}));
                setCodeBlocks(codeBlocksList);
            } catch (error) {
                console.error('Error fetching code blocks:', error);
            }
        };
        fetchCodeBlocks();

        return () => {
            socket.disconnect();
        };
    }, []);

    const handleCodeBlockClick = async (codeBlockId , mentor) => {
        // Determine role (mentor or student) and navigate to the code block page
        if (mentor === 'true') {
          await DataBase.addMentor(codeBlockId , 'false')
          // Navigate to the code block page with the role 'mentor'
          window.location.href = `/codeblock/${codeBlockId}?role=mentor`;
        } else {
          // Navigate to the code block page with the role 'student'
          window.location.href = `/codeblock/${codeBlockId}?role=student`;
        }
      };

    return (
        <div className="container">
            <div className="code-container">
                <h1>Choose code block</h1>
                <div className="scrollable-section">
                    <ul>
                        {codeBlocks.map(block => (
                            <li key={block.id}>
                                <button onClick={() => handleCodeBlockClick(block.id , block.mentor)}>{block.title}</button>
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
