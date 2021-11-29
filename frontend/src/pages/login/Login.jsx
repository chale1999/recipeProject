import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import {
  Link
} from 'react-router-dom';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import './Login.css';
import AppStoreLink from '../../components/AppStoreLink.jsx';
import logo from '../../components/imgs/MegaBitesLogo_transparent-large.png';

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
    <div id="loginAll" style={{ backgroundImage: `url(require("./imgs/food.jpg"))`}}>  
        <div id="loginDiv">  
            <div className="container">
                <img className="center" alt="Mega Bites Logo" src={logo} style={{width: `20vw`}}/>
                <form id="loginForm" className="form-control" onSubmit={doLogin}>
                {error && <span className="error-msg">{error}</span>}
                    <input type="text" id="email" className="form-control" placeholder="Enter Email" required value={email} onChange={(e) => setEmail(e.target.value)}/><br/>
                    <input type="password" id="password" className="form-control" placeholder="Enter Password" required value={password} onChange={(e) => setPassword(e.target.value)}/><br/> 
                    <input type="submit" id="loginButton" className="button" value = "Login"/>
                </form> 

                <div className="center" id="forgot">
                    <a href="/forgotpassword">Forgot password?</a>
                </div>
            </div>           
        </div>
        <br/>
        <div id="signUp">
            <p id="signUpText">Not a MegaBiter?&nbsp;<Link to="/register" id="signUpLink"><em><strong>Sign Up</strong></em></Link></p>
        </div>
        <br/>
        <div id="createAccount">

        </div>

        <AppStoreLink/>
    </div>
    );
};

export default Login;
