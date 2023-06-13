import React from 'react'
import { NavLink } from 'react-router-dom';

export default function NavBar() {
    return (
        <React.Fragment>
            <nav className="main-navigation-items">
                <ul>
                    <li>
                        <NavLink to="/">Search</NavLink>
                    </li>
                    <li>
                        <NavLink to="/history">History</NavLink>
                    </li>
                </ul>
            </nav>
            <hr />
            <h1 className="title">Acme</h1>
        </React.Fragment>
    )
}