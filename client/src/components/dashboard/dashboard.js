import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';
import Spinner from '../common/spinner';
import { Link } from 'react-router-dom';

class Dashboard extends Component {
	componentDidMount() {
		this.props.getCurrentProfile();
	}

	render() {
		const { user } = this.props.auth;
		const { profile, loading } = this.props.profile;
		let dashboardContent = null;

		if (!profile && loading) {
			dashboardContent = <Spinner />;
		}

		if (profile && !loading) {
			dashboardContent = <h4>Display profile</h4>;
		}

		if (!profile && !loading) {
			dashboardContent = (
				<div>
					<p className="lead text-muted">Welcome {user.name}</p>
					<p>You have not yet setup a profile, please add some info</p>
					<Link to="/create-profile" className="btn btn-lg btn-info">
						Create Profile
					</Link>
				</div>
			);
		}

		return (
			<div>
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<h1 className="display-4">Dashboard</h1>
							{dashboardContent}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Dashboard.propTypes = {
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	profile: state.profile,
	auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
	getCurrentProfile: () => dispatch(getCurrentProfile()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
