const GET_SHOPPING_LIST_ITEMS = 'shopping_list/GET_SHOPPING_LIST_ITEMS';
const ADD_SHOPPING_LIST_ITEMS = 'shopping_list/ADD_SHOPPING_LIST_ITEMS';
const DELETE_SHOPPING_LIST_ITEM = 'shopping_list/DELETE_SHOPPING_LIST_ITEM';

const getShoppingListItems = (shoppingListItems) => ({
    type: GET_SHOPPING_LIST_ITEMS,
    shoppingListItems,
});

const addShoppingListItems = (shoppingListItems) => ({
    type: ADD_SHOPPING_LIST_ITEMS,
    shoppingListItems,
});

const deleteShoppingListItem = (shoppingListItemId) => ({
    type: DELETE_SHOPPING_LIST_ITEM,
    shoppingListItemId,
});

export const getShoppingListItemsThunk = () => async (dispatch) => {
    const response = await fetch(`/api/shopping_list/`);
    const shoppingListItems = await response.json();
    dispatch(getShoppingListItems(shoppingListItems));
}

export const addShoppingListItemsThunk = (recipe_id) => async (dispatch) => {
    const response = await fetch(`/api/shopping_list/add/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipe_id }),
    });
    if (response.ok) {
        dispatch(addShoppingListItems(response.tojson()));
        return response;
    }
}

export const deleteShoppingListItemThunk = (shoppingListItemId) => async (dispatch) => {
    const response = await fetch(`/api/shopping_list/${shoppingListItemId}/delete/`, {
        method: 'DELETE',
    });
    if (response.ok) {
        dispatch(deleteShoppingListItem(shoppingListItemId));
    }
}


export default function reducer(state = {}, action) {
    switch (action.type) {
        case GET_SHOPPING_LIST_ITEMS: {
            const newState = {};
            action.shoppingListItems.forEach(shoppingListItem => newState[shoppingListItem.id] = shoppingListItem);
            return newState;
        }
        case ADD_SHOPPING_LIST_ITEMS: {
            const newState = { ...state };
            action.shoppingListItems.forEach(shoppingListItem => newState[shoppingListItem.id] = shoppingListItem);
            return newState;
        }
        case DELETE_SHOPPING_LIST_ITEM: {
            const newState = { ...state };
            delete newState[action.shoppingListItemId];
            return newState;
        }
        default:
            return state;
    }
}
