import React, { useEffect, useState } from 'react';
import { DataBase } from '../db/DataBase';
import { Link, useLocation } from 'react-router-dom';
import { HiArrowCircleLeft } from "react-icons/hi";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import socket from '../socket';


const CodeBlock = () => {
    const [code, setCode] = useState('');
    const [title, setTitle] = useState('');
    const [complete, setComplete] = useState(false);
    const location = useLocation();
    // Get the query parameters from the URL
    const params = new URLSearchParams(location.search);
    const codeBlockId = location.pathname.split('/').pop();
    const role = params.get('role');

    useEffect(() => {

        const fetchData = async () => {
            try {
                if (complete) {
                    const timer = setTimeout(() => {
                        setComplete(false);
                    }, 3000);
                    return () => clearTimeout(timer);
                }
                const data = await DataBase.getData(codeBlockId);
                setCode(data.code);
                setTitle(data.title);
            } catch (error) {
                console.error('Error fetching code block:', error);
            }
        };

        fetchData();


        // Listen for updated code from the server
        socket.on('newUpdatedCode', (updatedCode , id) => {
            if (id === codeBlockId) {
                setCode(updatedCode);
            }
            
        });

        return () => {
            socket.off('newUpdatedCode');
        };


    }, [codeBlockId, complete]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await DataBase.updateData(codeBlockId, code);
            const chackSolution = await DataBase.getStatus(codeBlockId, code);
            setComplete(chackSolution);
        } catch (error) {
            console.error('Error adding code block:', error);
        }
    };

    return (
        <div className='background-container'>
            <Link to="/">
                <HiArrowCircleLeft className="btn-submit-back"></HiArrowCircleLeft>
            </Link>
            <div className="form-group-codeblock">
                <div className='head'> Code: {title}</div>
                {role === 'student' ? (
                    <>
                        <textarea className='textarea-code' id="code" value={code} onChange={(e) => { setCode(e.target.value); socket.emit('updatedCode', e.target.value , codeBlockId); }} required />
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
