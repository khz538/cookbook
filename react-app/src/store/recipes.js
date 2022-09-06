const GET_ALL_RECIPES = 'recipe/GET_ALL_RECIPES';
const GET_ONE_RECIPE = 'recipe/GET_ONE_RECIPE';
const CREATE_RECIPE = 'recipe/CREATE_RECIPE';
const EDIT_RECIPE = 'recipe/EDIT_RECIPE';
const DELETE_RECIPE = 'recipe/DELETE_RECIPE';

const getAllRecipesAction = recipes => ({
    type: GET_ALL_RECIPES,
    recipes
});

export const getAllRecipesThunk = () => async dispatch => {
    const response = await fetch('/api/recipes/');
    if (response.ok) {
        const recipes = await response.json();
        dispatch(getAllRecipesAction(recipes));
    }
}

const getOneRecipeAction = recipe => ({
    type: GET_ONE_RECIPE,
    recipe
});

export const getOneRecipeThunk = (id) => async dispatch => {
    const response = await fetch(`/api/recipes/${id}/`);
    if (response.ok) {
        const recipe = await response.json();
        dispatch(getOneRecipeAction(recipe));
    };
};

const createRecipeAction = recipe => {
    return {
        type: CREATE_RECIPE,
        recipe,
    };
;}

// const createRecipeThunk = payload => async dispatch => {
//     const res = await fetch('/api/recipes/new', {
//         method: 'POST',
//         body: JSON.stringify(payload),
//         headers: { 'Content-Type': 'application/json' },
//     });
//     if (res.ok) {
//         const newRecipe = await res.json();
//         dispatch(createRecipeAction(newRecipe));
//         return newRecipe;
//     };
// };

const editRecipeAction = recipe => {
    return {
        type: EDIT_RECIPE,
        recipe
    }
};

export const editRecipeThunk = recipe => async dispatch => {
    const res = await fetch(`/api/recipes/${recipe.id}/edit/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipe),
    });
    if (res.ok) {
        const recipe = await res.json();
        dispatch(editRecipeAction(recipe.id));
        return recipe;
    };
};

const deleteRecipeAction = recipeId => {
    return {
        type: DELETE_RECIPE,
        recipeId
    };
};

export const deleteRecipeThunk = recipeId => async dispatch => {
    const res = await fetch(`/api/recipes/${recipeId}/delete/`, {
        method: 'DELETE',
    });
    if (res.ok) {
        dispatch(deleteRecipeAction(recipeId));
        return res.ok;
    }
}

export default function recipesReducer(state = {}, action) {
    switch (action.type) {
        case GET_ALL_RECIPES: {
            const newState = {};
            action.recipes.recipes.forEach(recipe => {
                newState[recipe.id] = recipe;
            });
            return newState;
        };
        case GET_ONE_RECIPE: {
            const newState = {};
            newState[action.recipe.id] = action.recipe;
            return newState;
        };
        case CREATE_RECIPE: {
            const newState = { ...state };
            newState[action.recipe.id] = action.recipe;
            return newState;
        };
        case EDIT_RECIPE: {
            return {
                ...state,
                [action.recipe.id]: action.recipe
            }
        };
        case DELETE_RECIPE: {
            const newState = { ...state };
            delete newState[action.recipeId];
            return newState;
        };
        default: return state;
    };
};
