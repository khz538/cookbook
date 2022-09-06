import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteStepThunk } from '../../store/steps';
import { Modal } from '../../context/Modal';
import UpdateStep from './UpdateStep';

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
            <h4>Step&nbsp;{stepIndex + 1}</h4>
            <p>{step.description}</p>
            {
                sessionUser?.id === recipe?.user_id && (
                    <div>
                        <button onClick={() => setShowUpdateBool(true)}
                            className="edit-button">Edit</button>
                        <button onClick={handleDelete}
                            className="delete-button">Delete</button>
                        {showUpdateBool && (
                            <Modal onClose={() => setShowUpdateBool(false)}>
                                <UpdateStep />
                            </Modal>
                        )}
                    </div>
                )
            }
        </div>
    )
}

export default Step;
