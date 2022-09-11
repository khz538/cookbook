import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteIngredientThunk } from "../../store/ingredients";
import { Modal } from "../../context/Modal";
import UpdateIngredient from "./UpdateIngredient";
import './RecipeDetail.css'

const Ingredient = ({ ingredient, recipe }) => {
    // console.log(ingredient)
    const history = useHistory();
    const dispatch = useDispatch();
    const recipeId = recipe.id;
    // console.log(recipeId)
    const sessionUser = useSelector(state => state.session.user);
    const [showUpdate, setShowUpdate] = useState(false);

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
                        className="edit-button">Edit</button>
                    <button onClick={handleDelete}
                        className="delete-button">Delete</button>
                    {showUpdate && (
                        <Modal onClose={() => setShowUpdate(false)}>
                            <UpdateIngredient
                                ingredient={ingredient}
                                recipe={recipe}
                                setShowUpdate={setShowUpdate}
                            />
                        </Modal>

                    )}
                </div>)
            }
        </div>
    )

}

export default Ingredient;
