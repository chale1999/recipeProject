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

	return(
		<div class="profileScreen">
		  <PageNavbar/>
		  <div className="profile">
			<div className="profileTop">
				<div className="profileCover">
					<img src={cover} className="profileCoverImg"/>
				</div>
				<div id="pfp">
					<img src={pfp} className="profileUserImg"/>
				</div>
				<div className="profileInfo">
					<h4 className="profileInfoName"><b>{firstName} {lastName}</b></h4>
					<span className="profileInfoDesc">{desc}</span>
					<form className="editProfileButton" onClick={toEditProfile}>
                        <Create/>
                        <br/>
                        <span id="editProfileButtonText">Edit</span>
                    </form>
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