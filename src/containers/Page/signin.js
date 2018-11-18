import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Input from '../../components/uielements/input';
import Checkbox from '../../components/uielements/checkbox';
import Button from '../../components/uielements/button';
import authAction from '../../redux/auth/actions';
import Auth0 from '../../helpers/auth0';
import Firebase from '../../helpers/firebase';
import IntlMessages from '../../components/utility/intlMessages';
import SignInStyleWrapper from './signin.style';
import { notification } from '../../components/index';
import { firebaseAuth } from '../../helpers/firebase';
//import * as serviceAccount from './serviceAccountKey.json';
import { Modal } from 'antd';

const { login } = authAction;

class SignIn extends Component {
  state = {
    username: '',
    password: '',
    redirectToReferrer: false,
  };

  // componentDidMount() {
  //   admin.initializeApp({
  //     credential: admin.credential.cert({
  //       projectId: "ealas-kg",
  //       clientEmail: "ealas-kg@appspot.gserviceaccount.com",
  //       privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCkb1rGTDmj+zlI\n1O/nTm9ks2wRW8L/P8SWRmnfzmC3DGHcYT2lmXsEzI3OcYjgzUhHtjdXikVyo1kM\n6dv9+fGexkc+nddIG4ns0Pjl/qhssMs6Kmjl95h7EGh6AeczX5tAuIRWCWrikbK4\nWrQj/aSd8JoadDLIy0t5Rq3oHkOj5kAw48rTuI0omX7temFFKcT0QJgYQ5yigOo2\niVCl8P2iDxaPMUj3tPNiiz9K/DVRe6hsg34fYa/BGYaQWg4+q6nEsGQlOiCvB01p\nNgDpJBDUtyP7racws2ZtXOes2mStbTADT26oTiDkcpywQZh5xkUvl5TumvlNMRX1\npbjqYy+LAgMBAAECggEAS8803ABPgLz1i5D0a8EbFSOtOpGCJJi7Iwcij7a/mxS/\n11ETkVHhx/QgmqF4WB/8Z2doO1k5rGEH0K7OqFh/31INjZ5KnulnXMF5RtvxvW6C\nu3XK997/Mxl8+WcANwyocJ3BEUN1PjCq41iZ/Y/WQaSn/3M76JvlV2vRCJdPWvOy\ncxKRXgqX51y/xi/LENNtYC2Hd6NFlY3yWfGPqvp/P9QJA7yvfvTwH0C1pYVkdKF3\nrtmxUJ8+Gw5g5xQbRMAd4/VXnCoaewSHagos1MsScNrzeSevP4e/qKPFODbN167c\n3LiYSA4JIx9Oz3uZMa8A3hdYLAhf3j2hIpTJGTRA+QKBgQDaB47g3O60UerEBlzO\n4WiQNjuX4dFdPGoVdrevKM4gniNlokT3Ugm+LQPYUMRQWBG969wtv9QLj9R0LObQ\nRsY0/+EaZxF/KId1PJ3HweUHychQH6RzOa/N07LAsX1AzYUonr59ohmB7Kv3JxWx\n/WWiSTEBvFTvFZVSbqFgnbI62QKBgQDBEmISlwaHg2TieJnAJ3vdAYoqde0ltOXy\nw9PE7P8OOOk9VWliHfG+K2aywo98Z0JnqMxsV+f4waiK1DscgrpCxlDeqOyXgEfC\ndlHMf72f70DbpSO/usgBcFXNj4J80DAK68iAZh5g3HtAnUlc4s2MhLdtoRWHrkch\naHCBrjsXAwKBgQCaKiX5Eb8neZTKrsUI85GABxj0OBRWHNXV/2+6RtwZbDgTMT4a\nssN42VOSrOli9iL1a8TwBGfnFPhgfS9nreOQri15Ac/5XasKVqYqDQvpCeC95uHd\nJ7kLjNkkL1wlaizxn+2J4AixOawOwnAwvsASlDY2x/g2ZciD1P3+1wKjYQKBgCu9\nPWiWvEzw8Gb6CWLlzwLHeYSbCKmVLM7tnEkto66WKAjUE7a9r+l0LaTrvNPjFMEl\nFYKp+4x4WvVwlR+lYgsEoIeA33CHCDq+0VMx0UStUBUyeUHTT8I7r8SM8XPTOj8P\nIXItME6jRGzj9R3M5+Igoul8J8OAMO8ZmPtX/Fz/AoGATxt1zbCCZRRtHOxSVmre\nWc0KWVma4Ulpa8a7ASRTgI6vIUkEEj/E9ov3kvCJ9ec/HRexZO2kIRG808ux5Ej5\ntFmyqodPBTZDMfetAjMfStW/wy4biMqcySvDWLMVKyzKvgw0mkoonqxIcXwk9dWR\nVqx/HmpV6SD35AJT/Lty0N8=\n-----END PRIVATE KEY-----\n"
  //     }),
  //     databaseURL: "https://ealas-kg.firebaseio.com/"
  //   });
  // }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.isLoggedIn !== nextProps.isLoggedIn &&
      nextProps.isLoggedIn === true
    ) {
      this.setState({ redirectToReferrer: true });
    }
  }

  handleLogin() {
    const { email, password } = this.state;
    const { login } = this.props;
    if (!(email && password)) {
      notification('error', 'Please fill in email. and password');
      return;
    }
    this.setState({
      confirmLoading: true
    });
    
    
    let isError = false;
    const self = this;
    login(Firebase.EMAIL, email, password, notification, this);

  }

  setMyState(inState) {
    this.setState(inState);
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleLogin();
    }
  }

  render() {
    const from = { pathname: '/dashboard' };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
    return (
      <SignInStyleWrapper className="isoSignInPage">
        <div className="isoLoginContentWrapper">
          <div className="isoLoginContent">
            <div className="isoLogoWrapper">
              <Link to="/">
                <IntlMessages id="page.signInTitle" />
              </Link>
            </div>

            <div className="isoSignInForm">
            <div className="isoInputWrapper">
              <Input value={this.state.email} size="large" placeholder="email" onChange={event => {
                  this.setState({ email: event.target.value });
                }}/>
            </div>

            <div className="isoInputWrapper">
              <Input value={this.state.password} size="large" onKeyPress={this.handleKeyPress.bind(this)} type="password" placeholder="password" onChange={event => {
                  this.setState({ password: event.target.value });
                }}/>
            </div>

            <div className="isoInputWrapper isoLeftRightComponent">
              <Checkbox>
                <IntlMessages id="page.signInRememberMe" />
              </Checkbox>
              <Button type="primary" onClick={this.handleLogin.bind(this)}>
                <IntlMessages id="page.signInButton" />
              </Button>
            </div>

            <p className="isoHelperText">
              <IntlMessages id="page.signInPreview" />
            </p>

            <div className="isoCenterComponent isoHelperWrapper">
              <Link to="/forgotpassword" className="isoForgotPass">
                <IntlMessages id="page.signInForgotPass" />
              </Link>
             {/*  <a onClick={() => {this.info()}}>
                <IntlMessages id="page.ealasAccountInfo" />
              </a> */}
            </div>
          </div>
          </div>
        </div>
      </SignInStyleWrapper>
    );
  }

	info() {
		Modal.info({
			title: 'EALAS Account activation',
			content: (
				<div>
					<p>If you are HKBU staff or a student your account will created by the administrator and the initial
						login details will be sent to your official email address.</p>
				</div>
			),
			onOk() {},
		});
	}
}




function mapStateToProps(state) {
  return {
    isLoggedIn: state.Auth.get('idToken') !== null ? true : false
  }
}


export default connect(mapStateToProps, { login })(SignIn);

/*
  user.updateEmail("16227018@life.hkbu.edu.hk").then(function() {
                console.log("EMAIL UPDATED");
              }).catch(function(error) {
                // An error happened.
              });
  user.updateProfile({
                displayName: "Karan Grover",
                photoURL: "https://image.ibb.co/gtHLHG/IMG_1793.jpg"
              }).then(function() {
                console.log("PROFILE UDPATED")
              }).catch(function(error) {
                // An error happened.
              });
*/
