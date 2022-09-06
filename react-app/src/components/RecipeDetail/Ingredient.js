import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteIngredientThunk } from "../../store/ingredients";
import { getOneRecipeThunk } from "../../store/recipes";

const Ingredient = ({ ingredient, recipe }) => {
    // console.log(ingredient)
    const history = useHistory();
    const dispatch = useDispatch();
    const recipeId = recipe.id;
    // console.log(recipeId)
    const sessionUser = useSelector(state => state.session.user);
    const [showUpdate, setShowUpdate] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    useEffect(() => {

    }, [dispatch])

    const handleDelete = async e => {
        e.preventDefault();
        await dispatch(deleteIngredientThunk(ingredient.id));
        // await dispatch(getOneRecipeThunk(recipeId));
        history.push(`/recipes/${recipeId}/`);
        // window.location.reload()
        // history.push(`/`);
    }

    return (
        <div>
            <p>{ingredient.name}, {ingredient.quantity} {ingredient.unit}</p>
            {sessionUser && sessionUser.id === recipe.user_id && (
                <div>
                    <button onClick={() => setShowUpdate(true)}
                        className="edit-ingredient-button">Edit</button>
                    <button onClick={handleDelete}
                        className="delete-ingredient-button">Delete</button>
                </div>)
            }
        </div>
    )

}

export default Ingredient;
