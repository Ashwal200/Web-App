import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';
import { DataBase } from '../db/DataBase'; 
import { FaPlus } from "react-icons/fa";

// Functional component for the Lobby page
const Lobby = () => {
    const [codeBlocks, setCodeBlocks] = useState([]);

    // Effect hook to fetch code blocks
    useEffect(() => {
        // Function to fetch code blocks from Firestore in real time
        const fetchCodeBlocks = async () => {
            try {
                // Fetching all documents from Firestore
                const querySnapshot = await DataBase.getDocsList(); 

                // Mapping Firestore documents to code block objects to show them on the page
                const codeBlocksList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    title: doc.data().title,
                    data: doc.data().data,
                    mentor: doc.data().mentor
                }));
                setCodeBlocks(codeBlocksList); 
            } catch (error) {
                console.error('Error fetching code blocks:', error);
            }
        };
        fetchCodeBlocks(); 
    }, []); 

    // Function to handle clicking on a code block
    const handleCodeBlockClick = async (codeBlockId, mentor) => {
        // Determine role (mentor or student) and navigate to the code block page
        if (mentor === 'true') {
            // Setting mentor status to false in Firestore to address that the mentor is in the code block
            await DataBase.editMentor(codeBlockId); 
            window.location.reload()
            // Navigate to the code block page with the role 'mentor'
            window.location.href = `/codeblock/${codeBlockId}?role=mentor`;
        } else {
            // Navigate to the code block page with the role 'student'
            window.location.href = `/codeblock/${codeBlockId}?role=student`;
        }
    };

    return (
        <div className="background-container">
            <div className="container">
                <div className="codeblocks-container">
                    <h1 style={{ color: '#403029' }}>Choose code block</h1>
                    <div className="scrollable-section">
                        <ul>
                            {codeBlocks.map(block => (
                                <li key={block.id}>
                                    <button onClick={() => handleCodeBlockClick(block.id, block.mentor)}>
                                        {block.title}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="add-code-block">
                    <h2 style={{ color: '#403029' }}>Add Code Block</h2>
                    <Link to="/add">
                        <FaPlus style={{ color: '#366A68', fontSize: '40px' }} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Lobby;
