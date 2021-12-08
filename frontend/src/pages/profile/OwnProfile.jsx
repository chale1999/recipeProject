import PageNavbar from '../../components/navbar/PageNavbar';
import './Profile.css';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import { useHistory } from 'react-router';
import {Link} from 'react-router-dom';
import pfp from '../../components/imgs/person.jpg';
import cover from '../../components/imgs/cover3.jpg';
import recipeImage from '../../components/imgs/food.jpg';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Create from '@mui/icons-material/Create';
import Icons from '../../components/smallIcon/icon';
import SmallRecipe from '../../components/smallRecipeIcon/smallRecipeCard';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useEffect, useState } from 'react';


const OwnProfile = () =>
{
	const history = useHistory();
	const [firstName,setFirstName] = useState(""); 
    const [lastName,setLastName] = useState("");
    const [desc,setDiscription] = useState("");
	const [followers,setFollowers] = useState([]);
	const [following, setFollowing] = useState([]);
	const [posts, setPosts] = useState([]);
	var followerCount;
	var followingCount;

	const getProfile = async event =>
	{
		//event.preventDefault();
		var token = localStorage.getItem("authToken");
		var decoded = jwt_decode(token);
		
		//console.log(decoded);

		
		const config = {
			headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("authToken")}`,
			},
		};

		const username = decoded.username;

		try {
			const {data} = await axios.get(`/api/users/${username}`,config);
			setFirstName(data.firstName);
			setLastName(data.lastName);
			setDiscription(data.desc);
			setFollowers(data.followers);
			//console.log(followers);
			setFollowing(data.following);

		}catch(error) {
			console.log(error);
		}
		
		followerCount = followers.length;
		followingCount = following.length;
	};


	const getUserPosts = async event => {
		var token = localStorage.getItem("authToken");
		var decoded = jwt_decode(token);
		const username = decoded.username;

		const config = {
			headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("authToken")}`,
			},
		};

		try {
			const {data} = await axios.get(`/api/posts/getall/${username}`,config);
			setPosts(data);
		}catch(error) {
			console.log(error);
		}

	};

	useEffect(() => {
		getProfile();
		getUserPosts();
	}, []);

	const toEditProfile = async event =>
	{
		event.preventDefault();
		history.push("edit-profile");
	}

	const toCreateRecipe = () =>
	{
		let createRecipePath = '/create-recipe';
		history.push(createRecipePath);
	}

	return(
		<div class="profileScreen">
		  <PageNavbar/>
		  <div className="profile">
			<div className="profileTop">
				
				<div className="profileCover">
					<img src={cover} className="profileCoverImg"/>
				</div>

				<div className="profileInfo">
					<div id="flexBoxHorizontal">
						<div id="aboutMeDiv">
							<div id="aboutMeContent">
								<span id="aboutMeTitle" style={{marginBottom: '10px', fontFamily: 'MV Boli', fontSize:'22px'}}><strong>About Me:</strong></span>
								<p id="aboutMeText" style={{fontFamily: 'MV Boli'}}>{desc}</p>
							</div>
						</div>
						<div id="pfpDiv">
							<img src={pfp} className="profileUserImg"/>
							<span id="name">{firstName} {lastName}</span>
						</div>
						<div id="rightProfileDiv">
							<span style={{fontFamily: 'MV Boli'}}>My Kitchen</span>
							<div id="followerFollowing">
								<table class="follow">
									<tr>
										<th>Sous-Chefs</th>
										<th>Head-Chefs</th>
									</tr>
									<tr>
										<td>{followers.length}</td>
										<td>{following.length}</td>
									</tr>
								</table>
							</div>
							<form className="editProfileButton" onClick={toEditProfile}>
								<Create/>
								<p id="editProfileButtonText">Edit Profile</p>
							</form>
						</div>
					</div>
				</div>
			</div>
			<div className="break">

			</div>
			<div class="profileBottom">
				
				<div className="profileBottomInfo">
					<div className="tabs">
						<Tabs>
    						<TabList>
      							<Tab>My Recipes</Tab>
      							<Tab>Users You Follow</Tab>
								<Tab>Users Following You</Tab>
    						</TabList>
    						<TabPanel>
      							<div className="feedArea">
									<div id="createRecipe" onClick={toCreateRecipe}>
										<AddCircleOutlineIcon sx={{fontSize: '60px'}}/>
										<Link id="linkToCreateRecipe" to="/create-recipe" style={{display:'none'}}></Link>
										<span id="createRecipeText" style={{fontSize: '24px', fontWeight: '600'}}>Create a Recipe</span>
									</div>
								  {posts.map((p) => (
									<SmallRecipe key = {p._id} posts = {p}/>
								))}
                    			</div>
    						</TabPanel>
    						<TabPanel>
								{following.map((p) => (
									<Icons key = {p.username} follower_name = {p}/>
								))}
    						</TabPanel>
							<TabPanel>
								{followers.map((p) => (
										<Icons key = {p.username} follower_name = {p}/>
								))}
    						</TabPanel>
  						</Tabs>
					</div>
				</div>
			</div>
	      </div>
		</div>
	);
};

export default OwnProfile;