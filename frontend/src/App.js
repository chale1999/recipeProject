import React from 'react';
import { BrowserRouter as Router, Route, /*Redirect,*/ Switch } from 'react-router-dom';
//import './App.css';

import LoginPage from './pages/LoginPage';
import NewPage from './pages/NewPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
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
          </Switch>  
        </Router>
       </div>
  );
}

export default App;
