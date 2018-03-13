import React from 'react'
import './navigation.css'
import Dropdown from './dropdown'
import Slider from './slider'



export default class Navigation extends React.Component{


	componentDidMount(){
		this.getGenres();
	}
	
	
	getGenres(){
		const URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`;
		fetch(URL)
			.then(res => res.json())
			.then(data => this.props.setGenres(data.genres))
			.catch(err => console.log(err))
	}



	
	render(){
		return(
			<section className="navigation">
				<Dropdown genres={this.props.genres} onGenreChange={this.props.onGenreChange}/>
				<Slider data={this.props.year} onSliderChange={this.props.onSliderChange}>Year</Slider>
				<Slider data={this.props.rating} onSliderChange={this.props.onSliderChange}>Rating</Slider>
				<Slider data={this.props.runtime} onSliderChange={this.props.onSliderChange}>Runtime</Slider>
				<button type="button" onClick={this.props.onSearchButtonClick}>Search</button>
			</section>
		)
	}
}