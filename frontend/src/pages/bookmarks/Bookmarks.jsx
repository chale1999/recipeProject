import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import {
  Link
} from 'react-router-dom';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import NavBar from "../../components/navbar/PageNavbar.jsx";
import "./Bookmarks.css";
import BookmarkIconRecipe from '../../components/bookmarkIcons/bookmarkIcons';
import jwt_decode from 'jwt-decode';

const Bookmarks = () =>
{
	const history = useHistory();
	const [posts, setPosts] = useState([]);

	const getBookmarks = async event =>{
		let token = localStorage.getItem("authToken");
		var decoded = jwt_decode(token);
		const username = decoded.username;

		const config = {
			headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
			},
		};
		 try {
			const {data} = await axios.get(`/api/users/${username}`,config);
            setPosts(data.bookmarks);
            console.log(data.bookmarks);
		 } catch(error) {
			console.log(error.message);
		 }
	};

	useEffect(() => {
		getBookmarks();
	}, []);

	
	return(
	<div id="bookmarkPage">
		<NavBar/>
		<div id="container">
			<div id="bookmarks">
				<h3>My Bookmarked Recipes</h3>
				<hr/>
				{posts.map((p) => (
					<BookmarkIconRecipe posts = {p}/>
				))}
			</div>
		</div>
	</div>
	);
}

export default Bookmarks;