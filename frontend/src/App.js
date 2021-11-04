import React from 'react';
import { BrowserRouter as Router, Route, /*Redirect,*/ Switch } from 'react-router-dom';
import bgImg from './components/imgs/food.jpg';
//import './App.css';

import LoginPage from './pages/LoginPage';
import NewPage from './pages/NewPage';
import RegisterPage from './pages/RegisterPage';
import EmailValidationPage from './pages/EmailValidationPage';

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
            <Route path="/pages/NewPage.js" exact>
              <NewPage />
            </Route>
            <Route path="/pages/Register.js" exact>
              <RegisterPage/>
            </Route>
            <Route path="/pages/EmailValidationPage.js" exact>
              <EmailValidationPage/>
            </Route>
          </Switch>  
        </Router>
       </div>
       </div>
  );
}

export default App;
