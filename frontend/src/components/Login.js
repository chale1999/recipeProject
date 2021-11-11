import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import './styling.css';
import AppStoreLink from './AppStoreLink.js';
import logo from './imgs/sample_logo.png';
import RegisterPage from '../pages/RegisterPage';

function Login()
{    /*
    var loginName;
    var loginPassword;
    const [message,setMessage] = useState('');
    */
    const doLogin = async event =>     
    {   
        
        event.preventDefault();
        console.log('Testing');
        /*
        var obj = {login:loginName.value,password:loginPassword.value};
        var js = JSON.stringify(obj);
        var temp = buildPath('api/login');
        try
        {     
            const response = await fetch(temp,
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());
            if( res.id <= 0 )
            {
                setMessage('User/Password combination incorrect');
            }
            else
            {
                var user = {firstName:res.firstName,lastName:res.lastName,id:res.id}
                localStorage.setItem('user_data', JSON.stringify(user));
                setMessage('');
                window.location.href = '/cards';
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }  
        */  
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
    <div id="loginAll" style={{ backgroundImage: `url(require("./imgs/food.jpg"))` }}>  
        <div id="loginDiv">  
            <div class="container">
                <img class="center" alt="Mega Bites Logo" src={logo} width="250px" height="50px"/>
                <form id="loginForm" class="form-control" onSubmit={doLogin}>
                    <input type="text" id="loginName" class="form-control" placeholder="Username" required/><br/>
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
            <p id = "signUpText">Not a MegaBiter?</p><Link to="/register"><em>Sign Up</em></Link>
        </div>
        <br/>
        <div id="createAccount">

        </div>

        <AppStoreLink/>
    </div>
    );
};

export default Login;