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

export const uploadImageThunk = ({image, recipe_id}) => async (dispatch) => {
    let formData = new FormData();
    formData.append('image', image);
    formData.append('recipe_id', recipe_id);
    console.log(formData)
    const response = await fetch('/api/images/upload/', {
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data",
            },
        body: formData,
    });
    if (response.ok) {
        const newImage = await response.json();
        dispatch(uploadImage(newImage));
    }
}

export const changeImageThunk = (formData) => async (dispatch) => {
    const response = await fetch('/api/images/upload/', {
        method: "POST",
        headers: {
        "Content-Type": "multipart/form-data",
        },
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
            return {
                ...state,
                [action.image.id]: action.image
            }
        }
        default:
            return state;
    }
}
