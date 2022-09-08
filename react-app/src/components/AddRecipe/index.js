import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createRecipeThunk } from '../../store/recipes';
import { imageRegex } from '../../util';

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

    // useEffect(() => {
    //     dispatch(getAllRecipesThunk())
    // }, [dispatch])

    useEffect(() => {
        const newErrors = [];
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
    }, [title, description, image, time, servings, errors.length]);

    const handleSubmit = async e => {
        e.preventDefault();
        setHasSubmitted(true);
        if (errors.length) return;
        const payload = {
            title,
            description,
            image_url: image,
            time,
            yield_servings: servings,
            user_id: sessionUser.id,
        };
        const newRecipe = await dispatch(createRecipeThunk(payload));
        // if (recipes?.length > 0) {
        //     const lastRecipe = recipes[recipes.length - 1];
        //     history.push(`/recipes/${(parseInt(lastRecipe.id) + 1).toString()}`);
        // } else {
        //     history.push(`/recipes/1`);
        // }
        console.log(newRecipe)
        history.push(`/recipes/${newRecipe.id}`)
    };

    if (!sessionUser) history.push('/');

    return (
        <div className='create-recipe-container'>
            <h1>Create Recipe</h1>
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
                <button type='submit' >Create Recipe</button>
            </form>
        </div>
    );
}
