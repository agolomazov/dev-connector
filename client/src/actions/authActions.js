import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../utils/setAuthToken';

// Register User
export const registerUser = (userData, history) => dispatch => {
	axios
		.post('/api/users/register', userData)
		.then(res => history.push('/login'))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};

// Login User - Get User Token
export const loginUser = userData => dispatch => {
	axios
		.post('/api/users/login', userData)
		.then(res => {
			// Save token to localStorage
			const { token } = res.data;
			// Set token to ls
			localStorage.setItem('jwt_token', token);
			// Set token to Auth header
			setAuthToken(token);
			// decode token to get user data
			const decoded = jwtDecode(token);
			// set Current user
			dispatch(setCurrentUser(decoded));
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};

// Set logged user
export const setCurrentUser = decoded => ({
	type: SET_CURRENT_USER,
	payload: decoded,
});

// Log user out
export const logoutUser = () => dispatch => {
	// Remove token from localStorage
	localStorage.removeItem('jwt_token');
	// Remove auth header for future request
	setAuthToken(false);
	// Set current user to {} which will set isAuthenticated to false
	dispatch(setCurrentUser({}));
};