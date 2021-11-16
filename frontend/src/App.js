import React from 'react';
import { BrowserRouter as Router, Route, /*Redirect,*/ Switch } from 'react-router-dom';
import bgImg from './components/imgs/food.jpg';
//import './App.css';

import LoginPage from './pages/LoginPage';
import NewPage from './pages/NewPage';
import RegisterPage from './pages/RegisterPage';
import EmailValidationPage from './pages/EmailValidationPage';
import Profile from './pages/ProfilePage';
import Home from './components/home/Home'

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
              <LoginPage />
            </Route>
            <Route path="/NewPage" exact>
              <NewPage />
            </Route>
            <Route path="/register" exact>
              <RegisterPage/>
            </Route>
            <Route path="/EmailValidationPage" exact>
              <EmailValidationPage/>
            </Route>
            <Route path="/profile" exact>
              <Profile/>
            </Route>
            <Route path="/home" exact>
              <Home/>
            </Route>
          </Switch>  
        </Router>
       </div>
       </div>
  );
}

export default App;
