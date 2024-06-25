import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DataBase } from '../back/DataBase';
import { Link } from 'react-router-dom';
import { HiArrowCircleLeft } from "react-icons/hi";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import socket from '../socket';


const CodeBlock = () => {
    const { id } = useParams();
    const [code, setCode] = useState('');
    const [title, setTitle] = useState('');
    const [role, setRole] = useState(null);
    const [flag, setflag] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (flag) {
                    socket.on('role', (role) => {
                        setRole(role);
                        console.log(role)
                    });
                    setflag(false);
                }
                const data = await DataBase.getCode(id);
                setCode(data.code);
                setTitle(data.title)


            } catch (error) {
                console.error('Error fetching code block:', error);
            }
        };
        socket.emit('joinRoom', "Lobby");
        fetchData();

        // Listen for updated code from the server
        socket.on('newUpdatedCode', (updatedCode) => {
            setCode(updatedCode);
        });

    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await DataBase.updateDocument(id, code);
            window.location.reload();
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
                {role === 'writer' ? (
                    <>
                        <textarea className='textarea-code' id="code" value={code} onChange={(e) => { setCode(e.target.value); socket.emit('updatedCode', e.target.value); }} required />
                        <button onClick={handleSubmit} className="btn-submit-save"> Save </button>
                    </>
                ) : (
                    <SyntaxHighlighter language="javascript" style={docco}>
                        {code}
                    </SyntaxHighlighter>
                )}
                <SyntaxHighlighter language="javascript" style={docco}>
                    {code}
                </SyntaxHighlighter>
            </div>
        </div>
    );
};
export default CodeBlock;
