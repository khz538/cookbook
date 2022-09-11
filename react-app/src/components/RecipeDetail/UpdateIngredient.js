import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { editIngredientThunk } from '../../store/ingredients';

export default function UpdateIngredient({ ingredient, recipe, setShowUpdate }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(ingredient.quantity);
    const [unit, setUnit] = useState(ingredient.unit);
    const [name, setName] = useState(ingredient.name);
    const [errors, setErrors] = useState([]);
    const [isDisabled, setIsDisabled] = useState(true);
    // const [hasSubmitted, setHasSubmitted] = useState(false);
    // console.log(unit)
    useEffect(() => {
        const newErrors = [];
        if (!quantity) newErrors.push('Please quantify your ingredient');
        if (quantity > 1000) newErrors.push('Max quantity allowed is 1000 units');
        if (quantity < 0.01) newErrors.push('Quantity cannot be less than 1/100th of a unit')
        if (!name.length) newErrors.push('Please name your ingredient');
        if (name.length > 50) newErrors.push('Ingredient name is too long');
        setErrors(newErrors);
        errors.length ? setIsDisabled(true) : setIsDisabled(false);
    }, [name, quantity, errors.length, unit])

    const handleEdit = async e => {
        e.preventDefault();
        // setHasSubmitted(true);
        // console.log('handle edit triggered')
        const editedIngredient = {
            id: ingredient.id,
            quantity,
            unit,
            name,
        };
        await dispatch(editIngredientThunk(editedIngredient));
        history.push(`/recipes/${recipe.id}`);
        setShowUpdate(false);
    };

    return (
        <div>
            <div className='errors'>
                {errors.map(error => (
                    <p style={{color: "red"}}>{error}</p>
                ))}
            </div>
            <form onSubmit={handleEdit}>
                <label>Quantity</label>
                <input
                    className='input'
                    id='edit-quantity-field'
                    type='number'
                    placeholder='3.5'
                    onChange={e => setQuantity(e.target.value)}
                    value={quantity}
                    min={0}
                    max={1000}
                />
                <label>Unit</label>
                <select defaultValue={unit} onChange={e => setUnit(e.target.value)}>
                    <option value='DEFAULT' disabled>Choose a Unit</option>
                    <option value=''>No Unit</option>
                    <option value='cup(s)'>cup(s)</option>
                    <option value='tablespoon(s)'>tablespoon(s)</option>
                    <option value='teaspoon(s)'>teaspoon(s)</option>
                    <option value='pound(s)'>pound(s)</option>
                    <option value='ounce(s)'>ounce(s)</option>
                    <option value='gram(s)'>gram(s)</option>
                    <option value='millilitre(s)'>millilitre(s)</option>
                    <option value='pinch(es)'>pinch(es)</option>
                    <option value='piece(s)'>piece(s)</option>
                    <option value='slice(s)'>slice(s)</option>
                    <option value='sprig(s)'>sprig(s)</option>
                    <option value='can(s)'>can(s)</option>
                    <option value='package(s)'>package(s)</option>
                    <option value='bunch(es)'>bunch(es)</option>
                    <option value='head(s)'>head(s)</option>
                    <option value='stalk(s)'>stalk(s)</option>
                    <option value='clove(s)'>clove(s)</option>
                    <option value='bottle(s)'>bottle(s)</option>
                    <option value='bar(s)'>bar(s)</option>
                    <option value='sheet(s)'>sheet(s)</option>
                    <option value='kilo(s)'>kilo(s)</option>
                    <option value='liter(s)'>liter(s)</option>
                    <option value='gallon(s)'>gallon(s)</option>
                    <option value='quart(s)'>quart(s)</option>
                    <option value='pint(s)'>pint(s)</option>
                    <option value='fluid ounce(s)'>fluid ounce(s)</option>
                    <option value='drop(s)'>drop(s)</option>
                    <option value='handful(s)'>handful(s)</option>
                    <option value='milligram(s)'>milligram(s)</option>
                </select>
                <label>Ingredient</label>
                <input
                    type='text'
                    placeholder='Ingredient'
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <button type='submit' disabled={isDisabled}>Submit Edit</button>
            </form>
        </div>
    );
}
