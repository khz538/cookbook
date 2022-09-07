import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editRecipeThunk, getOneRecipeThunk } from '../../store/recipes';

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

    const handleSubmit = async (e) => {
        e.preventDefault();
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
        // history.push(`/recipes/${recipeId}`);
        setShowUpdate(false);
    };

    return (
        <div className='update-recipe-container'>
            <h1>Update Recipe</h1>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input type='text'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <label>Description</label>
                <input type='text'
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <label>Image URL</label>
                <input type='text'
                    value={image}
                    onChange={e => setImage(e.target.value)}
                />
                <label>Yield</label>
                <input type='number'
                    value={servings}
                    min={0}
                    onChange={e => setServings(e.target.value)}
                />
                <label>Prep Time</label>
                <input type='text'
                    value={time}
                    onChange={e => setTime(e.target.value)}
                />
                <button type='submit'>Update Recipe</button>
            </form>
        </div>
    );
}
