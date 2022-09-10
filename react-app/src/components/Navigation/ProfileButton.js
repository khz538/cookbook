import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import "./ProfileButton.css";
import { useHistory, NavLink } from 'react-router-dom';
import * as sessionActions from "../../store/session";

export default function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    const logout = async e => {
        e.preventDefault();
        await dispatch(sessionActions.logout());
        history.push('/');
    }

    return (
        <>
            <button className='userprof-btn' onClick={openMenu}>
                <i className='fa-regular fa-address-card'></i>
            </button>
            {showMenu && (
                <div className='profile-dropdown'>
                    <label>Hi, {user.first_name}</label>
                    <NavLink to={`/recipes/new`}>Add a recipe</NavLink>
                    <div>
                        <button className='logout-btn' onClick={logout}>
                            Log Out
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
