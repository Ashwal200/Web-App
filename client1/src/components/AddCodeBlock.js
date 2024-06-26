import React, { useState , useEffect} from 'react';
import { Link } from 'react-router-dom';
import { DataBase } from '../back/DataBase';

const AddCodeBlock = () => {
    const [title, setTitle] = useState('');
    const [code, setCode] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await DataBase.addCodeBlock(title, code);
            setTitle('')
            setCode('')
            
            // Redirect to the lobby page after successful submission
        } catch (error) {
            console.error('Error adding code block:', error);
            // Handle error (e.g., display an error message)
        }
    };

    return (
        <div className="add-code-block-container"> 
            <h2>Add Code Block</h2>
            <form className="add-code-block-form">
                <div className="form-group"> 
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="code">Code:</label>
                    <textarea id="code" value={code} onChange={(e) => setCode(e.target.value)} required />
                </div>
                <button onClick={handleSubmit} className="btn-submit"> Submit </button>
                <Link to="/">
                    <button className="btn-submit">Lobby</button>
                </Link>
            </form>
        </div>
    );
};

export default AddCodeBlock;
