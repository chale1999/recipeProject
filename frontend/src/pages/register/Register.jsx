import React from 'react';
import { Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import {
  Link
} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import AppStoreLink from '../../components/AppStoreLink.jsx';
import logo from '../../components/imgs/sample_logo.png';
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

			history.push("/home"); // todo actually get it to redirect to home page. Login is successful 

		}catch(error) {
			setError("Error has occured");
		}

	}
	return(
	<>
		<div id="registerMessage">
			<h3 className="center"><em><strong>Ready to join the fastest growing <br/> food-based community on the internet?</strong></em></h3>
		</div>
		<div id="registerDiv">
			<div className="container">
				<img className="center" alt="Mega Bites Logo" src={logo} width="250px" height="50px"/>
				<form id="signUpForm" className="form-control" onSubmit={doRegister}>
					{error && <span className="error-msg">{error}</span>}
					<input type="text" className="form-control" placeholder="First Name" required id="fname" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
					<input type="text" className="form-control" placeholder="Last Name" required id="lname" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
					<input type="text" className="form-control" placeholder="Enter username" required id="name" value={username} onChange={(e) => setUsername(e.target.value)}/>
					<input type="email" className="form-control" placeholder="Enter Email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
					<input type="password" className="form-control" placeholder="Enter Password" id="password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
					<input type="password" className="form-control" placeholder="Confirm Password" id="confirmPassword" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
					<button type="submit" className="btn btn-primary">
          				Create Account
        			</button>
				</form>

			</div>
			
		</div>

		<div className="container center">
			<p>Already a member?</p><Link to="/"><em>Log in</em></Link>
		</div>

		<AppStoreLink/>
	</>
	);
};

export default Register;