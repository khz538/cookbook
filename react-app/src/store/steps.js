const GET_STEPS = 'steps/GET_STEPS';
const CREATE_STEP = 'steps/CREATE_STEP';
const EDIT_STEP = 'steps/EDIT_STEP';
const DELETE_STEP = 'steps/DELETE_STEP';

const getSteps = (steps) => ({
    type: GET_STEPS,
    steps,
});

const createStep = (step) => ({
    type: CREATE_STEP,
    step,
});

const editStep = step => ({
    type: EDIT_STEP,
    step
});

const deleteStep = stepId => ({
    type: DELETE_STEP,
    stepId,
});

export const getStepsThunk = (recipeId) => async (dispatch) => {
    const response = await fetch(`/api/recipes/${recipeId}/steps/`);
    const steps = await response.json();
    dispatch(getSteps(steps));
}

export const createStepThunk = (step) => async (dispatch) => {
    const response = await fetch(`/api/recipes/${step.recipe_id}/steps/new/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(step),
    });
    console.log(response)
    if (response.ok) {
        const newStep = await response.json();
        dispatch(createStep(newStep));
    }
}

export const editStepThunk = step => async dispatch => {
    const res = await fetch(`/api/steps/${step.id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(step),
    });
    if (res.ok) {
        const updatedStep = await res.json();
        console.log(updatedStep)
        dispatch(editStep(updatedStep));
    };
};

export const deleteStepThunk = stepId => async dispatch => {
    const res = await fetch(`/api/steps/${stepId}/delete/`, { method: "DELETE" });
    if (res.ok) {
        const deletedStep = await res.json();
        dispatch(deleteStep(deletedStep.id));
    };
};


export default function reducer(state = {}, action) {
    switch (action.type) {
        case GET_STEPS: {
            const newState = {};
            action.steps.steps.forEach(step => newState[step.id] = step)
            return newState;
        }
        case CREATE_STEP: {
            const newState = { ...state };
            newState[action.step.id] = action.step;
            return newState;
        }
        case EDIT_STEP: {
            return { ...state, [action.step.id]: action.step };
        }
        case DELETE_STEP: {
            const newState = { ...state };
            delete newState[action.stepId];
            return newState;
        }
        default:
            return state;
    };
};
