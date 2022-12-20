import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createRecipeThunk } from '../../store/recipes';
import { uploadImageThunk } from '../../store/images';
import './AddRecipe.css';


export default function AddRecipe() {
    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [time, setTime] = useState('');
    const [servings, setServings] = useState('');
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [hasSubmittedImage, setHasSubmittedImage] = useState(false);


    useEffect(() => {
        const newErrors = [];
        if (!title.length) newErrors.push('* Please name your recipe!');
        if (title.length > 50) newErrors.push('* Please keep your recipe\'s name under 50 characters');
        if (title.trim() === '' && title.length) newErrors.push('* Whitespace-only inputs for title field are prohibited')
        if (!description.length) newErrors.push('* Please describe your recipe');
        if (description.length > 1000) newErrors.push('* Please keep your description under 1001 characters')
        if (description.trim() === '' && description.length) newErrors.push('* Whitespace-only inputs for description field are prohibited')
        if (!servings) newErrors.push("* Please enter the yield of this recipe");
        if (servings > 100) newErrors.push('* Please shrink your serving size to below 100')
        if (servings <= 0) newErrors.push("* Please enter a positive number of servings");
        if (!time) newErrors.push("* Prep time is required");
        if (time.length > 20) newErrors.push("* Please limit prep time to 20 characters")
        if (time.trim() === '' && time.length) newErrors.push('* Whitespace-only inputs for prep time field are prohibited')

        setErrors(newErrors);
    }, [title, description, image, time, servings, errors.length]);

    const handleSubmit = async e => {
        e.preventDefault();
        setHasSubmitted(true);
        if (errors.length) return;
        const payload = {
            title,
            description,
            time,
            yield_servings: servings,
            user_id: sessionUser.id,
        };
        const newRecipe = await dispatch(createRecipeThunk(payload));
        let formData = new FormData();
        formData.append('image', image);
        formData.append('recipe_id', newRecipe.id);
        await dispatch(uploadImageThunk(formData));
        history.push(`/recipes/${newRecipe.id}`)
    };

    const uploadImage = async e => {
        const file = e.target.files[0];
    }

    if (!sessionUser) history.push('/');

    return (
        <div className='create-recipe-container'>
            <h1>Post a Recipe</h1>
            {hasSubmitted &&
                <div className='errors'>
                    <ul>
                        {errors.length > 0 && errors.map((error, i) => (
                            <li style={{color: 'red'}} key={i}>{error}</li>
                        ))}
                        {/* {isUrlValid.length > 0 && <li>{isUrlValid[0]}</li>} */}
                    </ul>
                </div>
            }
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <small>&nbsp;(required)</small>
                <input type='text'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder='What is your dish called?'
                    className='input'
                />
                <label>Description</label>
                <small>&nbsp;(required)</small>
                <textarea type='text'
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    maxLength={1001}
                    placeholder='Describe your dish here.'
                    className='input'
                />
                <label>Servings</label>
                <small>&nbsp;(required)</small>
                <input type='number'
                    value={servings}
                    // min={0}
                    onChange={e => setServings(e.target.value)}
                    placeholder='Enter number of servings here'
                    className='input'
                    step={1}
                />
                <label>Prep Time</label>
                <small>&nbsp;(required)</small>
                <input type='text'
                    value={time}
                    onChange={e => setTime(e.target.value)}
                    placeholder='e.g. 15 minutes'
                    className='input'
                    maxLength={21}
                />
                <label>Image</label>
                <small>&nbsp;(required)</small>
                <input
                    type='file'
                    accept='.png, .jpg, jpeg, .gif'
                    onChange={e => setImage(e.target.files[0])}
                    name='picture'
                />
                <button className='add-recipe-button' type='submit' disabled={hasSubmittedImage}>Post Recipe</button>
            </form>
        </div>
    );
}
