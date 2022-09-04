const CREATE_INGREDIENT = 'ingredient/CREATE_INGREDIENT';
const EDIT_INGREDIENT = 'ingredient/EDIT_INGREDIENT';
const DELETE_INGREDIENT = 'ingredient/DELETE_INGREDIENT';

const createIngredientAction = ingredient => {
    return {
        type: CREATE_INGREDIENT,
        ingredient,
    };
}

const editIngredientAction = ingredient => {
    return {
        type: EDIT_INGREDIENT,
        ingredient,
    };
}

const deleteIngredientAction = ingredientId => {
    return {
        type: DELETE_INGREDIENT,
        ingredientId,
    };
}

export const createIngredientThunk = ingredient => async dispatch => {
    const res = await fetch(`/api/recipes/${ingredient.recipe_id}/ingredients/new`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ingredient),
    });
    if (res.ok) {
        const ingredient = await res.json();
        dispatch(createIngredientAction(ingredient));
        return ingredient;
    };
}

export const editIngredientThunk = ingredient => async dispatch => {
    const res = await fetch(`/api/ingredients/${ingredient.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ingredient),
    });
    if (res.ok) {
        const ingredient = await res.json();
        dispatch(editIngredientAction(ingredient));
        return ingredient;
    };
}

export const deleteIngredientThunk = ingredientId => async dispatch => {
    const res = await fetch(`/api/ingredients/${ingredientId}`, {
        method: 'DELETE',
    });
    if (res.ok) {
        dispatch(deleteIngredientAction(ingredientId));
        return res.ok;
    };
}

export default function ingredientsReducer(state = {}, action) {
    switch (action.type) {
        case CREATE_INGREDIENT: {
            const newState = { ...state };
            newState[action.ingredient.id] = action.ingredient;
            return newState;
        }
        case EDIT_INGREDIENT: {
            return {
                ...state,
                [action.ingredient.id]: action.ingredient,
            }
        }
        case DELETE_INGREDIENT: {
            const newState = { ...state };
            delete newState[action.ingredientId];
            return newState;
        }
        default: return state;
    }
}
