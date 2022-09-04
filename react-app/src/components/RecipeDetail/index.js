import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getOneRecipeThunk } from '../../store/recipes';
import { createStepThunk } from '../../store/steps';
// import { isValidUrl } from '../../util';


const RecipeDetail = () => {
    const { recipeId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const recipe = useSelector(state => state.recipes)[recipeId];
    const currentUser = useSelector(state => state.session.user);
    // console.log(recipe)
    const [newStep, setNewStep] = useState('');

    useEffect(() => {
        dispatch(getOneRecipeThunk(recipeId));
    }, [dispatch, recipeId])

    if (!recipe) return null;

    // const handleDelete = async (e) => {
    //     e.preventDefault();
    //     await dispatch(deleteRecipeThunk(recipeId));
    //     history.push('/');
    // }
    const addStep = async e => {
        e.preventDefault();
        const step = {
            recipe_id: recipeId,
            step_number: recipe.steps.length + 1,
            description: newStep,
        }
        dispatch(createStepThunk(step));
    }

    return (
        <div className='recipe-outer-wrapper'>
            <div className='top-recipe-wrapper'>
                <div className='top-left-quadrant'>
                    <h1 className='recipe-title'>{recipe.title}</h1>
                    <p className='recipe-author'>By: {recipe.user.first_name}&nbsp;{recipe.user.last_name}</p>
                </div>
                <div className='top-right-quadrant'>
                    <div className='recipe-image-container'>
                        {/* Need to add an image URL checker */}
                        <img className='recipe-image' src={recipe.image} alt={recipe.title} />
                    </div>
                    <p className='recipe-description'>{recipe.description}</p>
                </div>
            </div>
            {/* Render ingredients if they exist */}

            {recipe.ingredients.length > 0 &&
                <div className='lower-left-quadrant'>
                    <h2>Ingredients</h2>
                    <ul className='ingredients-list'>
                    {recipe.ingredients.map(ingredient => (
                            <li className='ingredient'>
                                <p>{ingredient.quantity} {ingredient.unit} of {ingredient.name}</p>
                            </li>
                    ))}
                    </ul>
                </div>
            }
            {/* Render steps if they exist */}
                <div className='lower-right-quadrant'>
                    <h2>Preparation</h2>
                    <ul className='steps-list'>
                        {recipe.steps.map(step => (
                            <li className='step' key={step.id}>
                                <h4>Step&nbsp;{step.step_number}</h4>
                                <p>{step.description}</p>
                            </li>
                        ))}
                    </ul>

                    {currentUser?.id === recipe.user.id &&
                    <form onSubmit={addStep}>
                        <label for='add-step'>Add a step</label>
                        <textarea
                            placeholder='Add another step to this recipe'
                            name='add-step'
                            value={newStep}
                            onChange={e => setNewStep(e.target.value)}
                        />
                        <button type='submit'>Add This Step</button>
                    </form>
                    }
                </div>
        </div>
    );
}

export default RecipeDetail;
