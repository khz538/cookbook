import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteStepThunk } from '../../store/steps';

const Step = ({ step, recipe }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const recipeId = recipe.id;
    const sessionUser = useSelector(state => state.session.user);
    const [showUpdate, setShowUpdate] = useState(false);

    useEffect(() => {

    }, [dispatch]);

    const handleDelete = async e => {
        e.preventDefault();
        await dispatch(deleteStepThunk(step.id));
        history.push(`/recipes/${recipeId}`);
    }

    return (
        <div>
            <h4>Step&nbsp;{step.step_number}</h4>
            <p>{step.description}</p>
            <button onClick={() => setShowUpdate(true)}
                className="edit-button">Edit</button>
            <button onClick={handleDelete}
                className="delete-button">Delete</button>
        </div>
    )
}

export default Step;
