import React, { useEffect, useState } from 'react';
import { DataBase } from '../back/DataBase';
import { Link, useLocation } from 'react-router-dom';
import { HiArrowCircleLeft } from "react-icons/hi";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import socket from '../socket';


const CodeBlock = () => {
    const [code, setCode] = useState('');
    const [title, setTitle] = useState('');
    const location = useLocation();
    // Get the query parameters from the URL
    const params = new URLSearchParams(location.search);
    const codeBlockId = location.pathname.split('/').pop();
    const role = params.get('role');

    useEffect(() => {

        const fetchData = async () => {
            try {
                
                const data = await DataBase.getCode(codeBlockId);
                setCode(data.code);
                setTitle(data.title);
                console.log(role);
            } catch (error) {
                console.error('Error fetching code block:', error);
            }
        };

        fetchData();


        // Listen for updated code from the server
        socket.on('newUpdatedCode', (updatedCode) => {
            setCode(updatedCode);
        });

        return () => {
            socket.off('newUpdatedCode');
        };


    }, [codeBlockId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await DataBase.updateDocument(codeBlockId, code);
        } catch (error) {
            console.error('Error adding code block:', error);
        }
    };

    return (
        <div>
            <Link to="/">
                <HiArrowCircleLeft className="btn-submit-back"></HiArrowCircleLeft>
            </Link>
            <div className="form-group-code">
                <div className='head'> Code: {title}</div>
                {role === 'student' ? (
                    <>
                        <textarea className='textarea-code' id="code" value={code} onChange={(e) => { setCode(e.target.value); socket.emit('updatedCode', e.target.value); }} required />
                        <button onClick={handleSubmit} className="btn-submit-save"> Save </button>
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
