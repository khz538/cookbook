import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from '../../context/Modal';
import { deleteRecipeThunk } from "../../store/recipes";
import UpdateRecipe from "./UpdateRecipe";

export default function Recipe({ recipe, currentUser, setShowUpdate }) {
    
    return (
        <div className='top-recipe-wrapper'>
            <div className='top-left-quadrant'>
                <h1 className='recipe-title'>{recipe.title}</h1>
                <p className='recipe-author'>By: {recipe.user.first_name}&nbsp;{recipe.user.last_name}</p>
                {currentUser?.id === recipe.user_id && <button onClick={() => setShowUpdate(true)}>Edit</button>}
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
