import React from "react";
import "./HomeStyle.css";
import PageNavbar from "../../components/navbar/PageNavbar.jsx";
import {Create} from '@mui/icons-material';
import { useHistory } from "react-router-dom";
import pfp from '../../components/imgs/person.jpg';
import {Link} from 'react-router-dom';
import recipeImage from '../../components/imgs/food.jpg';

const Home = () =>
{
    const history = useHistory();

	const toCreate = async event =>
	{
		event.preventDefault();
		let path = `/create-recipe`	
		history.push(path);
	}
    return(
    <div>
        <PageNavbar/>
            <div class="homeScreen">
                <div class="homeStuff1">
                    <form class="newRecipeButton" onClick={toCreate}>
                        <Create/>
                        <br/>
                        <span id="buttonText">Create a new recipe!</span>
                    </form>
                    <div class="feedArea">
                        <div class="feedItem">
                            <img id="itemImage" src={recipeImage}></img>
                            <div class="itemInfo">
                                <span id="itemTitle">This is a feed item!</span>
                            </div>
                        </div>
                        <div class="feedItem">
                            <img id="itemImage" src={recipeImage}></img>
                            <div class="itemInfo">
                                <span id="itemTitle">This is a feed item!</span>
                            </div>
                        </div>
                        <div class="feedItem">
                            <img id="itemImage" src={recipeImage}></img>
                            <div class="itemInfo">
                                <span id="itemTitle">This is a feed item!</span>
                            </div>
                        </div>
                    </div>
                </div> 
                <div class="homeStuff2">
                        <span class="fieldLabel">This is where followed users go.</span>
                    <hr/>
                    <div class="followedUser">
                        <Link to="/profile"><img src={pfp} alt="Your profile picture" id="profilePicture"/></Link>
                        <span>Sample Name</span>
                    </div>
                    <br/>
                    <div class="followedUser">
                        <Link to="/profile"><img src={pfp} alt="Your profile picture" id="profilePicture"/></Link>
                        <span>Sample Name</span>
                    </div>
                    <br/>
                    <div class="followedUser">
                        <Link to="/profile"><img src={pfp} alt="Your profile picture" id="profilePicture"/></Link>
                        <span>Sample Name</span>
                    </div>
                    <br/>
                    <div class="followedUser">
                        <Link to="/profile"><img src={pfp} alt="Your profile picture" id="profilePicture"/></Link>
                        <span>Sample Name</span>
                    </div>
                </div>
            </div>
    </div>

    );
};

export default Home;