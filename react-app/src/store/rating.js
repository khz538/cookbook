const GET_USER_RATING = 'ratings/GET_USER_RATING';
const CREATE_RATING = 'ratings/CREATE_RATING';
const EDIT_RATING = 'ratings/EDIT_RATING';
const DELETE_RATING = 'ratings/DELETE_RATING';

const getUserRating = (rating) => ({
    type: GET_USER_RATING,
    rating,
});

const createRating = (rating) => ({
    type: CREATE_RATING,
    rating,
});

const editRating = (rating) => ({
    type: EDIT_RATING,
    rating,
});

const deleteRating = ratingId => ({
    type: DELETE_RATING,
    ratingId,
});

export const getUserRatingThunk = (recipeId) => async (dispatch) => {
    const response = await fetch(`/api/recipes/${recipeId}/ratings/`, {method: 'GET'});
    if (response.ok) {
        const rating = await response.json();
        console.log(rating)
        dispatch(getUserRating(rating));
        return rating;
    } else {
        dispatch(getUserRating(null));
    }
}

export const createRatingThunk = (rating) => async (dispatch) => {
    const response = await fetch(`/api/recipes/${rating.recipe_id}/ratings/new/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rating),
    });
    if (response.ok) {
        const newRating = await response.json();
        dispatch(createRating(newRating));
        return newRating;
    }
}

export const editRatingThunk = rating => async dispatch => {
    const response = await fetch(`/api/ratings/${rating.id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rating),
    });
    if (response.ok) {
        const updatedRating = await response.json();
        dispatch(editRating(updatedRating));
        return updatedRating;
    }
}

export const deleteRatingThunk = ratingId => async dispatch => {
    const res = await fetch(`/api/ratings/${ratingId}/delete/`, {
        method: 'DELETE',
    });
    if (res.ok) {
        const deletedRating = dispatch(deleteRating(ratingId));
        return deletedRating;
    }
}


export default function reducer(state = {}, action) {
    switch (action.type) {
        case GET_USER_RATING: {
            const newState = {};
            if (action.rating) {
                newState[action.rating.id] = action.rating;
                return newState;
            } else {
                return newState;
            }
        }
        case CREATE_RATING: {
            const newState = {...state};
            newState[action.rating.id] = action.rating;
            return newState;
        }
        case EDIT_RATING: {
            const newState = {...state};
            newState[action.rating.id] = action.rating;
            return newState;
        }
        case DELETE_RATING: {
            const newState = {...state};
            delete newState[action.ratingId];
            return newState;
        }
        default: return state;
    }
}
