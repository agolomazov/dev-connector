import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Navbar from './components/layout/navbar';
import Footer from './components/layout/footer';
import Landing from './components/layout/landing';
import Register from './components/auth/register';
import Login from './components/auth/login';
import Dashboard from './components/dashboard/dashboard';
import CreateProfile from './components/create-profile/create-profile';
import './App.css';
import setAuthToken from './utils/setAuthToken';
import jwtDecode from 'jwt-decode';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearProfile } from './actions/profileActions';
import PrivateRoute from './components/common/private-route';

if (localStorage.getItem('jwt_token')) {
	setAuthToken(localStorage.getItem('jwt_token'));
	const decoded = jwtDecode(localStorage.getItem('jwt_token'));
	store.dispatch(setCurrentUser(decoded));

	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		// logoutUser
		store.dispatch(logoutUser());
		// clear current Profile
		store.dispatch(clearProfile());
		// redirect to login
		window.location.href = '/login';
	}
}

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div className="App">
						<Navbar />
						<Route path="/" exact component={Landing} />
						<div className="container">
							<Route path="/register" exact component={Register} />
							<Route path="/login" exact component={Login} />
							<Switch>
								<PrivateRoute path="/dashboard" exact component={Dashboard} />
								<PrivateRoute path="/create-profile" exact component={CreateProfile} />
							</Switch>
						</div>
						<Footer />
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
