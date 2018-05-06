import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './components/layout/navbar';
import Footer from './components/layout/footer';
import Landing from './components/layout/landing';
import Register from './components/register';
import Login from './components/login';
import './App.css';

class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<Navbar />
					<Route path="/" exact component={Landing} />
					<div className="container">
						<Route path="/register" exact component={Register} />
						<Route path="/login" exact component={Login} />
					</div>
					<Footer />
				</div>
			</Router>
		);
	}
}

export default App;
