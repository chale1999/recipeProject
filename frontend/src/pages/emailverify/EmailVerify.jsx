import React from 'react';
import { useState } from "react";
import "./EmailVerify.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import logo from '../../components/imgs/MegaBitesLogo_transparent-large.png';

const EmailVerify = () =>
{
	const history = useHistory();
	const [error, setError] = useState("");
  	const [success, setSuccess] = useState("");

	const goLogin = async () => {
		history.push('/');
	};

	return(
		<div id="emailVerify">
				{error && <span className="error-message">{error} </span>}
				{success && (
				<span className="success-message">
				<Link to="/">Login</Link>
				</span>
				)}
			<div id="content">
				<div id="message">
					<img alt="Mega Bites Logo" src={logo} style={{width: '175px', marginBottom: '5%', padding:'10px', borderRadius: '20px'}}/>
					<h2 style={{marginBottom: '5%'}}>Welcome to the tasiest place online!</h2>
					<p>Please check your inbox as we've sent you a verification email. We just need to make sure you're not a bot. After all, bots don't have tastebuds! Who are they to write recipes? (Don't tell them I said that!)</p>
				</div>
			</div>
		</div>
	);
};

export default EmailVerify;