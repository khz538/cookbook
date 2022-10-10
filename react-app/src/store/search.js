const SEARCH = 'search/SEARCH';

const search = query => {
    return {
        type: SEARCH,
        query,
    };
}

export const searchThunk = query => async dispatch => {
    const res = await fetch(`/api/search/${query}/`);
    if (res.ok) {
        const results = await res.json();
        dispatch(search(results));
        return results;
    }
}

export default function searchReducer(state = {}, action) {
    switch (action.type) {
        case SEARCH: {
            const newState = {};
            action.query.forEach(result => {
                newState[result.id] = result;
            });
            return newState;
        };
        default: return state;
    }
}
