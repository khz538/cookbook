import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllRecipesThunk } from '../../store/recipes';
import './Recipes.css';
import { defaultImage } from '../../util';


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
            <div className='featured-container'>
                <NavLink to={recipes.length > 0 && `/recipes/${recipes[randomIndex].id}`}>
                    <div className='recipeoftheday'>
                        <div className='featured-image-container'>
                            <img onError={e => e.currentTarget.src=defaultImage} className='featured-image' src={recipes.length > 0 ? recipes[randomIndex].image_url : defaultImage} />
                        </div>
                        <div className='recipeoftheday-card'>
                            {recipes.length > 0 && <h2 id='1'>{recipes[randomIndex].title}</h2>}
                            {recipes.length > 0 && <h4 id='2'>{recipes[randomIndex].user.first_name}&nbsp;{recipes[randomIndex].user.last_name}</h4>}
                        </div>
                    </div>
                </NavLink>
            </div>
            <div className='blurb'>
                <h1>Welcome to CookBook</h1>
                <p>To experience full site functionality, sign up or click Demo above.</p>
                <p>To just peruse, click a recipe!</p>
            </div>
            <div className='cards-container'>
                <div className='cards'>
                    {recipes?.map(recipe => (
                        <div key={recipe.id} className='card'>
                            <NavLink to={`/recipes/${recipe.id}`}>
                                <div className='image-container'>
                                    <img className='card-image' src={recipe.image_url} onError={e => e.currentTarget.src=defaultImage}/>
                                </div>
                                <div className='card-bottom'>
                                    <div id='title-author'>
                                        <h3 id='card-recipe-title'>{recipe.title}</h3>
                                        <p id='card-recipe-author'>{recipe.user.first_name}&nbsp;{recipe.user.last_name}</p>
                                    </div>
                                    <div id='card-recipe-preptime' className='prep-time'>
                                        <p id='5'>{recipe.time}</p>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Recipes;
