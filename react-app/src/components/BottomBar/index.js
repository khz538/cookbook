import React from "react";
// import { NavLink } from "react-router-dom";
import './BottomBar.css';

export default function BottomBar() {
    return (
        <div className='bottom-bar-wrapper'>
            <div className="about-the-app">
                <p>CookBook is a project for people to discover and share their own recipes.</p>
            </div>
            <div className="about-links">
                <p style={{fontSize: '14px', fontWeight: 'bold'}}>Learn More</p>
                <a target="_blank" rel="noopener noreferrer" href="https://github.com/khz538/">
                    Github
                </a>
                <a target="_blank" rel="noopener noreferrer" href='https://www.linkedin.com/in/kevin-zhang-25831954/'>
                    LinkedIn
                </a>
                <a target="_blank" rel="noopener noreferrer" href="https://github.com/khz538/nyt-cooking-clone/">CookBook GitHub Repository</a>
            </div>
        </div>
    );
};
