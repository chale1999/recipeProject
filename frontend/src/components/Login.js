import React from 'react';
import './styling.css';
import AppStoreLink from './AppStoreLink.js';
import logo from './imgs/sample_logo.png';
function Login()
{    
    
    const doLogin = async event =>     
    {        
        event.preventDefault();        
        alert('doIt()');    
    };
 
    
    return(
    <div id="loginAll">  
        <div id="loginDiv">  
            <div class="container">
                <img class="center" alt="Mega Bites Logo" src={logo} width="250px" height="50px"/>
                <form id="loginForm" class="form-control" onSubmit={doLogin}>
                    <label>Username</label>
                    <input type="text" id="loginName" class="form-control" placeholder="Username" required/><br/>
                    <label>Password</label>
                    <input type="password" id="loginPassword" class="form-control" placeholder="Password" required/><br/> 
                    <input type="submit" id="loginButton" class="button" value = "Login" onClick={doLogin}/>
                </form> 

                <div class="center" id="forgot">
                    <a href="/">Forgot username or password?</a>
                </div>
            </div>           
        </div>
        <br/>
        <div class="center" id="signUp">
            <p id = "signUpText">Not a MegaBiter? <a href = "/"><em>Sign up</em></a></p>
        </div>
        <br/>
        <div id="createAccount">

        </div>

        <AppStoreLink/>
    </div>
    );
};

export default Login;