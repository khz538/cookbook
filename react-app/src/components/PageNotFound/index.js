import React from "react";
import { NavLink } from "react-router-dom";
import './PageNotFound.css';

export default function PageNotFound() {
    return (
        <div className='page-not-found-wrapper'>
            <h1>This page has yet to be born...</h1>
            <NavLink
             to='/'
             style={{ textDecoration: 'none', color: 'black', fontSize: '1.5rem' }}
             className='go-home-link'
             >
                Go Home
            </NavLink>
        </div>
    );
};
