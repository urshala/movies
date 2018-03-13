import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import Layout from './components/Layout';
import MovieDetail from './components/MovieDetail';
import NotFound from './components/NotFound/notFound';

class App extends Component {
 
  render() {
    return (
    	<BrowserRouter>
			<div className="App">
				<Header/>
				<Switch>
					<Route path="/" exact render={(props) => <Layout {...props} />}></Route>
					<Route path="/movies/:movieId"  exact render={(props) => <MovieDetail {...props} />} ></Route>
					<Route component={NotFound}></Route>
				</Switch>
			</div>
    	</BrowserRouter>
      
    );
  }
}

export default App;
