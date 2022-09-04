const GET_INGREDIENTS = 'ingredients/GET_INGREDIENTS';

const getIngredients = (ingredients) => ({
    type: GET_INGREDIENTS,
    ingredients,
});

export const getIngredientsThunk = (recipeId) => async (dispatch) => {
    const response = await fetch(`/api/recipes/${recipeId}/ingredients`);
    const ingredients = await response.json();
    dispatch(getIngredients(ingredients));
}

export default function reducer(state = {}, action) {
    switch (action.type) {
        case GET_INGREDIENTS:
            return action.ingredients;
        default:
            return state;
    }
}
