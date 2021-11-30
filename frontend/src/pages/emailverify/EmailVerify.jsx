import React from 'react';
import { useState } from "react";
import './EmailVerify.css';
import '../../components/bootstrap.min.css';
import { Link } from "react-router-dom";
import axios from "axios";
import '../../components/bootstrap.min.css';
import { useHistory } from "react-router-dom";

const EmailVerify = ({match}) =>
{
	const [error, setError] = useState("");
  	const [success, setSuccess] = useState("");

	const verifyEmailHandler = async () => {
	
		const config = {
		  header: {
			"Content-Type": "application/json",
			"Authentication":`Bearer${localStorage.getItem('authToken')}`
		  },
		};
	
		try {
		  const { data } = await axios.put(
			`/api/auth/emailverify/${match.params.verifyToken}`,
			config
		  );
	
		  //console.log(data);
		  setSuccess(data.data);
		} catch (error) {
		  setError(error);
		}
	  };
	return(
		<div>
			<div className="container">
				{error && <span className="error-message">{error} </span>}
				{success && (
				<span className="success-message">
				<Link to="/">Login</Link>
				</span>
				)}
				<div className="row">
					<div className="col"><h2>Welcome to the tasiest place online!</h2></div>
				</div>
				<div className="row">
				</div>
				<div className="row">
					<div className="col-3"></div>
					<div className="col-4"><p>Please check your inbox as we've sent you a verification email.<br/> Sorry, we know this can be annoying,
					we just need to make sure you're not a bot. After all, bots don't have tastebuds so who are they to write recipes!</p></div>
					<div className="col-3"></div>
				</div>
				<button onClick = {verifyEmailHandler}>Okay</button>
			</div>
		</div>
	);
};

export default EmailVerify;