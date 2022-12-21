const UPLOAD_IMAGE = 'images/UPLOAD_IMAGE';
const CHANGE_IMAGE = 'images/CHANGE_IMAGE';

const uploadImage = (image) => ({
    type: UPLOAD_IMAGE,
    image,
});


const changeImage = (image) => ({
    type: CHANGE_IMAGE,
    image,
});

export const uploadImageThunk = formData => async dispatch => {
    const response = await fetch('/api/images/upload/', {
        method: "POST",
        body: formData,
    });
    if (response.ok) {
        const newImage = await response.json();
        dispatch(uploadImage(newImage));
    }
}

export const changeImageThunk = (formData, imageId) => async dispatch => {
    const response = await fetch(`/api/images/${imageId}/`, {
        method: "PUT",
        body: formData,
    });
    if (response.ok) {
        const updatedImage = await response.json();
        dispatch(changeImage(updatedImage));
    }
}

export default function reducer(state = {}, action) {
    switch(action.type) {
        case UPLOAD_IMAGE: {
            const newState = { ...state };
            newState[action.image.id] = action.image;
            return newState;
        }
        case CHANGE_IMAGE: {
            console.log(action.image)
            return {
                ...state,
                [action.image.id]: action.image
            }
        }
        default:
            return state;
    }
}
