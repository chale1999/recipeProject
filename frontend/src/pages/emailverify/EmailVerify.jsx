import React from 'react';
import { useState } from "react";
import './EmailVerify.css';
import '../../components/bootstrap.min.css';
import { Link } from "react-router-dom";
import '../../components/bootstrap.min.css';
import { useHistory } from "react-router-dom";

const EmailVerify = () =>
{
	const history = useHistory();
	const [error, setError] = useState("");
  	const [success, setSuccess] = useState("");

	const goLogin = async () => {
		history.push('/');
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
					<div className="col-4"><span>Please check your inbox as we've sent you a verification email.<br/> We just need to make sure you're not a bot. 
						After all, bots don't have tastebuds! Who are they to write recipes?</span></div>
					<div className="col-3"></div>
				</div>
				<button onClick = {goLogin}>Okay</button>
			</div>
		</div>
	);
};

export default EmailVerify;