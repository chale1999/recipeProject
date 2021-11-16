import React from 'react';
import { BrowserRouter as Router, Route, /*Redirect,*/ Switch } from 'react-router-dom';
import bgImg from './components/imgs/food.jpg';
//import './App.css';

import Login from './pages/login/Login';
import Register from './pages/register/Register';
import EmailVerify from './pages/emailverify/EmailVerify';
import Profile from './pages/profile/Profile';
import Home from './pages/home/Home';
import Bookmarks from './pages/bookmarks/Bookmarks';

function App() {
  return (
    <div id="background" style={{  
      backgroundImage: `url(${bgImg})`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      height: '100vh'
       }}>
      <div id="appDiv">
        <Router>
          <Switch>
            <Route path="/" exact>
              <Login />
            </Route>
            <Route path="/register" exact>
              <Register/>
            </Route>
            <Route path="/verify-email" exact>
              <EmailVerify/>
            </Route>
            <Route path="/profile" exact>
              <Profile/>
            </Route>
            <Route path="/home" exact>
              <Home/>
            </Route>
            <Route path="/bookmarks">
              <Bookmarks/>
            </Route>
          </Switch>  
        </Router>
       </div>
       </div>
  );
}

export default App;
