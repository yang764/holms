import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Input from '../../components/uielements/input';
import Checkbox from '../../components/uielements/checkbox';
import Button from '../../components/uielements/button';
import authAction from '../../redux/auth/actions';
import Auth0 from '../../helpers/auth0/index';
import Firebase from '../../helpers/firebase';
import FirebaseLogin from '../../components/firebase';
import IntlMessages from '../../components/utility/intlMessages';
import SignUpStyleWrapper from './signup.style';
import FormValidation from './activateForm';
import LayoutWrapper from '../../components/utility/layoutWrapper';
import Box from '../../components/utility/box';
import { notification } from '../../components/index';
import Dropzone from  "./dropzone/index";

const { login } = authAction;

class Activate extends React.Component {
	state = {
		email: '',
		facebook: '',
		twitter: '',
		linkedIn: '',
		googlePlus: '',
		title: '',
		firstName: '',
		middleName: '',
		lastName: '',
		description: '',
		pass1: '',
		pass2: '',
		imgSrc: '',
		redirectToReferrer: false,
	};

	componentWillReceiveProps(nextProps) {
		if (
			this.props.isLoggedIn !== nextProps.isLoggedIn &&
			nextProps.isLoggedIn === true
		) {
			this.setState({redirectToReferrer: true});
		}
	}
	componentWillMount() {
		const {id} = this.props.match.params;

		const data = JSON.parse(localStorage.getItem('user_profile'));
		if(data) {
			if (data.activated) {
				if (this.props.isLoggedIn) {
					this.props.history.push('/dashboard');
				}
				else {
					this.props.history.push('/signin');
				}
			}
		}
		else {
			this.props.history.push('/signin');
		}
		console.log(data);
		this.setState({email: `${data.id}@life.hkbu.edu.hk`})
	}
	handleUpdate = () => {
		if(this.state.pass1 !== this.state.pass2) {
			notification('error', "Passwords don't match!");
			return;
		}
		else {
			let user = Firebase.auth().currentUser;
			const {id} = this.props.match.params;
			const data = JSON.parse(localStorage.getItem('user_profile'));
			const { email, facebook, twitter, linkedIn, googlePlus, title, firstName, middleName, lastName, description, imgSrc} = this.state;
			const self = this;
			if(firstName !== '' || lastName !== '' || title !== '' || description !== '') {
				user.updatePassword(this.state.pass2).then(function () {

					const info = {
						email,
						facebook,
						twitter,
						linkedIn,
						googlePlus,
						title,
						firstName,
						middleName,
						lastName,
						description,
						courseList: [],
						notifications: [],
						notes: [],
						activated: true,
						imgSrc,
						uID: id
					}
					Firebase.firestore.collection("users").doc(id).update(info)
						.then(function () {
							//console.log("Document written with ID: ", docRef);

							user.updateEmail(email);

							Firebase.auth().signOut().then(function() {
								self.props.history.push('/signin');
							}, function(error) {
								console.error('Sign Out Error', error);
							});
						})
						.catch(function (error) {
							console.error("Error adding document: ", error);
						});
				}).catch(function (error) {
					// An error happened.
				});
			}
			else {
				notification('error', "one or more required fields are empty");
			}

		}
	};

	setImageSrc(url) {
		this.setState({imgSrc: url});
	}
	render() {
		return (
				<SignUpStyleWrapper className="isoSignUpPage">
					<div className="isoSignUpContentWrapper">
						<div className="isoSignUpContent">
							<div className="isoLogoWrapper">
								<Link to="/signin">
									<IntlMessages id="page.activateAccount" />
								</Link>
							</div>

							<div className="isoSignUpForm">
								<div className="isoInputWrapper">
									<Input size="large" placeholder="Title e.g: Mr./Mrs./Dr." onChange={event => {
										this.setState({ title: event.target.value });
									}}/>
								</div>
								<div className="isoInputWrapper isoLeftRightComponent">
									<Input size="large" placeholder="First name" onChange={event => {
										this.setState({ firstName: event.target.value });
									}}/>
									<Input size="large" placeholder="Middle name" onChange={event => {
										this.setState({ middleName: event.target.value });
									}}/>
									<Input size="large" placeholder="Last name" onChange={event => {
										this.setState({ lastName: event.target.value });
									}}/>
								</div>

								<div className="isoInputWrapper">
									<Input value={this.state.email} size="large" placeholder="Email" onChange={event => {
										this.setState({ email: event.target.value });
									}}/>
								</div>

								<div className="isoInputWrapper">
									<Input size="large" placeholder="Description" onChange={event => {
										this.setState({ description: event.target.value });
									}}/>
								</div>

								<div className="isoInputWrapper">
									<Input size="large" placeholder="Facebook (Optional)" onChange={event => {
										this.setState({ facebook: event.target.value });
									}}/>
								</div>

								<div className="isoInputWrapper">
									<Input size="large" placeholder="Twitter (Optional)" onChange={event => {
										this.setState({ twitter: event.target.value });
									}}/>
								</div>

								<div className="isoInputWrapper">
									<Input size="large" placeholder="LinkedIn (Optional)" onChange={event => {
										this.setState({ linkedIn: event.target.value });
									}}/>
								</div>

								<div className="isoInputWrapper">
									<Input size="large" placeholder="Google Plus (Optional)" onChange={event => {
										this.setState({ googlePlus: event.target.value });
									}}/>
								</div>

								<div className="isoInputWrapper">
									<Input size="large" type="password" placeholder="New Password" onChange={event => {
										this.setState({ pass1: event.target.value });
									}}/>
								</div>

								<div className="isoInputWrapper">
									<Input
										size="large"
										type="password"
										placeholder="Confirm Password"
										onChange={event => {
											this.setState({ pass2: event.target.value });
										}}
									/>
								</div>

								<Dropzone firebase={Firebase} callback={this.setImageSrc.bind(this)}/>
								<br />
								<div className="isoInputWrapper" style={{ marginBottom: '50px' }}>
									<Checkbox>
										<IntlMessages id="page.signUpTermsConditions" />
									</Checkbox>
								</div>

								<div className="isoInputWrapper">
									<Button type="primary" onClick={this.handleUpdate.bind(this)}>
										<IntlMessages id="page.activate" />
									</Button>
								</div>
								<div className="isoInputWrapper isoCenterComponent isoHelperWrapper">
									<Link to="/signin">
										<IntlMessages id="page.signUpAlreadyAccount" />
									</Link>
								</div>
							</div>
						</div>
					</div>
				</SignUpStyleWrapper>
		);
	}
}

export default connect(
	state => ({
		isLoggedIn: state.Auth.get('idToken') !== null ? true : false,
	}),
	{ login }
)(Activate);

