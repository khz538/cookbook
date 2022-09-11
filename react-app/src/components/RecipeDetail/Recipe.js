import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from '../../context/Modal';
import { deleteRecipeThunk, getOneRecipeThunk } from "../../store/recipes";
import UpdateRecipe from "./UpdateRecipe";
// import StarRating from "../Rating";
import { defaultImage } from "../../util";
import './RecipeDetail.css'
import './Ingredient.css'

export default function Recipe({ currentUser }) {
    const { recipeId } = useParams();
    const recipe = useSelector(state => state.recipes)[recipeId];
    const history = useHistory();
    const dispatch = useDispatch();
    const [showUpdate, setShowUpdate] = useState(false);

    useEffect(() => {
        dispatch(getOneRecipeThunk(recipeId));
    }, [dispatch, recipeId]);

    const handleDelete = async e => {
        e.preventDefault();
        await dispatch(deleteRecipeThunk(recipe.id));
        history.push(`/`);
    }

    // console.log(recipe)

    return (
        <div className='top-recipe-wrapper'>
            <div className='top-left-quadrant'>
                <div className="top-left-top">
                    <h1 className='recipe-title'>{recipe.title}</h1>
                    <p className='recipe-author'>By: {recipe.user.first_name}&nbsp;{recipe.user.last_name}</p>
                </div>
                <div className='top-left-bottom'>
                    {currentUser?.id === recipe.user_id && <button className="edit-button" onClick={() => setShowUpdate(true)}>Edit Title, Image, and Description</button>}
                    {currentUser?.id === recipe.user_id && <button className="delete-button" onClick={handleDelete}>Delete Recipe</button>}
                </div>
            </div>

            <div className='top-right-quadrant'>
                <div className='recipe-image-container'>
                    {/* Need to add an image URL checker */}
                    <img
                        onError={e => e.currentTarget.src=defaultImage}
                        className='recipe-image'
                        src={recipe.image_url}
                        alt={recipe.title}
                    />
                </div>
                <div className="description-container">
                    <p className='recipe-description'>{recipe.description}</p>
                </div>
            </div>
            {showUpdate && <Modal onClose={() => setShowUpdate(false)}>
                <UpdateRecipe recipe={recipe} setShowUpdate={setShowUpdate} />
            </Modal>}
        </div>
    );
}
