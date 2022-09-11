import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteStepThunk } from '../../store/steps';
import { Modal } from '../../context/Modal';
import UpdateStep from './UpdateStep';
import './RecipeDetail.css'

const Step = ({ step, recipe, stepIndex }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const recipeId = recipe.id;
    const sessionUser = useSelector(state => state.session.user);
    const [showUpdateBool, setShowUpdateBool] = useState(false);

    useEffect(() => {

    }, [dispatch]);

    const handleDelete = async e => {
        e.preventDefault();
        await dispatch(deleteStepThunk(step.id));
        history.push(`/recipes/${recipeId}`);
    }

    return (
        <div>
            <h4 className="step-number">Step&nbsp;{stepIndex + 1}</h4>
            <p className="instruction">{step.description}</p>
            {
                sessionUser?.id === recipe?.user_id && (
                    <div>
                        <button onClick={() => setShowUpdateBool(true)}
                            className="edit-button">Edit</button>
                        <button onClick={handleDelete}
                            className="delete-button">Delete</button>
                        {showUpdateBool && (
                            <Modal onClose={() => setShowUpdateBool(false)}>
                                <UpdateStep step={step} recipe={recipe} setShowUpdateBool={setShowUpdateBool} />
                            </Modal>
                        )}
                    </div>
                )
            }
        </div>
    )
}

export default Step;
