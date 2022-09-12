import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { editStepThunk } from '../../store/steps';
import './UpdateStep.css';


export default function UpdateStep({ step, recipe, setShowUpdateBool }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const [description, setDescription] = useState(step.description);
    const [errors, setErrors] = useState([]);
    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
        const newErrors = [];
        if (!description.length) newErrors.push('* To add, please input at least one character');
        if (description.length > 250) newErrors.push('* Please keep each step succinctly under 250 characters');
        if (description.trim() === '' && description.length) newErrors.push('* Instructions containing only whitespace chars are not allowed');
        setErrors(newErrors);
        // console.log(errors)
        // if (!errors.length) setIsDisabled(false);
        errors.length ? setIsDisabled(true) : setIsDisabled(false);
    }, [description, errors.length])

    const handleEdit = async e => {
        e.preventDefault();
        const editedStep = {
            id: step.id,
            description,
        };
        await dispatch(editStepThunk(editedStep));
        history.push(`/recipes/${recipe.id}`);
        setShowUpdateBool(false);
    }

    return (
        <div className='edit-step-wrapper'>
            <h1>Edit Step</h1>
            <ul className='errors'>
                {errors.map((error, i) => (
                    <li key={i} style={{color: "red"}}>{error}</li>
                )
                )}
            </ul>
            <form onSubmit={handleEdit}>
                <label>Step Instruction</label>
                <small>&nbsp;(required)</small>
                <textarea
                    type='textarea'
                    placeholder='Write your instruction here!'
                    onChange={e => setDescription(e.target.value)}
                    value={description}
                    maxLength={251}
                    className='textarea-field'
                    id='update-step-field'
                />
                <button type='submit' disabled={isDisabled}>Submit Edit</button>
            </form>
        </div>
    );
}
