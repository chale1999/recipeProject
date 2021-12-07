import React from 'react';
import { useState,  useEffect  } from "react";
import './VerifyDone.css';
import '../../components/bootstrap.min.css';
import { Link } from "react-router-dom";
import { useHistory} from "react-router-dom";
import { useParams } from 'react-router';
import axios from 'axios';
import foodBGImg from '../../components/imgs/food-white.jpg';


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

	useEffect(() => {
		verifyEmailHandler();
    },[]);

    return(
        <div id="verifyDonePage" style={{backgroundImage:`url(${foodBGImg})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', height: '100vh'}}>
			<div id="noRedirectMessageContainer">
				<div id="noRedirectMessageContent">
					<span style={{marginBottom:'20px'}}>If you aren't redirected automatically, click the button below to return to login.</span>
					<button id="toLogin" onClick={verifyEmailHandler}>Login</button>
				</div>
			</div>
			            {error && <span className="error-message">{error} </span>}
			{success &&
				(
					<div>
						<span className="success-message"></span>
						<Link to="/">Login</Link>
					</div>
				)
			}
        </div>


    );
}

export default VerifyDone;