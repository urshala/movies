import React from 'react';
import './header.css';

import { Link } from 'react-router-dom';


const Header = () =>(
	<header>
		<Link to='/'><h1>Movies by React.js</h1></Link>
	</header>
	);

export default Header;
