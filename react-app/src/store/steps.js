const GET_STEPS = 'steps/GET_STEPS';
const CREATE_STEP = 'steps/CREATE_STEP';

const getSteps = (steps) => ({
    type: GET_STEPS,
    steps,
});

const createStep = (step) => ({
    type: CREATE_STEP,
    step,
});

export const getStepsThunk = (recipeId) => async (dispatch) => {
    const response = await fetch(`/api/recipes/${recipeId}/steps`);
    const steps = await response.json();
    dispatch(getSteps(steps));
}

export const createStepThunk = (step) => async (dispatch) => {
    const response = await fetch(`/api/recipes/${step.recipe_id}/steps/new`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(step),
    });
    if (response.ok) {
        const newStep = await response.json();
        dispatch(createStep(newStep));
    }
}


export default function reducer(state = {}, action) {
    switch (action.type) {
        case GET_STEPS:
            return action.steps;
        case CREATE_STEP:
            return { ...state, [action.step.id]: action.step };
        default:
            return state;
    }
}
