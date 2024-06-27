import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { DataBase } from '../db/DataBase'; 
import { HiArrowCircleLeft } from "react-icons/hi";
import { CgAsterisk } from "react-icons/cg"; 

// Functional component for adding a new code block page
const AddCodeBlock = () => {
    const [title, setTitle] = useState(''); 
    const [code, setCode] = useState(''); 
    const [solution, setSolution] = useState(''); 

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Preventing default form submission behavior
        try {
            if (title !== '') {
                // Calling DataBase utility function to add new code block to Firestore
                await DataBase.addCodeBlock(title, code, solution);
                setTitle(''); 
                setCode(''); 
                setSolution(''); 
            }
        } catch (error) {
            console.error('Error adding code block:', error); 
        }
    };

    // JSX returned by the component
    return (
        <div className="background-container">
            <Link to="/">
                <HiArrowCircleLeft className="btn-submit-back"></HiArrowCircleLeft>
            </Link>
            <div className="add-code-block-container">
                <form className="add-code-block-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <div className='head'> Title<CgAsterisk color='darkred'/></div>
                        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <div className='head'> Code:</div>
                        <textarea className='textarea-hight' id="code" value={code} onChange={(e) => setCode(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <div className='head'> Solution:</div>
                        <textarea className='textarea-hight' id="solution" value={solution} onChange={(e) => setSolution(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn-submit"> Submit </button>
                </form>
            </div>
        </div>
    );
};

export default AddCodeBlock;
