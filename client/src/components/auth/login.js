import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import TextFieldGroup from '../common/text-field-group';

class Login extends Component {
	state = {
		email: '',
		password: '',
		errors: {},
	};

	componentDidMount() {
		if(this.props.auth.isAuthenticated) {
			this.props.history.replace('/dashboard');
		}
	}

	static getDerivedStateFromProps(nextProps) {
		if(nextProps.auth.isAuthenticated) {
			nextProps.history.push('/dashboard');
			return null;
		}

		if (nextProps.errors) {
			return {
				errors: nextProps.errors,
			};
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
		const user = {
			email: this.state.email,
			password: this.state.password,
		};
		this.props.loginUser(user);
	};

	render() {
		const { email, password, errors } = this.state;
		return (
			<div className="login">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Log In</h1>
							<p className="lead text-center">Sign in to your DevConnector account</p>
							<form onSubmit={this.onSubmitHandler}>
								<TextFieldGroup 
									placeholder="Email address"
									type="email"
									onChange={this.onChangeHandler}
									value={email}
									error={errors.email}
									name="email"
								/>

								<TextFieldGroup 
									placeholder="Password"
									type="password"
									onChange={this.onChangeHandler}
									value={password}
									error={errors.password}
									name="password"
								/>

								<button type="submit" className="btn btn-info btn-block mt-4">
									Login
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Login.propTypes = {
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	loginUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors,
});

const mapDispatchToProps = dispatch => ({
	loginUser: userData => dispatch(loginUser(userData)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
