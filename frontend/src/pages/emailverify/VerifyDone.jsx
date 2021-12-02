import React from 'react';
import { useState } from "react";
import './EmailVerify.css';
import '../../components/bootstrap.min.css';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router';
import axios from 'axios';


function VerifyDone(){
    const history = useHistory();
    const {verifyToken} = useParams();
	console.log(verifyToken);
	const [error, setError] = useState("");
  	const [success, setSuccess] = useState("");



    const toLogin = () =>{ 
        let path = '/';
        history.push(path);
    };

    const verifyEmailHandler = async () => {
	
		const config = {
		  header: {
			"Content-Type": "application/json",
			"Authentication":`Bearer${localStorage.getItem('authToken')}`
		  },
		};
	
		try {
		  const { data } = await axios.put(
			`/api/auth/verifydone/${verifyToken}`,
			config
		  );
	
		  //console.log(data);
		  setSuccess(data.data);
		  history.push('/');
		} catch (error) {
		  setError(error);
		}
	};

    return(
        <div>
            <h3> Verification Complete. Click the link below to go to the home page.</h3>
            <button onClick={verifyEmailHandler}>Test Token</button>
            {error && <span className="error-message">{error} </span>}
				{success && (
				<span className="success-message">
				<Link to="/">Login</Link>
				</span>
				)}
        </div>
    );
}

export default VerifyDone;