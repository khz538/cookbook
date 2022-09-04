
const GET_STEPS = 'steps/GET_STEPS';
const CREATE_STEP = 'step/CREATE_STEP';
const EDIT_STEP = 'step/EDIT_STEP';
const DELETE_STEP = 'step/DELETE_STEP';


const createStepAction = (recipeId, step) => {
    return {
        type: CREATE_STEP,
        recipeId,
        step,
    };
}

const editStepAction = step => {
    return {
        type: EDIT_STEP,
        step,
    };
}

const deleteStepAction = stepId => {
    return {
        type: DELETE_STEP,
        stepId,
    };
}

export const createStepThunk = step => async dispatch => {
    const res = await fetch(`/api/recipes/${step.recipe_id}/steps/new`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(step),
    });
    if (res.ok) {
        const step = await res.json();
        dispatch(createStepAction(step, step.recipe_id));
        return step;
    };
}

export const editStepThunk = step => async dispatch => {
    const res = await fetch(`/api/steps/${step.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(step),
    });
    if (res.ok) {
        const step = await res.json();
        dispatch(editStepAction(step));
        return step;
    };
}

export const deleteStepThunk = stepId => async dispatch => {
    const res = await fetch(`/api/steps/${stepId}`, {
        method: 'DELETE',
    });
    if (res.ok) {
        dispatch(deleteStepAction(stepId));
        return res.ok;
    };
}

export default function stepsReducer(state = {}, action) {
    switch(action.type) {
        case CREATE_STEP: {
            const newState = { ...state };
            newState[action.recipe.recipeId.step.id] = action.step;
            return newState;
        };
        case EDIT_STEP: {
            return {
                ...state,
                [action.step.id]: action.step
            }
        };
        case DELETE_STEP: {
            const newState = { ...state };
            delete newState[action.stepId];
            return newState;
        }
        default: return state;
    }
}
