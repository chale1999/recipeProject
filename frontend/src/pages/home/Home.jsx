import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import "./HomeStyle.css";
import PageNavbar from "../../components/navbar/PageNavbar.jsx";
import Create from '@mui/icons-material/Create';
import { useHistory } from "react-router-dom";
import pfp from '../../components/imgs/person.jpg';
import {Link} from 'react-router-dom';
import recipeImage from '../../components/imgs/food.jpg';
import '../../components/bootstrap.min.css';
import jwt_decoder from "jwt-decode";

const Home = () =>
{
    const history = useHistory();
    const [error, setError] = useState("");
    const data = jwt_decoder(localStorage.getItem("authToken"));
    console.log(data);

    const getFollowerData = async event => {
        event.preventDefault();
        let token = localStorage.getItem("authToken");

        const config = {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            },
        };

        try{
            const {data} = await axios.get("api/posts/timeline/all", config);

            console.log(data); // here is all the posts from currentUSer and followers :)

        }catch(err){
            console.log(err);
        }

    }
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
                        <div className="feedItem">
                            <img id="itemImage" alt = "recipe pic" src={recipeImage}></img>
                            <div className="itemInfo">
                                <span id="itemTitle">This is a feed item!</span>
                            </div>
                        </div>
                        <div className="feedItem">
                            <img id="itemImage" alt = "recipe pic" src={recipeImage}></img>
                            <div className="itemInfo">
                                <span id="itemTitle">This is a feed item!</span>
                            </div>
                        </div>
                        <div className="feedItem">
                            <img id="itemImage" alt = "recipe pic" src={recipeImage}></img>
                            <div className="itemInfo">
                                <span id="itemTitle">This is a feed item!</span>
                            </div>
                        </div>
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
                        <Link to="/profile"><img src={pfp} alt="Your profile pic" id="profilePicture"/></Link>
                        <span>Sample Name</span>
                    </div>
                    <br/>
                    <div className="followedUser">
                        <Link to="/profile"><img src={pfp} alt="Your profile pic" id="profilePicture"/></Link>
                        <span>Sample Name</span>
                    </div>
                    <br/>
                    <div className="followedUser">
                        <Link to="/profile"><img src={pfp} alt="Your profile pic" id="profilePicture"/></Link>
                        <span>Sample Name</span>
                    </div>
                    <button onClick={doLogout}>Logout</button>
                    <button onClick={getFollowerData}>Test</button>
                </div>
            </div>
    </div>

    );
};

export default Home;