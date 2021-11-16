import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import NavBar from '../../components/navbar/PageNavbar';

const Profile = () =>
{
	return(
		<div id="profilePage">
		  <NavBar/>
		</div>
	);
};

export default Profile;