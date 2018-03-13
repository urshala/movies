import React from 'react';
import { Link } from 'react-router-dom';
import './movieItem.css';

const MovieItem = (props) =>{
	const {title, poster_path, release_date, vote_average, id} = props.movie;
	const imageUrl = `https://image.tmdb.org/t/p/w92${poster_path}`;
	const year = release_date.substring(0,4);
	return (
		<li className="movie-item">
			<Link to={`/movies/${id}`} className="movie">
				<img src={imageUrl} alt="Movie poster"/>
				<div className="movie-description">
					<h2>{title}</h2>
					<section className="movie-details">
						<div className="movie-year">
							<span className="title">Year</span>
							<span>{year}</span>
						</div>
						<div className="movie-rating">
							<span className="title">Rating</span>
							<span>{vote_average}</span>
						</div>
					</section>
				</div>
			</Link>
		</li>
	)
}

export default MovieItem;


/*
Send in English your CV, motivation letter addressed to IAESTE Finland
and your study grades stamped by your university to outgoing@iaeste.fi 
before the deadline and write the reference number and your name as the 
subject of the e-mail (i.e. FI-2018-123 Name Surname).
Ref number. NO-2018-000005C .
*/