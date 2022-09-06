import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

export default function UpdateStep({ step, recipe }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const [instruction, setInstruction] = useState('');
    const [errors, setErrors] = useState('');

    const handleEdit = async e => {
        e.preventDefault();
        const editedStep = {
            
        }
    }

    return (
        <form onSubmit={handleEdit}>
            <textarea
                type='textarea'
                placeholder='Write your instruction here!'
                onChange={e => setInstruction(e.target.value)}
                value={instruction}
                maxLength={256}
                className='textarea-field'
                id='update-instruction-field'
            />
        </form>
    );
}
