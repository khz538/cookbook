
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import logo from './logo.png'
import './NavBar.css'
import * as sessionActions from '../store/session';
// import { searchThunk } from '../store/search';


const NavBar = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [query, setQuery] = React.useState('');
    // const [showModal, setShowModal] = useState(false);

    const demoLogin = async e => {
        e.preventDefault();
        await dispatch(sessionActions.login('demo@aa.io', 'password'));
        return <Redirect to='/' />
    }

    const handleSearchButton = async e => {
        e.preventDefault();
        setQuery(e.target.value);
        e.target.value = '';
        history.push(`/search/${query}`);
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
                <form onSubmit={handleSearchButton}>
                    <input type='text' placeholder='Search' value={query} onChange={e => setQuery(e.target.value)}/>
                    <button type='submit' disabled={false}>Search</button>
                </form>
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
