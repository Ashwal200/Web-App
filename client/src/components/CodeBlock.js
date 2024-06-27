import React, { useEffect, useState } from 'react';
import { DataBase } from '../db/DataBase';
import { Link, useLocation } from 'react-router-dom';
import { HiArrowCircleLeft } from "react-icons/hi";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import socket from '../socket';

// Functional component for Code Block page
const CodeBlock = () => {
    const [code, setCode] = useState('');
    const [title, setTitle] = useState('');
    const [complete, setComplete] = useState(false);
    const location = useLocation(); // Hook to access the current location object
    const params = new URLSearchParams(location.search); // Extracting query parameters from the URL
    const codeBlockId = location.pathname.split('/').pop(); // Extracting the code block ID from the URL path
    const role = params.get('role'); // Getting the role parameter from query params

    // Effect to fetch code block data and subscribe to socket events
    useEffect(() => {
        // Function to fetch initial data of the code block
        const fetchData = async () => {
            try {

                // Fetching code block data from Firestore using the codeBlockId
                const data = await DataBase.getData(codeBlockId);
                setCode(data.code);
                setTitle(data.title);
            } catch (error) {
                console.error('Error fetching code block:', error);
            }
        };

        fetchData();

        // Subscribing to 'newUpdatedCode' event from socket server
        socket.on('newUpdatedCode', (updatedCode, id) => {
            if (id === codeBlockId) {
                setCode(updatedCode); // Updating code state with new updated code received from server
            }
        });

        return () => {
            socket.off('newUpdatedCode'); // Unsubscribing from 'newUpdatedCode' event
        };
    }, [codeBlockId]);

    // Function to handle code submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Preventing default form submission behavior
        try {
            // Updating code block data in Firestore with the current code
            await DataBase.updateData(codeBlockId, code);
            // Checking solution status from Firestore 
            const checkSolution = await DataBase.getStatus(codeBlockId, code);
            setComplete(checkSolution);
            setTimeout(() => {
                setComplete(false);
            }, 3000); 
        } catch (error) {
            console.error('Error adding code block:', error);
        }
    };

    // JSX returned by the component
    return (
        <div className='background-container'>
            <Link to="/">
                <HiArrowCircleLeft className="btn-submit-back"></HiArrowCircleLeft>
            </Link>
            <div className="form-group-codeblock">
                <div className='head'> Code: {title}</div>
                {role === 'student' ? (
                    <>
                        <textarea className='textarea-code' id="code" value={code}
                            onChange={(e) => { setCode(e.target.value); socket.emit('updatedCode', e.target.value, codeBlockId); }}
                            required />
                        <button onClick={handleSubmit} className="btn-submit-save"> Save </button>
                        {complete && (
                            <div className='popup-style'>
                                <span role="img" aria-label="smiley">😊</span>
                            </div>
                        )}
                    </>
                ) : (
                    <SyntaxHighlighter language="javascript" style={docco}>
                        {code}
                    </SyntaxHighlighter>
                )}
            </div>
        </div>
    );
};

export default CodeBlock;
