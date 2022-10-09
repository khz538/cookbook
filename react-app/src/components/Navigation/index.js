import logo from './logo.png';
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import DemoUser from '../DemoUser'
import SignUpFormModal from '../SignupFormModal'
import LoginFormModal from '../LoginFormModal'
import './Navigation.css';


export default function Navigation() {
    const sessionUser = useSelector(state => state.session.user);
    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
            <>
                <DemoUser />
                <LoginFormModal />
                <SignUpFormModal />
            </>
        );
    }

    return (
        <div className='navbar'>
            <div className='logo-container'>
                <NavLink exact to="/">
                    <img className='logo' src={logo} alt='meetup logo'></img>
                </NavLink>
            </div>
            <div className='nav-buttons'>
                {sessionLinks}
            </div>
        </div>
    );
}
