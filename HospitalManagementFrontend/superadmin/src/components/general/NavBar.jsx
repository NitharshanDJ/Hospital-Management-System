import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import navLogo from '../../assets/navbarIcon.png'

const NavBar = () => {
    return (         
        <nav className="navbar fixed-top navbar-expand-lg shadow-sm navbar-light">
            <Link className="navbar-brand d-flex" to="/superadmin">
                <img src={navLogo} height="30" width="30" className="d-block" alt="Navigation Icon" loading="lazy" />
                <span className="ml-2">Care COVID-19</span>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" to='/superadmin' exact>Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to='/superadmin/hospitals' exact>Manage</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
 
export default NavBar;