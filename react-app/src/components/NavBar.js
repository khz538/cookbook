
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

const NavBar = () => {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <nav>
            <NavLink to='/' exact={true} activeClassName='active'>
                {/* Render Image Here */}
                CookBook Home
            </NavLink>
            <div className='nav-links-right'>
                {!sessionUser && <NavLink to='/login' exact={true} activeClassName='active'>
                    Login
                </NavLink>}
                {!sessionUser && <NavLink to='/sign-up' exact={true} activeClassName='active'>
                    Sign Up
                </NavLink>}
                {sessionUser && <NavLink to={`/recipes/new`}>Add a recipe</NavLink>}
                {sessionUser && <LogoutButton />}
            </div>
        </nav>
    );
}

export default NavBar;
