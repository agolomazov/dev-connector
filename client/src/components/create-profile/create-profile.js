import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import TextFieldGroup from '../common/text-field-group'
import TextAreaFieldGroup from '../common/text-area-field-group'
import SelectListGroup from '../common/select-list-group'
import InputGroup from '../common/input-group'
import { createProfile } from '../../actions/profileActions';

class CreateProfile extends Component {
  state = {
    displaySocialInputs: false,
    handle: '',
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
    errors: {}
  }

  onSubmit = event => {
    event.preventDefault()
    const newProfile = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram,
    };
    this.props.onCreateProfile(newProfile, this.props.history);
  }

  static getDerivedStateFromProps(nextProps) {
		if (nextProps.errors) {
			return {
				errors: nextProps.errors,
			};
		}
		return null;
	}

  onChangeHandle = event => {
    const state = { ...this.state }
    state[event.target.name] = event.target.value
    state.errors[event.target.name] = null
    this.setState({
      ...state
    })
  }

  render () {
    const { errors, displaySocialInputs } = this.state
    const options = [
      { label: '* Select Professions Status', value: 0},
      { label: 'Developer', value: 'Developer'},
      { label: 'Junior Developer', value: 'Junior Developer'},
      { label: 'Senior Developer', value: 'Senior Developer'},
      { label: 'Manager', value: 'Manager'},
      { label: 'Student or Learning', value: 'Student or Learning'},
      { label: 'Instructor or Teacher', value: 'Instructor or Teacher'},
      { label: 'Intern', value: 'Intern'},
      { label: 'Other', value: 'Other'}
		];
		
		let socialInputs = null;
		if (displaySocialInputs) {
			socialInputs = (
				<div>
					<InputGroup 
						placeholder="Twitter Profile URL"
						name="twitter"
						icon="fab fa-twitter"
						value={this.state.twitter}
						onChange={this.onChangeHandle}
						error={errors.twitter}
					/>

					<InputGroup 
						placeholder="Facebook Page URL"
						name="facebook"
						icon="fab fa-facebook"
						value={this.state.facebook}
						onChange={this.onChangeHandle}
						error={errors.facebook}
					/>

					<InputGroup 
						placeholder="Linkedin Profile URL"
						name="linkedin"
						icon="fab fa-linkedin"
						value={this.state.linkedin}
						onChange={this.onChangeHandle}
						error={errors.linkedin}
					/>

					<InputGroup 
						placeholder="Instagram Profile URL"
						name="instagram"
						icon="fab fa-instagram"
						value={this.state.instagram}
						onChange={this.onChangeHandle}
						error={errors.instagram}
					/>

					<InputGroup 
						placeholder="Youtube Profile URL"
						name="youtube"
						icon="fab fa-youtube"
						value={this.state.youtube}
						onChange={this.onChangeHandle}
						error={errors.youtube}
					/>
				</div>
			);
		}

    return (
      <div className='create-profile'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <h1 className='display-4 text-center'>Create Your Profile</h1>
              <p className='lead text-center'>
                                Let's get some information to make your profile stand out
                            </p>
              <small className='d-block pb-3'>* - required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  name='handle'
                  placeholder='* Profile Handle'
                  value={this.state.handle}
                  error={errors.handle}
                  onChange={this.onChangeHandle}
                  info="A unique handle for your profile URL. Your full name, company name, nickname, ect. (This CAN'T be changed later)"
                                />
                <SelectListGroup
                  value={this.state.status}
                  placeholder='Select your developer status'
                  name='status'
                  onChange={this.onChangeHandle}
                  error={errors.status}
                  options={options}
                  info='Give us an idea of where you are at in your career'
                                />
                <TextFieldGroup
                  name='company'
                  placeholder='Company'
                  value={this.state.company}
                  error={errors.company}
                  onChange={this.onChangeHandle}
                  info='Could be your own company or one you work for'
                                />

                <TextFieldGroup
                  name='website'
                  placeholder='Website'
                  value={this.state.website}
                  error={errors.website}
                  onChange={this.onChangeHandle}
                  info='Could be your own website'
                                />

                <TextFieldGroup
                  name='location'
                  placeholder='Location'
                  value={this.state.location}
                  error={errors.location}
                  onChange={this.onChangeHandle}
                  info='City or city & state suggested (eg. Boston, NA)'
                                />

                <TextFieldGroup
                  name='skills'
                  placeholder='* Skills'
                  value={this.state.skills}
                  error={errors.skills}
                  onChange={this.onChangeHandle}
                  info='Please use comma separated values (eg. HTML, CSS, Javascript, PHP)'
                                />

                <TextFieldGroup
                  name='githubusername'
                  placeholder='Github Username'
                  value={this.state.githubusername}
                  error={errors.githubusername}
                  onChange={this.onChangeHandle}
                  info='If you want your latest repos and Hithub link, include your username'
                                />

                <TextAreaFieldGroup
                  name='bio'
                  placeholder='Short Bio'
                  value={this.state.bio}
                  error={errors.bio}
                  onChange={this.onChangeHandle}
                  info='Tell us a littel about yourself?'
                                />

                <div className='mb-3'>
                  <button
                    type='button'
                    className='bnt btn-light'
                    onClick={() => {
                        this.setState(prevState => ({
                            displaySocialInputs: !prevState.displaySocialInputs
                          }))
                      }}
                                    >
                                        Add Social network Links
                                    </button>
                  <span className='text-muted'>Optional</span>
                </div>
								{socialInputs}
								<button type="submit" className="btn btn-info btn-block mt-4">Create Profile</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
})

const mapDispatchToProps = dispatch => ({
  onCreateProfile: (profileData, history) => dispatch(createProfile(profileData, history))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateProfile)
