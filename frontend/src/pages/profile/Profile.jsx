import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import NavBar from '../../components/navbar/PageNavbar';
import './Profile.css';

const Profile = () =>
{
	return(
		<>
		  <NavBar/>
		  <div class="profile">
			<div class="profileTop">
			cover photo and pfp
			</div>
			<div class="break">
			</div>
			<div class="tabs">
			tabs like followers, my recipes, etc
			</div>
	      </div>
		</>
	);
};

export default Profile;