import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getOneRecipeThunk } from '../../store/recipes';


const RecipeDetail = () => {
    const { recipeId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const recipe = useSelector(state => state.recipes)[recipeId];
    console.log(recipe)

    useEffect(() => {
        dispatch(getOneRecipeThunk(recipeId));
    }, [dispatch])

    if (!recipe) return null;

    // const handleDelete = async (e) => {
    //     e.preventDefault();
    //     await dispatch(deleteRecipeThunk(recipeId));
    //     history.push('/');
    // }

    return (
        <div className='recipe-outer-wrapper'>
            <div className='top-recipe-wrapper'>
                <h1 className='recipe-title'>{recipe.title}</h1>
                <p className='recipe-author'>By: {recipe.user.first_name}&nbsp;{recipe.user.last_name}</p>
            </div>
            <img className='recipe-image' src={recipe.image} alt={recipe.title} />
        </div>
    );
}

export default RecipeDetail;
