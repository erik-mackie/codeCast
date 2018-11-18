import React from 'react';
import { NavLink, withRouter } from "react-router-dom";
 
import CodecastLogo from '../images/CODECAST_LOGO.png';

function Nav() {
	return (
		<header>
			<div className="nav">
				<NavLink to="/"><img className="navLogo" src={ CodecastLogo }></img></NavLink>
				<div className="login-register">
					<NavLink to="/user/login" className="navBtn">Login</NavLink>
					<NavLink to="/user/register" className="navBtn">Register</NavLink>
				</div>
			</div>
			
		</header>
	)
}

export default withRouter(Nav);