import React from "react"
import { useHistory } from 'react-router';
import {Link} from 'react-router-dom';
import pfp from '../../components/imgs/person_no_pic.png';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import { useEffect, useState } from 'react';
import recipeImage from '../../components/imgs/spoon-and-fork-crossed.jpg';
import './bookmarkIcons.css';
// in this function the {posts} hold the ID passed for one post
export default function BookmarkIconRecipe({posts}) {

    const history = useHistory();
	let test; 

    console.log(posts);
	test = `/recipe/${posts}`;
	const [username,setUsername] = useState(""); 
    const [recipeName,setRecipeName] = useState("");
	//const [userPfp,setpfp] = useState("");

    const getPost = async event => {
		var token = localStorage.getItem("authToken");
		var decoded = jwt_decode(token);

		const config = {
			headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("authToken")}`,
			},
		};

		try {
			const {data} = await axios.get(`/api/posts/${posts}`,config);
            setRecipeName(data.recipeName);
			
			console.log(data);

		}catch(error) {
			console.log(error);
		}		
	};



	const goToRecipe = () =>
	{
		history.push(test);
	};
	

    useEffect(() => {
		getPost();
	}, []);
 
	
    return(
        <div id="recipeCard" onClick={goToRecipe}>
            <img id="itemImageTest" alt = "recipe pic" src={recipeImage} height='auto' width = 'auto'></img>
            <div id="recipeCardItemInfo">
                <span id="itemTitle">{recipeName}</span>
            </div>
        </div>
    )
};

