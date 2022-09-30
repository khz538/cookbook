import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    getAllShoppingListThunk,
    deleteShoppingListItemThunk,
    } from '../../store/shopping_list';


const ShoppingList = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const shoppingList = Object.values(useSelector(state => state.shopping_list)); //array of shopping list items

    useEffect(() => {
        dispatch(getAllShoppingListThunk()); //get shopping list from db and store in redux state
    }, [dispatch]);

    if (!shoppingList) return null;

    return (
        <div>
            <h1>Shopping List</h1>
            <div>
                {shoppingList?.map(item => (
                    <div key={item.id}>
                        <p>{item.name}</p>
                        <button onClick={() => dispatch(deleteShoppingListItemThunk(item.id))}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ShoppingList;
