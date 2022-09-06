const GET_INGREDIENTS = 'ingredients/GET_INGREDIENTS';
const CREATE_INGREDIENT = 'ingredients/CREATE_INGREDIENT';
const EDIT_INGREDIENT = 'ingredients/EDIT_INGREDIENT';
const DELETE_INGREDIENT = 'ingredients/DELETE_INGREDIENT';

const getIngredients = (ingredients) => ({
    type: GET_INGREDIENTS,
    ingredients,
});

const createIngredient = (ingredient) => ({
    type: CREATE_INGREDIENT,
    ingredient,
});

const editIngredient = (ingredient) => ({
    type: EDIT_INGREDIENT,
    ingredient,
});

const deleteIngredient = ingredientId => ({
    type: DELETE_INGREDIENT,
    ingredientId,
})

export const getIngredientsThunk = (recipeId) => async (dispatch) => {
    const response = await fetch(`/api/recipes/${recipeId}/ingredients`);
    const ingredients = await response.json();
    dispatch(getIngredients(ingredients));
}

export const createIngredientThunk = (ingredient) => async (dispatch) => {
    const response = await fetch(`/api/recipes/${ingredient.recipe_id}/ingredients/new/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ingredient),
    });
    console.log(response)
    if (response.ok) {
        const newIngredient = await response.json();
        dispatch(createIngredient(newIngredient));
    }
}

export const editIngredientThunk = (ingredient) => async (dispatch) => {
    const response = await fetch(`/api/ingredients/${ingredient.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ingredient),
    });
    if (response.ok) {
        const updatedIngredient = await response.json();
        dispatch(editIngredient(updatedIngredient));
    };
}

export const deleteIngredientThunk = ingredientId => async dispatch => {
    const res = await fetch(`/api/ingredients/${ingredientId}/delete/`, {
        method: 'DELETE',
    });
    console.log(res);
    if (res.ok) {
        const deletedIngredient = await res.json();
        // console.log(deletedIngredient);
        dispatch(deleteIngredient(deletedIngredient.id));
    }
}

export default function reducer(state = {}, action) {
    switch (action.type) {
        case GET_INGREDIENTS: {
            const newState = {};
            action.ingredients.ingredients.forEach(ingredient => newState[ingredient.id] = ingredient);
            return newState;
        }
        case CREATE_INGREDIENT: {
            const newState = { ...state };
            newState[action.ingredient.id] = action.ingredient;
            return newState;
        }
        case EDIT_INGREDIENT: {
            // const newState = { ...state };
            // const ingredient = newState.ingredients.find(ingredient => ingredient.id === action.ingredient.id);
            // ingredient.quantity = action.ingredient.quantity;
            // ingredient.unit = action.ingredient.unit;
            // ingredient.name = action.ingredient.name;
            // return newState;
            return {
                ...state,
                [action.ingredient.id]: action.ingredient
            }
        }
        case DELETE_INGREDIENT: {
            const newState = { ...state };
            // console.log(action.ingredientId)
            // console.log('before delete:', newState)
            delete newState[action.ingredientId];
            // console.log('after delete:', newState)
            return newState;
        }
        default:
            return state;
    }
}
