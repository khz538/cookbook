import React, { useEffect, useState } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllRecipesThunk } from '../../store/recipes';


const Recipes = () => {
    const dispatch = useDispatch();
    // const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const recipes = Object.values(useSelector(state => state.recipes)); //array of recipes
    const randomIndex = Math.floor(Math.random() * recipes.length);


    useEffect(() => {
        dispatch(getAllRecipesThunk()); //get recipes from db and store in redux state
    }, [dispatch]);

    if (!recipes) return null;

    return (
        <div className='container'>
            {sessionUser && <NavLink to={`/recipes/new`}>Add a recipe</NavLink>}
            <NavLink to={recipes.length > 0 && `/recipes/${recipes[randomIndex].id}`}>
                <div className='recipeoftheday'>
                    <img src={recipes.length > 0 ? recipes[randomIndex].image_url : 'https://res.cloudinary.com/khz538/image/upload/v1661845151/cld-sample-4.jpg'} />
                    <div className='recipeoftheday-card'>
                        {recipes.length > 0 && <h2>{recipes[randomIndex].title}</h2>}
                        {recipes.length > 0 && <h4>{recipes[randomIndex].user.first_name}&nbsp;{recipes[randomIndex].user.last_name}</h4>}
                    </div>
                </div>
            </NavLink>
            <div className='cards'>
                {recipes?.map(recipe => (
                    <div key={recipe.id} className='card'>
                        <NavLink to={`/recipes/${recipe.id}`}>
                            <div className='image-container'>
                                <img src={recipe.image_url} />
                            </div>
                            <div className='card-bottom'>
                                <h3>{recipe.title}</h3>
                                <p>{recipe.user.first_name}&nbsp;{recipe.user.last_name}</p>
                                <div className='prep-time'>
                                    <p>{recipe.time}</p>
                                </div>
                            </div>
                        </NavLink>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Recipes;
