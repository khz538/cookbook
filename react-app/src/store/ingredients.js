const GET_INGREDIENTS = 'ingredients/GET_INGREDIENTS';
const CREATE_INGREDIENT = 'ingredients/CREATE_INGREDIENT';

const getIngredients = (ingredients) => ({
    type: GET_INGREDIENTS,
    ingredients,
});

const createIngredient = (ingredient) => ({
    type: CREATE_INGREDIENT,
    ingredient,
});

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

export default function reducer(state = {}, action) {
    switch (action.type) {
        case GET_INGREDIENTS:
            return action.ingredients;
        case CREATE_INGREDIENT: {
            const newState = { ...state };
            newState.ingredients.push(action.ingredient);
            return newState;
        }
        default:
            return state;
    }
}
