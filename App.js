import React from 'react';
import { BrowserRouter as Router, Route, /*Redirect,*/ Switch } from 'react-router-dom';
import './App.css';

import LoginPage from './pages/LoginPage';
import NewPage from './pages/NewPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <LoginPage />
        </Route>
        <Route path="/pages/NewPage.js" exact>
          <NewPage />
        </Route>
      </Switch>  
    </Router>
  );
}

export default App;
