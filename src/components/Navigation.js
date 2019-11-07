import React from 'react';
import { Link } from 'react-router-dom';

import { routes } from '../constants/routes.js';

const Navigation = () => {
    return (
        <div>
            <ul>
                <li>
                    <Link to={routes.AUTH}>Login / Signup</Link>
                </li>
                <li>
                    <Link to={routes.HOME}>Home</Link>
                </li>
                <li>
                    <Link to={routes.CALENDAR}>Calendar</Link>
                </li>
                <li>
                    <Link to={routes.ME}>Me</Link>
                </li>
            </ul>
        </div>
    );
};

export default Navigation;
