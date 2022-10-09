import React from "react";
// import { NavLink } from "react-router-dom";
import './BottomBar.css';

export default function BottomBar() {
    return (
        <div className='bottom-bar-wrapper'>
            <div className="about-the-app">
                <p>CookBook is a project for people to discover and share their own recipes.</p>
                <p style={{fontSize:"14px"}}>
                    Inspired by The New York Times' NYT Cooking,
                    CookBook operates using a Flask back end server,
                    Flask-SQLAlchemy to manage the database,
                    and React/Redux on the front-end.

                </p>
            </div>
            <div className="about-links">
                <p style={{fontSize: '14px', fontWeight: 'bold'}}>About the App</p>
                <a target="_blank" rel="noopener noreferrer" href="https://github.com/khz538/nyt-cooking-clone/">CookBook GitHub Repository</a>
                <a target="_blank" rel="noopener noreferrer" href="https://cooking.nytimes.com/">NYT Cooking</a>
                <a target="_blank" rel="noopener noreferrer" href="https://reactjs.org/">React.js</a>
                <a target="_blank" rel="noopener noreferrer" href="https://redux.js.org/">Redux</a>
                <a target="_blank" rel="noopener noreferrer" href="https://flask.palletsprojects.com/en/2.2.x/">Flask</a>
                <a target="_blank" rel="noopener noreferrer" href="https://flask-sqlalchemy.palletsprojects.com/en/3.0.x/">Flask-SQLAlchemy</a>
            </div>
            <div className="about-me">
                <p style={{fontSize: '14px', fontWeight: 'bold'}}>About Me</p>
                <a target="_blank" rel='noopener noreferrer' href="https://kevinz.dev">
                    Portfolio
                </a>
                <a target="_blank" rel="noopener noreferrer" href="https://github.com/khz538/">
                    GitHub
                </a>
                <a target="_blank" rel="noopener noreferrer" href='https://www.linkedin.com/in/kevin-zhang-25831954/'>
                    LinkedIn
                </a>
            </div>
        </div>
    );
};
