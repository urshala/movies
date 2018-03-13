import React from 'react';
import './movies.css';
import MovieItem from '../MovieItem';
export default function Movies(props){
		const {movies,onPageIncrease, onPageDecrease, page} = props;
		return(
			<section >
				<ul className="movies">
					{movies.map(movie =>
							<MovieItem key={movie.id} movie={movie} />
						)
					}
				</ul>
				<div className="pagination">
					<button onClick={onPageDecrease}>Previous</button>
					<span>Page {page}</span>
					<button onClick={onPageIncrease}>Next</button>
				</div>
				
			</section>
		);
}