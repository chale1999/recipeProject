import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import {Link} from 'react-router-dom';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import './Login.css';
import AppStoreLink from '../../components/AppStoreLink/AppStoreLink.jsx';
import logo from '../../components/imgs/MegaBitesLogo_transparent-large.png';
import foodBGImg from '../../components/imgs/food-white.jpg';

const Login = () =>
{    
    const history = useHistory();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");

    // was supposed to say if the person has a token dont need to log in again
    
    const doLogin = async event =>     
    {   
        event.preventDefault();

        const config = {
			header: {
				"Content-Type": "application/json",
			},
		}

		try {
			const {data} = await axios.post("/api/auth/login", {email, password},
			config);

		    localStorage.setItem("authToken", data.token);
            history.push('/home');

			
		}catch(error) {
			setError("Error occured");
		}

        
    };   

    /*
    const app_name = 'sheltered-wildwood-67909'
    function buildPath(route)
    {
        if (process.env.NODE_ENV === 'production') 
        {
            return 'https://' + app_name +  '.herokuapp.com/' + route;
        }
        else
        {        
            return 'http://localhost:5000/' + route;
        }
    }
    */
    return(
    <div id="loginAll" style={{backgroundImage:`url(${foodBGImg})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', height: '100vh'}}>
		<div id="loginContent">
			
			<div id="loginDiv">
				<div className="container">
					<img className="center" alt="Mega Bites Logo" src={logo} width="175px" style={{marginTop:'20px'}}/>
					<form id="loginForm" className="form-control" onSubmit={doLogin}>
						{error && <span className="error-msg">{error}</span>}
						<input type="email" className="form-control" placeholder="Email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)} autocomplete="off"/>
						<input type="password" className="form-control" placeholder="Password" id="password" required value={password} onChange={(e) => setPassword(e.target.value)} autocomplete="off"/>
						<button id="loginButton" type="submit">Login</button>
					</form>
					<span id="forgot"><Link to="/forgotpassword">Forgot Password?</Link></span>
				</div>
			</div>
			<div id="toSignUp">
				<span id="linkToSignUp"><strong>Not a MegaBiter?&nbsp;<Link to="/register"><em>Sign Up</em></Link></strong></span>
			</div>
			<AppStoreLink/>
		</div>
	</div>
    );
};

export default Login;
