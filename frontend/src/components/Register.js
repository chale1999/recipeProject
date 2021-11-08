import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import AppStoreLink from './AppStoreLink.js';
import logo from './imgs/sample_logo.png';
import './styling.css';

function Register()
{
	const doRegister = async event =>
	{
		event.preventDefault();        
        alert('Registered!');		
	}

	return(
	<>
		<div id="registerMessage">
			<h3 class="center"><em><strong>Ready to join the fastest growing <br/> food-based community on the internet?</strong></em></h3>
		</div>
		<div id="registerDiv">
			<div class="container">
				<img class="center" alt="Mega Bites Logo" src={logo} width="250px" height="50px"/>
				<form id="signUpForm" class="form-control" onSubmit={doRegister}>
					<input type="text" class="form-control" placeholder="First Name" required/>
					<input type="text" class="form-control" placeholder="Last Name" required/>
					<input type="text" class="form-control" placeholder="Email" required/>
					<input type="password" class="form-control" placeholder="Password" required/>
					<input type="password" class="form-control" placeholder="Confirm Password" required/>
					<input id="signUpButton" type="submit" value="Create Account" class="button" onSubmit={doRegister}/>
				</form>

			</div>
			
		</div>

		<div class="container center">
			<p>Already a member?</p><Link to="/"><em>Log in</em></Link>
		</div>

		<AppStoreLink/>
	</>
	);
};

export default Register;