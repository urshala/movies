import React from 'react';
import Loading from '../Loading';

import './movieDetail.css';

export default class MovieDetail extends React.Component{
	constructor(props){
		super(props);
		this.state={
			movie:{},
		}
		this.fetchMovie = this.fetchMovie.bind(this);
	}

	componentDidMount(){
		this.fetchMovie();
	}

	fetchMovie(){
		const {movieId} = this.props.match.params;
		fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`)
			.then(res => res.json())
			.then(movie => this.setState({movie}))
			.catch(err => console.log('Error: ',err))
	}


	render(){
		const { movie } = this.state;
		const { title, backdrop_path, release_date, genres, overview, vote_average, runtime} = this.state.movie;
		const ImageUrl =`http://image.tmdb.org/t/p/w1280/${backdrop_path}`;
		const background = {
			background: `url(${ImageUrl})`,
			backgroundRepeat:'no-repeat',
			backgroundSize:'cover'
		}
		return(
			<div className="movie-page">
				{ Object.keys(movie).length > 0 ?
					<div className="movie-det">
						<div className="movie-image" style={background}></div>
						<div className="movie-details">
							<div className="head">
								<h1>{title}</h1>
								<button onClick={this.props.history.goBack}> Back </button>
							</div>
							<section className="genres">
								{genres.map((eachGenre, index) => 
									<div key={index}>
										<span>{eachGenre.name}</span>
										{index < genres.length -1 && <span className="seperator">|</span>}
									</div>
								 )
								}
							</section>
							<h5>Rating: <span>{vote_average}</span></h5>
							<h5>Runtime: <span>{runtime} min</span></h5>
							<h4>Overview</h4>
							<p>{overview}</p>

						</div>
					</div>

					: <Loading/>
				}
			</div>	
		)
		
	}
}