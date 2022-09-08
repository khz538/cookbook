import React, { useEffect, useState } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllRecipesThunk } from '../../store/recipes';


const Recipes = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const recipes = Object.values(useSelector(state => state.recipes)); //array of recipes


    useEffect(() => {
        dispatch(getAllRecipesThunk()); //get recipes from db and store in redux state
    }, [dispatch]);

    return (
        <div className='container'>
            {recipes && recipes.map(recipe => (
                <div className='card'>
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
    );
}

export default Recipes;
