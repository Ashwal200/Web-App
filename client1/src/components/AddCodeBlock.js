import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DataBase } from '../db/DataBase';
import { HiArrowCircleLeft } from "react-icons/hi";

const AddCodeBlock = () => {
    const [title, setTitle] = useState('');
    const [code, setCode] = useState('');
    const [solution, setSolution] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (title !== '') {
                await DataBase.addCodeBlock(title, code , solution);
                setTitle('')
                setCode('')
                setSolution('')
            }
            // Redirect to the lobby page after successful submission
        } catch (error) {
            console.error('Error adding code block:', error);
            // Handle error (e.g., display an error message)
        }
    };

    return (
        <div className="background-container">
            <Link to="/">
                <HiArrowCircleLeft className="btn-submit-back"></HiArrowCircleLeft>
            </Link>
            <div className="add-code-block-container">
                <form className="add-code-block-form">
                    <div className="form-group">
                        <div className='head'> Title</div>
                        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <div className='head'> Code:</div>
                        <textarea id="code" value={code} onChange={(e) => setCode(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <div className='head'> Solution:</div>
                        <textarea id="solution" value={solution} onChange={(e) => setSolution(e.target.value)} required />
                    </div>
                    <button onClick={handleSubmit} className="btn-submit"> Submit </button>
                </form>
            </div>
        </div>
    );
};

export default AddCodeBlock;
