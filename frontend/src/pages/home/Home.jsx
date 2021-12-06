import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import "./HomeStyle.css";
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

const Home = () =>
{
    const history = useHistory();
    const [error, setError] = useState("");
    const [posts, setPosts] = useState([]);
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

    useEffect(() => {
        getFollowerData();
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
                <div className="homeFeed">
                    <form className="newRecipeButton" onClick={toCreate}>
                        <Create/>
                        <br/>
                        <span id="buttonText">Create a new recipe!</span>
                    </form>
                    <div className="feedArea">
                        {posts.map((p) => (
                            <SmallRecipe key = {p._id} posts = {p}/>
                        ))}
                    </div>
                </div> 
                <div className="homefollowedUserContainer">
                        <span className="fieldLabel">This is where followed users go.</span>
                    <hr/>
                    <div className="followedUser">
                        <Link to="/profile"><img src={pfp} alt="Your profile pic" id="profilePicture"/></Link>
                        <span>Sample Name</span>
                    </div>
                    <br/>
                    <div className="followedUser">
                        <Link to="/profile"><img src={pfptwo} alt="Your profile pic" id="profilePicture"/></Link>
                        <span>Sample Name</span>
                    </div>
                    <br/>
                    <div className="followedUser">
                        <Link to="/profile"><img src={pfpthree} alt="Your profile pic" id="profilePicture"/></Link>
                        <span>Sample Name</span>
                    </div>
                    <br/>
                    <div className="followedUser">
                        <Link to="/profile"><img src={pfp} alt="Your profile pic" id="profilePicture"/></Link>
                        <span>Sample Name</span>
                    </div>
                </div>
            </div>
    </div>

    );
};

export default Home;