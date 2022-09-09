import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from '../../context/Modal';
import { deleteRecipeThunk, getOneRecipeThunk } from "../../store/recipes";
import UpdateRecipe from "./UpdateRecipe";
// import StarRating from "../Rating";

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
                <h1 className='recipe-title'>{recipe.title}</h1>
                <p className='recipe-author'>By: {recipe.user.first_name}&nbsp;{recipe.user.last_name}</p>
                {currentUser?.id === recipe.user_id && <button onClick={() => setShowUpdate(true)}>Edit</button>}
                {currentUser?.id === recipe.user_id && <button onClick={handleDelete}>Delete</button>}
            </div>
            <div className='top-right-quadrant'>
                <div className='recipe-image-container'>
                    {/* Need to add an image URL checker */}
                    {recipe.image_url ? <img className='recipe-image' src={recipe.image_url} alt={recipe.title} /> : <img className='recipe-image' src='https://res.cloudinary.com/khz538/image/upload/v1661845151/cld-sample-4.jpg' alt={recipe.title} />}
                </div>
                <p className='recipe-description'>{recipe.description}</p>
            </div>
            {showUpdate && <Modal onClose={() => setShowUpdate(false)}>
                <UpdateRecipe recipe={recipe} setShowUpdate={setShowUpdate} />
            </Modal>}
        </div>
    );
}