import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getOneRecipeThunk } from '../../store/recipes';
import { getStepsThunk, createStepThunk } from '../../store/steps';
import { getIngredientsThunk, createIngredientThunk } from '../../store/ingredients';
import { isWorkingImage } from '../../util';
import Ingredient from './Ingredient';
import Step from './Step';
import { Modal } from '../../context/Modal';
import UpdateRecipe from './UpdateRecipe';

const RecipeDetail = () => {
    const { recipeId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const recipe = useSelector(state => state.recipes)[recipeId];
    const steps = Object.values(useSelector(state => state.steps));
    const ingredients = Object.values(useSelector(state => state.ingredients));
    const currentUser = useSelector(state => state.session.user);
    const [newStep, setNewStep] = useState('');
    const [newIngredientQuantity, setNewIngredientQuantity] = useState('');
    const [newIngredientUnit, setNewIngredientUnit] = useState('');
    const [newIngredientName, setNewIngredientName] = useState('');
    const [stepErrors, setStepErrors] = useState([]);
    const [ingredientErrors, setIngredientErrors] = useState([]);
    const [isStepDisabled, setIsStepDisabled] = useState(true);
    const [errors, setErrors] = useState([]);
    const [showUpdate, setShowUpdate] = useState('false');

    useEffect(() => {
        const newStepErrors = [];
        if (!newStep.length) newStepErrors.push('* Please write instructions');
        if (newStep.length > 250) newStepErrors.push('* Please keep each step succinctly under 250 characters');
        setStepErrors(newStepErrors);
        stepErrors.length ? setIsStepDisabled(true) : setIsStepDisabled(false);
    }, [newStep, stepErrors.length])

    useEffect(() => {
        dispatch(getOneRecipeThunk(recipeId));
        dispatch(getStepsThunk(recipeId));
        dispatch(getIngredientsThunk(recipeId));
        // isWorkingImage(recipe?.image).then(res => console.log(res));
        // isWorkingImage('https://res.cloudinary.com/khz538/image/upload/v1661845151/cld-sample-4.jpg').then(res => console.log(res));
    }, [dispatch, recipeId])

    if (!recipe) return null;


    const addStep = async e => {
        e.preventDefault();
        const step = {
            recipe_id: recipeId,
            description: newStep,
        }
        // console.log(step)
        await dispatch(createStepThunk(step));
        setNewStep('');
        history.push(`/recipes/${recipeId}`);
    }

    const addIngredient = async e => {
        e.preventDefault();
        const ingredient = {
            recipe_id: recipeId,
            quantity: newIngredientQuantity,
            unit: newIngredientUnit,
            name: newIngredientName,
        }
        await dispatch(createIngredientThunk(ingredient));
        setNewIngredientQuantity('');
        // setNewIngredientUnit('');
        setNewIngredientName('');
        history.push(`/recipes/${recipeId}`);
    }

    return (
        <div className='recipe-outer-wrapper'>
            <div className='top-recipe-wrapper'>
                <div className='top-left-quadrant'>
                    <h1 className='recipe-title'>{recipe.title}</h1>
                    <p className='recipe-author'>By: {recipe.user.first_name}&nbsp;{recipe.user.last_name}</p>
                    {currentUser?.id === recipe.user_id && <button onClick={() => setShowUpdate(true)} />}
                </div>
                <div className='top-right-quadrant'>
                    <div className='recipe-image-container'>
                        {/* Need to add an image URL checker */}
                        {recipe.image ? <img className='recipe-image' src={recipe?.image} alt={recipe.title} /> : <img className='recipe-image' src='https://res.cloudinary.com/khz538/image/upload/v1661845151/cld-sample-4.jpg' alt={recipe.title} />}
                    </div>
                    <p className='recipe-description'>{recipe.description}</p>
                </div>
            </div>
            {/* Render ingredients if they exist */}

            <h2>Ingredients</h2>
            {/* {ingredients && ingredients.length > 0 && */}
                <div className='lower-left-quadrant'>
                    <ul className='ingredients-list'>
                    {ingredients?.map(ingredient => (
                            <li key={ingredient.id} className='ingredient'>
                                <Ingredient ingredient={ingredient} recipe={recipe} />
                            </li>
                    ))}
                    </ul>

                    {currentUser?.id === recipe.user.id &&
                    <div>
                        <form onSubmit={addIngredient}>
                            <input
                                type='number'
                                min={0}
                                value={newIngredientQuantity}
                                onChange={e => setNewIngredientQuantity(e.target.value)}
                                placeholder='Quantity'
                                required
                            />
                            <select defaultValue={'DEFAULT'} onChange={e => setNewIngredientUnit(e.target.value)}>
                                <option value='DEFAULT' disabled>Choose a Unit</option>
                                <option value=''>No Unit</option>
                                <option value='cup(s)'>cup(s)</option>
                                <option value='tablespoon(s)'>tablespoon(s)</option>
                                <option value='teaspoon(s)'>teaspoon(s)</option>
                                <option value='pound(s)'>pound(s)</option>
                                <option value='ounce(s)'>ounce(s)</option>
                                <option value='gram(s)'>gram(s)</option>
                                <option value='millilitre(s)'>millilitre(s)</option>
                                <option value='pinch(es)'>pinch(es)</option>
                                <option value='piece(s)'>piece(s)</option>
                                <option value='slice(s)'>slice(s)</option>
                                <option value='sprig(s)'>sprig(s)</option>
                                <option value='can(s)'>can(s)</option>
                                <option value='package(s)'>package(s)</option>
                                <option value='bunch(es)'>bunch(es)</option>
                                <option value='head(s)'>head(s)</option>
                                <option value='stalk(s)'>stalk(s)</option>
                                <option value='clove(s)'>clove(s)</option>
                                <option value='bottle(s)'>bottle(s)</option>
                                <option value='bar(s)'>bar(s)</option>
                                <option value='sheet(s)'>sheet(s)</option>
                                <option value='kilo(s)'>kilo(s)</option>
                                <option value='liter(s)'>liter(s)</option>
                                <option value='gallon(s)'>gallon(s)</option>
                                <option value='quart(s)'>quart(s)</option>
                                <option value='pint(s)'>pint(s)</option>
                                <option value='fluid ounce(s)'>fluid ounce(s)</option>
                                <option value='drop(s)'>drop(s)</option>
                                <option value='handful(s)'>handful(s)</option>
                                <option value='milligram(s)'>milligram(s)</option>
                            </select>
                            <input
                                type='text'
                                value={newIngredientName}
                                onChange={e => setNewIngredientName(e.target.value)}
                                placeholder='Ingredient Name'
                                required />
                            <button type='submit'>Add Ingredient</button>
                        </form>
                    </div>}
                </div>
            {/* } */}
            {/* Render steps if they exist */}
                <div className='lower-right-quadrant'>
                    <h2>Preparation</h2>
                    <ul className='steps-list'>
                        {steps?.map(step => (
                            <li className='step' key={step.id}>
                                {/* <h4>Step&nbsp;{step.step_number}</h4>
                                <p>{step.description}</p> */}
                                <Step step={step} recipe={recipe} stepIndex={steps.indexOf(step)} steps={steps} />
                            </li>
                        ))}
                    </ul>

                    {currentUser?.id === recipe.user.id &&
                    <div>
                        <div className='step-errors'>
                            {stepErrors.map(error => <p style={{color: 'red'}}>{error}</p>)}
                        </div>
                        <form onSubmit={addStep}>
                            <label htmlFor='add-step'>Add a step</label>
                            <textarea
                                placeholder='Add another step to this recipe'
                                name='add-step'
                                value={newStep}
                                onChange={e => setNewStep(e.target.value)}
                                maxLength={251}
                                className='textarea-field'
                                id='add-step-field'
                            />
                            <button type='submit' disabled={isStepDisabled}>Add Step</button>
                        </form>
                    </div>
                    }
                </div>
        </div>
    );
}

export default RecipeDetail;
