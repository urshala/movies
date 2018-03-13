import React from 'react';
import Navigation from '../Navigation';
import Movies from '../Movies';
import Loading from '../Loading';

import './layout.css';

export default class Layout extends React.Component{
	constructor(props){
		super(props);
		this.state={
			genre:'Comedy',
			genres:[],
			page:1,
			year:{
				label:'year',
				min:1990,
				max:2017,
				step:1,
				value:{min:2000, max:2017}
			},
			rating:{
				label: 'rating',
				min: 4,
				max:10,
				step:1,
				value:{min:5, max: 10}
			},
			runtime:{
				label: 'runtime',
				min: 0,
				max:300,
				step:15,
				value:{min:5, max: 120}
			},
			movies: null,
			movieUrl:`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=1`,
			total_pages:1,
		}

		this.onSliderChange = this.onSliderChange.bind(this);
		this.setGenres = this.setGenres.bind(this);
		this.createUrl = this.createUrl.bind(this);
		this.fetchMovie = this.fetchMovie.bind(this);
		this.storeData = this.storeData.bind(this);
	}

	
	componentDidMount(){
		//simulate the loading ...
		const savedState = this.getStateFromLocalStorage();
		if(!savedState || (savedState && !savedState.movies.length)){
			setTimeout(() => this.fetchMovie(this.state.movieUrl), 2000);
		}else{
			this.setState({...savedState});
			this.createUrl(savedState);
		}
		
		
	}

	componentDidUpdate(prevProps, prevState){
		this.saveStateToLocalStorage();
		if(this.state.movieUrl !== prevState.movieUrl){
			this.fetchMovie(this.state.movieUrl);
		}
		if(this.state.page !== prevState.page){
			this.createUrl(this.state);
		}
	}

	onSliderChange(changedData){
		this.setState({
			[changedData.type]: {...this.state[changedData.type], value: changedData.value}
		})
	}

	setGenres(genresToSet){
		this.setState({genres:genresToSet});
	}

	onSearchButtonClick = ()=>{
		this.setState({page:1});
		this.createUrl(this.state);
	}

	saveStateToLocalStorage = () => {
		localStorage.setItem('user_data', JSON.stringify(this.state));
	}

	getStateFromLocalStorage = () => {
		return JSON.parse(localStorage.getItem('user_data'));
	}
	createUrl(params){
		const {rating, runtime, year, page,genres } = params;
		const genreId = genres.filter(item => item.name === this.state.genre)[0]['id'];
		const movieUrl = `https://api.themoviedb.org/3/discover/movie?` +
			`api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US` +
			`with_genres=${genreId}` +
			`primary_release_date.gte=${year.value.min}-01-01&` +
			`primary_release_date.lte=${year.value.max}-12-31&` +
			`vote_average.gte=${rating.value.min}&` +
		    `vote_average.lte=${rating.value.max}&` +
		    `with_runtime.gte=${runtime.value.min}&` +
		    `with_runtime.lte=${runtime.value.max}&` +
	        `page=${page}&`;
		;
		this.setState({movieUrl})
	}

	fetchMovie(url){
		fetch(url)
			.then(res => res.json())
			.then(data => this.storeData(data))
			.catch(err => console.log(err))
	}

	//function to store data 
	storeData(data){
		const movies = data.results.map(eachMovie =>{
			const {vote_count, id, genre_ids, poster_path, title, vote_average, release_date} = eachMovie;
			return {vote_count, id, genre_ids, poster_path, title, vote_average, release_date};
		});
		this.setState({movies, total_pages: data.total_pages});
	}

	onPageIncrease = () =>{
		const{page, total_pages} = this.state;
		const nextPage = page + 1;
		if (nextPage <= total_pages){
			this.setState({page:nextPage});
		}
	}

	onPageDecrease = () =>{
		const{page} = this.state;
		const nextPage = page -1;
		if (nextPage > 0){
			this.setState({page: nextPage});
		}
	}

	onGenreChange = (event)=>{
			this.setState({genre: event.target.value});
	}


	render(){
		const { movies, page } = this.state;
		return(
			<section className="main">
				<Navigation onGenreChange={this.onGenreChange} onSliderChange={this.onSliderChange} setGenres={this.setGenres} onSearchButtonClick={this.onSearchButtonClick} {...this.state}/>
				{ movies ? <Movies  
					movies={movies}
					page={page}
					onPageDecrease={this.onPageDecrease}
					onPageIncrease = {this.onPageIncrease}
					/>
				: <Loading/> }
				
			</section>
		)
	}
}