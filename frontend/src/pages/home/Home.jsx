import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import "./Home.css";
import jwt_decode from "jwt-decode";
import PageNavbar from "../../components/navbar/PageNavbar.jsx";
import Create from '@mui/icons-material/Create';
import { useHistory } from "react-router-dom";
import pfp from '../../components/imgs/person.jpg';
import pfptwo from '../../components/imgs/cute.jpg';
import pfpthree from '../../components/imgs/person_no_pic.png';
import {Link} from 'react-router-dom';
import recipeImage from '../../components/imgs/spoon-and-fork-crossed.jpg';
import '../../components/bootstrap.min.css';
import jwt_decoder from "jwt-decode";
import SmallRecipe from "../../components/smallRecipeIcon/smallRecipeCard";
import Icons from '../../components/smallIcon/icon';

const Home = () =>
{
    const history = useHistory();
    const [error, setError] = useState("");
    const [posts, setPosts] = useState([]);
    const [following, setFollowing] = useState([]);
    var followingArray = Array();
    const data = jwt_decoder(localStorage.getItem("authToken"));
    console.log(data);

    const getFollowerData = async event => {
        //event.preventDefault();
        let token = localStorage.getItem("authToken");

        const config = {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            },
        };

        try{
            const {data} = await axios.get("api/posts/timeline/all", config);
            setPosts(data);
            console.log(data); // here are all the posts from currentUSer and followers :)

        }catch(err){
            console.log(err);
        }

    }

    const getProfile = async event =>
	{
		//event.preventDefault();
        var token = localStorage.getItem("authToken");
		var decoded = jwt_decode(token);
		const username = decoded.username;
        console.log("LOGGED IN USERNAME: " + username);
		const config = {
			headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("authToken")}`,
			},
		};

		try {
            
			const {data} = await axios.get(`/api/users/${username}`,config);
			console.log("followingArr= "+data);
            console.log("following: " + data.following);
			setFollowing(data.following);
            console.log("index 0: " + following[0].username);
            followingArray = data.following;
            console.log("following2: " + followingArray);
			//return data; // in data has all the current users data from db!

		}catch(error) {
			console.log(error);
		}
	};
    
    useEffect(() => {
        getProfile().then(
        getFollowerData());
    },[]);

    const doLogout = () => {
        localStorage.removeItem("authToken");
        history.push("/");
    }

	const toCreate = async event =>
	{
		event.preventDefault();
		history.push("/create-recipe");
	}

    return(
    <div>
        <PageNavbar/>
            <div className="homeScreen">
                <div id="left-space">
                </div>
                <div className="homeFeed">
                    <div className="feedArea">
                        {posts.map((p) => (
                            <SmallRecipe key = {p._id} posts = {p}/>
                        ))}
                    </div>
                </div>
                <div id="homeRight">
                    <div className="homefollowedUserContainer">
                            <span className="fieldLabel">Following</span>
                        <hr/>
                        <div id="followingList">
                            {following.map((p) => (
								<Icons key = {p.username} follower_name = {p}/>
							))}
                        </div>
                    </div>
                </div>
            </div>
    </div>

    );
};

export default Home;