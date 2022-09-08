import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editRecipeThunk, getOneRecipeThunk } from '../../store/recipes';
import { imageRegex } from '../../util';

export default function UpdateRecipe({ recipe, setShowUpdate }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const recipeId = recipe.id;
    const [title, setTitle] = useState(recipe.title);
    const [description, setDescription] = useState(recipe.description);
    const [image, setImage] = useState(recipe.image_url);
    const [time, setTime] = useState(recipe.time);
    const [servings, setServings] = useState(recipe.yield_servings);
    const [errors, setErrors] = useState([]);
    // const [isUrlValid, setIsUrlValid] = useState([]);

    // console.log(errors)
    // form errors
    useEffect(() => {
        const newErrors = new Array;
        if (!title.length) newErrors.push('* Please name your recipe!');
        if (title.length > 50) newErrors.push('* Please keep your recipe\'s name under 50 chars');
        if (!description.length) newErrors.push('* Please describe your recipe');
        if (description.length > 1000) newErrors.push('* Please keep your description under 1001 characters')
        if (!image.length) newErrors.push('Please enter an image URL');
        if (!imageRegex(image)) newErrors.push("* Image URL format invalid");
        if (!time) newErrors.push("* Please enter the prep time");
        if (time.length > 20) newErrors.push("* Please only enter up to 20 characters")
        if (!servings) newErrors.push("* Please enter the yield of this recipe");
        if (servings <= 0) newErrors.push("* Please enter number of servings");

        setErrors(newErrors);
    }, [title, description, image, time, servings, errors.length])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const isUrlValid = await isImgUrl(image)
        // if (!isUrlValid) {await setIsUrlValid(['* Please enter a working URL']); return;};
        const editedRecipe = {
            id: recipe.id,
            title,
            description,
            image_url: image,
            time,
            yield_servings: servings,
        }
        await dispatch(editRecipeThunk(editedRecipe));
        await dispatch(getOneRecipeThunk(recipeId));
        setShowUpdate(false);
    };

    return (
        <div className='update-recipe-container'>
            <h1>Update Recipe</h1>
            <div className='errors'>
                <ul>
                    {errors.length > 0 && errors.map((error, i) => (
                        <li style={{color: 'red'}} key={i}>{error}</li>
                    ))}
                    {/* {isUrlValid.length > 0 && <li>{isUrlValid[0]}</li>} */}
                </ul>
            </div>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input type='text'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder='What is your dish called?'
                    className='input'
                />
                <label>Description</label>
                <textarea type='text'
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    maxLength={1001}
                    placeholder='Describe your dish here.'
                    className='input'
                />
                <label>Image URL</label>
                <input type='text'
                    value={image}
                    onChange={e => {
                        setImage(e.target.value);
                        // setIsUrlValid([]);
                    }}
                    placeholder='https://example.com/image.jpg'
                    className='input'
                />
                <label>Servings</label>
                <input type='number'
                    value={servings}
                    min={0}
                    onChange={e => setServings(e.target.value)}
                    placeholder='Enter number of servings here'
                    className='input'
                />
                <label>Prep Time</label>
                <input type='text'
                    value={time}
                    onChange={e => setTime(e.target.value)}
                    placeholder='e.g. 15 minutes'
                    className='input'
                />
                <button type='submit' disabled={errors?.length}>Update Recipe</button>
            </form>
        </div>
    );
}
