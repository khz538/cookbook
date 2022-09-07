import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { editRecipeThunk } from '../../store/recipes';

export default function UpdateRecipe({ recipe, setShowUpdate }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const recipeId = recipe.id;
    const [title, setTitle] = useState(recipe.title);
    const [description, setDescription] = useState(recipe.description);
    const [time, setTime] = useState(recipe.time);
    const [servings, setServings] = useState(recipe.yield_servings);
    const [image, setImage] = useState(recipe.image_url);

    const editRecipe = async e => {
        e.preventDefault();
        const editedRecipe = {
            title,
            description,
            time,
            yield_servings: servings,
            image_url: image,
        }
        await dispatch(editRecipeThunk(editedRecipe));
        history.push(`/recipes/${recipeId}`)
    }

    return null;
}
