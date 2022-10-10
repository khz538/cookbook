
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import logo from './logo.png'
import './NavBar.css'
import * as sessionActions from '../store/session';
import { searchThunk } from '../store/search';

const NavBar = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    // const [showModal, setShowModal] = useState(false);

    const demoLogin = async e => {
        e.preventDefault();
        await dispatch(sessionActions.login('demo@aa.io', 'password'));
        return <Redirect to='/' />
    }

    const search = async e => {
        e.preventDefault();
        const query = e.target.value;
        await dispatch(searchThunk(query));
        return <Redirect to='/search' />
    }

    return (
        <nav className='navbar'>
            <NavLink to='/' exact={true} activeClassName='active'>
                <div className='logo-container'>
                    {/* Render Image Here */}
                    <img src={logo} alt='logo' />
                    <h1>CookBook</h1>
                </div>
            </NavLink>

            {/* Search bar */}
            <div className='search-bar'>
                <input type='text' placeholder='Search' />
                <button type='submit'>Search</button>
            </div>

            <div className='nav-links-right'>
                {!sessionUser &&
                    <NavLink className='login navlink' to='/login' exact={true} activeClassName='active'>
                        Login
                    </NavLink>
                }
                {!sessionUser && <NavLink className={'signup navlink'} to='/sign-up' exact={true} activeClassName='active'>
                    Sign Up
                </NavLink>}
                {!sessionUser && <button className='demo-button' onClick={demoLogin}>Demo</button>}
                {sessionUser && <NavLink className={'add-recipe navlink'} to={`/recipes/new`}>Add a recipe</NavLink>}
                {/* {sessionUser && <NavLink className={'shopping-list navlink'} to={`/shopping-list`}>Shopping List</NavLink>} */}
                {sessionUser && <LogoutButton />}
            </div>
        </nav>
    );
}

export default NavBar;
