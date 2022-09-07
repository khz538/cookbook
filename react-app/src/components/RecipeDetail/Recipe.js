import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteRecipeThunk, editRecipeThunk } from '../../store/recipes';
import { Modal } from '../../context/Modal';
import UpdateRecipe from './UpdateRecipe';

const Recipe = ({ recipe }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const recipeId = recipe.id;
    const currentUser = useSelector(state => state.session.user);
    const [showUpdate, setShowUpdate] = useState(false);

    useEffect(() => {
    }, [dispatch])

    const handleDelete = async e => {
        e.preventDefault();
        await dispatch(deleteRecipeThunk(recipeId));
        history.push(`/recipes/`);
    }


    return (
        <div className='top-recipe-wrapper'>
                <div className='top-left-quadrant'>
                    <h1 className='recipe-title'>{recipe.title}</h1>
                    <p className='recipe-author'>By: {recipe.user.first_name}&nbsp;{recipe.user.last_name}</p>
                    {currentUser?.id === recipe.user_id &&
                        <button onClick={() => setShowUpdate(true)}>Edit</button>
                    }
                </div>
                <div className='top-right-quadrant'>
                    <div className='recipe-image-container'>
                        {/* Need to add an image URL checker */}
                        {recipe.image ? <img className='recipe-image' src={recipe?.image} alt={recipe.title} /> : <img className='recipe-image' src='https://res.cloudinary.com/khz538/image/upload/v1661845151/cld-sample-4.jpg' alt={recipe.title} />}
                    </div>
                    <p className='recipe-description'>{recipe.description}</p>
                </div>
            </div>
    );
}

export default Recipe;
