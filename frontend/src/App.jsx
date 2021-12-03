import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, /*Redirect,*/ Switch } from 'react-router-dom';
import bgImg from './components/imgs/food-white.jpg';
//import './App.css';

import Login from './pages/login/Login.jsx';
import Register from './pages/register/Register.jsx';
import ForgotPassword from './pages/forgotpassword/ForgotPassword';
import ResetPasswordScreen from './pages/forgotpassword/ResetPassword'; 
import EmailVerify from './pages/emailverify/EmailVerify.jsx';
import Profile from './pages/profile/Profile.jsx';
import Home from './pages/home/Home.jsx';
import Bookmarks from './pages/bookmarks/Bookmarks.jsx';
import CreateRecipe from './pages/createrecipe/CreateRecipe.jsx';
import EditProfile from './pages/editprofile/EditProfile.jsx';
import OwnProfile from './pages/profile/OwnProfile.jsx';
import Results from './pages/searchresults/Results.jsx';
import Recipe from './pages/viewrecipe/ViewRecipe.jsx';
import EditRecipe from './pages/editrecipe/EditRecipe.jsx';
import VerifyDone from './pages/emailverify/VerifyDone.jsx';
import ViewRecipe from './pages/viewrecipe/ViewRecipe.jsx';

function App() {
  return (
    <div id="background" style={{  
      backgroundImage: `url(${bgImg})`, // commented out for now due to errors I was getting
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
            <Route path="/forgotpassword" exact>
              <ForgotPassword/>
            </Route>
            <Route path="/passwordreset/:resetToken" exact>
              <ResetPasswordScreen/>
            </Route>
            <Route path="/verifyemail" exact>
              <EmailVerify/>
            </Route>
            <Route path="/profile/:username" exact>
              <Profile/>
            </Route>
            <Route path="/home" exact>
              <Home/>
            </Route>
            <Route path="/bookmarks" exact>
              <Bookmarks/>
            </Route>
            <Route path="/create-recipe" exact>
              <CreateRecipe/>
            </Route>
            <Route path="/edit-profile" exact>
              <EditProfile/>
            </Route>
            <Route path="/current-user" exact>
              <OwnProfile/>
            </Route>
            <Route path="/search/results" exact>
              <Results/>
            </Route>
            <Route path="/recipe/:id" exact>
              <Recipe/>
            </Route>
            <Route path="/edit-recipe" exact>
              <EditRecipe/>
            </Route>
            <Route path="/view-recipe" exact>
              <ViewRecipe/>
            </Route>
            <Route path="/verifydone/:verifyToken" exact>
              <VerifyDone/>
            </Route>
          </Switch>  
        </Router>
       </div>
    </div>
  );
}


export default App;
