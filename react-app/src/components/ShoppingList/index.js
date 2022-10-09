import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import {
    getShoppingListItemsThunk,
    deleteShoppingListItemThunk,
    } from '../../store/shopping_list';
import './ShoppingList.css';

const ShoppingList = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const shoppingList = Object.values(useSelector(state => state.shopping_list)); //array of shopping list items

    useEffect(() => {
        dispatch(getShoppingListItemsThunk()); //get shopping list from db and store in redux state
    }, [dispatch]);

    // if (shoppingList.length === 0) {
    //     return (
    //         <h1>Shopping List is Empty</h1>
    //     )
    // };
    // const handleDeleteItem = async e => {
    //     e.preventDefault();
    //     await dispatch(deleteShoppingListItemThunk())
    // }


    return (
        <div id='shopping-list-container'>
            <h1 className='title'>Shopping List</h1>
            <div>
                {shoppingList.length === 0 ? <h3>You have no items in your shopping list</h3> : shoppingList.map(item => (
                    <div key={item.id}>
                        <h3 className='ingredient' id='list-item'>{item.ingredient.name.charAt(0).toUpperCase() + item.ingredient.name.slice(1)},&nbsp;{item.ingredient.quantity} {item.ingredient.unit}</h3>
                        <button className='button' onClick={async e => {
                            e.preventDefault();
                            await dispatch(deleteShoppingListItemThunk(item.id));
                            history.push('/shopping-list')
                        }}>Remove</button>
                    </div>
                ))}
            </div>
            <button className='button' id='print-button' onClick={e => {
                e.preventDefault();
                window.print();
            }}>Print
            </button>
        </div>
    )
}

export default ShoppingList;
