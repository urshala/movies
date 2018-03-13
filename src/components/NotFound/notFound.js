import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => 
	<div className="notFound">
		<h2> Oops! The page you are looking for doesn't exist :( </h2>
		<span> Click <Link to='/' >here </Link> to go to home </span>
	</div>

export default NotFound;