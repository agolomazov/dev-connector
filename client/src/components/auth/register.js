import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../common/text-field-group';

class Register extends Component {
	state = {
		name: '',
		email: '',
		password: '',
		password2: '',
		errors: {
			name: null,
			email: null,
			password: null,
			password2: null,
		},
	};

	componentDidMount() {
		if(this.props.auth.isAuthenticated) {
			this.props.history.replace('/dashboard');
		}
	}

	static getDerivedStateFromProps(nextProps) {
		if(nextProps.errors) {
			return {
				errors: nextProps.errors
			}
		}
		return null;
	}

	onChangeHandler = event => {
		const state = { ...this.state };
		state[event.target.name] = event.target.value;
		state.errors[event.target.name] = null;
		this.setState({
			...state,
		});
	};

	onSubmitHandler = event => {
		event.preventDefault();
		const newUser = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2,
		};

		this.props.registerUser(newUser, this.props.history);
	};

	render() {
		const { name, email, password, password2, errors } = this.state;
	
		return (
			<div className="register">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Sign Up</h1>
							<p className="lead text-center">Create your DevConnector account</p>
							<form onSubmit={this.onSubmitHandler} noValidate>
							<TextFieldGroup 
									placeholder="Your name"
									onChange={this.onChangeHandler}
									value={name}
									error={errors.name}
									name="name"
								/>

								<TextFieldGroup 
									placeholder="Email address"
									type="email"
									onChange={this.onChangeHandler}
									value={email}
									error={errors.email}
									name="email"
									info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
								/>

								<TextFieldGroup 
									placeholder="Password"
									type="password"
									onChange={this.onChangeHandler}
									value={password}
									error={errors.password}
									name="password"
								/>

								<TextFieldGroup 
									placeholder="Confirm password"
									type="password"
									onChange={this.onChangeHandler}
									value={password2}
									error={errors.password2}
									name="password2"
								/>

								<button type="submit" className="btn btn-info btn-block mt-4">Register now</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Register.propTypes = {
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors,
});

const mapDispatchToProps = dispatch => ({
	registerUser: (newUser, history) => dispatch(registerUser(newUser, history)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));
