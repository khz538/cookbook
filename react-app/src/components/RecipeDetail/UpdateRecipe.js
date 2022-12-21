import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { editRecipeThunk, getOneRecipeThunk } from '../../store/recipes';
import { changeImageThunk } from '../../store/images';
import './UpdateRecipe.css';

export default function UpdateRecipe({ recipe, setShowUpdate }) {
    // const history = useHistory();
    const dispatch = useDispatch();
    const recipeId = recipe.id;
    const [title, setTitle] = useState(recipe.title);
    const [description, setDescription] = useState(recipe.description);
    const [image, setImage] = useState(recipe.image_url);
    const [time, setTime] = useState(recipe.time);
    const [servings, setServings] = useState(recipe.yield_servings);
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        const newErrors = [];
        if (!title.length) newErrors.push('* Please name your recipe!');
        if (title.length > 50) newErrors.push('* Please keep your recipe\'s name under 50 characters');
        if (title.trim() === '' && title.length) newErrors.push('* Whitespace-only inputs for title field are prohibited')
        if (!description.length) newErrors.push('* Please describe your recipe');
        if (description.length > 1000) newErrors.push('* Please keep your description under 1001 characters')
        if (description.trim() === '' && description.length) newErrors.push('* Whitespace-only inputs for description field are prohibited')
        // if (!image.length) newErrors.push('* Please enter an image URL');
        // if (!imageRegex(image)) {
        //     newErrors.push('* Please enter a valid image URL')
        //     newErrors.push('e.g. https://res.cloudinary.com/khz538/image/upload/v1661845151/cld-sample-4.jpg');
        // };
        // if (image.length && image.trim() === '') newErrors.push('*Image URL must not have whitespace characters')
        if (!servings) newErrors.push("* Please enter the yield of this recipe");
        if (servings > 100) newErrors.push('* Please shrink your serving size to below 100')
        if (servings <= 0) newErrors.push("* Please enter a positive number of servings");
        if (Math.floor(servings) !== servings) newErrors.push('* Please enter a whole number of servings');
        if (!time) newErrors.push("* Prep time is required");
        if (time.length > 20) newErrors.push("* Please limit prep time to 20 characters")
        if (time.trim() === '' && time.length) newErrors.push('* Whitespace-only inputs for prep time field are prohibited')

        setErrors(newErrors);
    }, [title, description, time, servings, errors.length])

    const handleSubmit = async e => {
        e.preventDefault();
        const editedRecipe = {
            id: recipe.id,
            title,
            description,
            time,
            yield_servings: servings,
        }
        if (!errors.length) {
            await dispatch(editRecipeThunk(editedRecipe));
            let formData = new FormData();
            formData.append('image', image);
            formData.append('recipeId', recipe.id);
            await dispatch(changeImageThunk(formData, recipe.images[0].id));
            await dispatch(getOneRecipeThunk(recipeId));
            setShowUpdate(false);
        } else {
            setHasSubmitted(true);
        }
    };

    return (
        <div className='update-recipe-container'>
            <h1>Update Recipe</h1>
            <div className='errors'>
                <ul>
                    {hasSubmitted && errors.length > 0 && errors.map((error, i) => (
                        <li style={{color: 'red'}} key={i}>{error}</li>
                    ))}
                    {/* {isUrlValid.length > 0 && <li>{isUrlValid[0]}</li>} */}
                </ul>
            </div>
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
                    className='textarea'
                />
                <label>Servings</label>
                <small>&nbsp;(required)</small>
                <input type='number'
                    value={servings}
                    // min={0}
                    onChange={e => setServings(e.target.value)}
                    placeholder='Enter number of servings here'
                    className='input'
                    step={.1}
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
                <button type='submit' disabled={false}>Update Recipe</button>
            </form>
        </div>
    );
}
