import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserRatingThunk, editRatingThunk, createRatingThunk } from '../../store/rating';
// import FullStar from '../../images/full-star.png';
// import EmptyStar from '../../images/empty-star.png';
import './StarRating.css';


const StarRating = ({recipe, currentUser}) => {
    const userRating = Object.values(useSelector(state => state.rating))[0];
    const [rating, setRating] = useState(userRating?.rating);
    const [hover, setHover] = useState(null);
    console.log(userRating)

    const dispatch = useDispatch();

    useEffect(() => {
        if (currentUser) {
            dispatch(getUserRatingThunk(recipe.id));
        }
    }, [dispatch, recipe.id, currentUser]);

    // useEffect(() => {
    //     dispatch(editRatingThunk(rating));
    // }, [rating]);

    const handleRating = (e, index) => {
        e.preventDefault();
        console.log(index)
        setRating(index);
        if (userRating) {
            if (Object.values(userRating).length === 0) {
                const newRating = {
                    rating: index,
                    recipe_id: recipe.id,
                    user_id: currentUser.id
                }
                console.log(newRating)
                dispatch(createRatingThunk(newRating));
            } else {
                const editedRating = {
                    id: userRating.id,
                    recipe_id: recipe.id,
                    user_id: currentUser.id,
                    rating: index,
                };
                console.log(editedRating)
                dispatch(editRatingThunk(editedRating));
            }
        } else {
            const newRating = {
                rating: index,
                recipe_id: recipe.id,
                user_id: currentUser.id
            }
            console.log(newRating)
            dispatch(createRatingThunk(newRating));
        }
    }

    return (
    <div className="star-rating">
        {[...Array(5)].map((star, index) => {
        index += 1;
        return (
            <button
                type="button"
                key={index}
                className={index <= (hover || rating) ? "on" : "off"}
                onClick={(e) => {handleRating(e, index)}}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
            >
            <span className="star">&#9733;</span>
            </button>
        );
        })}
    </div>
    );
};


export default StarRating;
