import React from 'react';
import { Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import {Link} from 'react-router-dom';
import foodBGImg from '../../components/imgs/food-white.jpg';
import { useHistory } from "react-router-dom";
import AppStoreLink from '../../components/AppStoreLink/AppStoreLink.jsx';
import logo from '../../components/imgs/MegaBitesLogo_transparent-large.png';
import './Register.css';

const Register = () =>
{
	const history = useHistory();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");

	const doRegister = async event =>
	{
		event.preventDefault();
		const config = {
			header: {
				"Content-Type": "application/json"
			}
		}
		// check if the passwords are the same, if not return error
		if(password !== confirmPassword) {
			setPassword("");
			setConfirmPassword("");
			return setError("Passwords do not match."); 
		}

		// passwords are the same so go to the correct routing
		try {
			const {data} = await axios.post("/api/auth/register", {firstName, lastName, username, email, password},
			config);

			localStorage.setItem("authToken", data.token);

			history.push("/verifyemail"); // todo actually get it to redirect to home page. Login is successful 

		}catch(error) {
			setError("Error has occured");
		}

	}
	return(
	<div id="registerAll" style={{backgroundImage:`url(${foodBGImg})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', height: '100vh'}}>
		<div id="registerContent">
			<div id="registerMessage">
				<h3 className="center"><em><strong>Ready to join the fastest growing <br/> food-based community on the internet?</strong></em></h3>
			</div>
			<div id="registerDiv">
				<div className="container">
					<img className="center" alt="Mega Bites Logo" src={logo} width="175px" style={{marginTop:'20px'}}/>
					<form id="signUpForm" className="form-control" onSubmit={doRegister}>
						{error && <span className="error-msg">{error}</span>}
						<input type="text" className="form-control" placeholder="First Name" required id="fname" value={firstName} onChange={(e) => setFirstName(e.target.value)} autocomplete="off"/>
						<input type="text" className="form-control" placeholder="Last Name" required id="lname" value={lastName} onChange={(e) => setLastName(e.target.value)} autocomplete="off"/>
						<input type="text" className="form-control" placeholder="Username" required id="name" value={username} onChange={(e) => setUsername(e.target.value)} autocomplete="off"/>
						<input type="email" className="form-control" placeholder="Email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)} autocomplete="off"/>
						<input type="password" className="form-control" placeholder="Password" id="password" required value={password} onChange={(e) => setPassword(e.target.value)} autocomplete="off"/>
						<input type="password" className="form-control" placeholder="Confirm Password" id="confirmPassword" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} autocomplete="off"/>
						<button id="createAccount" type="submit">Create Account</button>
					</form>
				</div>
			</div>
			<div id="toLogIn">
				<span id="linkToLogin"><strong>Already a member?&nbsp;<Link to="/"><em>Log in</em></Link></strong></span>
			</div>
			<AppStoreLink/>
		</div>
	</div>
	);
};

export default Register;