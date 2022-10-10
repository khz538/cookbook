const SEARCH = 'search/SEARCH';

const search = query => {
    return {
        type: SEARCH,
        query,
    };
}

export const searchThunk = query => async dispatch => {
    // console.log('query', query)
    const res = await fetch(`/api/search/${query}/`);
    if (res.ok) {
        const results = await res.json();
        // console.log(results);
        dispatch(search(results));
        return results;
    }
}

export default function searchReducer(state = {}, action) {
    switch (action.type) {
        case SEARCH: {
            const newState = {};
            // console.log("action", action.query.recipes)
            action.query.recipes.forEach(result => {
                newState[result.id] = result;
            });
            // console.log(newState)
            return newState;
        };
        default: return state;
    }
}
