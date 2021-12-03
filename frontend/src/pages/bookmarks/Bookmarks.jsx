import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import {
  Link
} from 'react-router-dom';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import NavBar from "../../components/navbar/PageNavbar.jsx";
import "./Bookmarks.css";

const Bookmarks = () =>
{
	
	return(
	<div id="bookmarkPage">
		<NavBar/>
		<div id="main">
			<h3>My Bookmarked Recipes</h3>
		</div>
	</div>
	);
}

export default Bookmarks;