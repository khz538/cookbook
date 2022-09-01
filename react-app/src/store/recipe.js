const GET_ALL_RECIPES = 'recipe/GET_ALL_RECIPES';
const GET_ONE_RECIPE = 'recipe/GET_ONE_RECIPE';

const getAllRecipesAction = recipes => ({
    type: GET_ALL_RECIPES,
    recipes
});

const getOneRecipeAction = recipe => ({
    type: GET_ONE_RECIPE,
    recipe
});


export const getAllRecipesThunk = () => async dispatch => {
    const response = await fetch('/api/recipes/');

    if (response.ok) {
        const recipes = await response.json();
        dispatch(getAllRecipesAction(recipes));
    }
}

export const getOneRecipeThunk = (id) => async dispatch => {
    const response = await fetch(`/api/recipes/${id}`);

    if (response.ok) {
        const recipe = await response.json();
        dispatch(getOneRecipeAction(recipe));
    }
}


export default function recipesReducer(state = {}, action) {
    switch (action.type) {
        case GET_ALL_RECIPES: {
            const newState = {};
            action.recipes.forEach(recipe => {
                newState[recipe.id] = recipe;
            });
            return newState;
        };
        case GET_ONE_RECIPE: {
            const newState = {};
            newState[action.recipe.id] = action.recipe;
            return newState;
        };
    }
}
