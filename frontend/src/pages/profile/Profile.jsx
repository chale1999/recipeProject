import PageNavbar from '../../components/navbar/PageNavbar';
import './Profile.css';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import { useHistory } from 'react-router';
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import pfp from '../../components/imgs/person.jpg';
import cover from '../../components/imgs/user2.jpg';
import recipeImage from '../../components/imgs/food.jpg';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Icons from '../../components/smallIcon/icon';
import 'react-tabs/style/react-tabs.css';
import SmallRecipe from '../../components/smallRecipeIcon/smallRecipeCard';
import FollowButton from '../../components/followbutton/FollowButton';


const Profile = () =>
{
	const history = useHistory();
	const {username} = useParams();
	console.log(username);
	const [firstName,setFirstName] = useState(""); 
    const [lastName,setLastName] = useState("");
    const [desc,setDiscription] = useState("");
	const [followers,setFollowers] = useState([]);
	const [following, setFollowing] = useState([]);
	const [posts, setPosts] = useState([]);


	const getProfile = async event =>
	{
		//event.preventDefault();
		const config = {
			headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("authToken")}`,
			},
		};

		try {
			const {data} = await axios.get(`/api/users/${username}`,config);
			console.log(data);
			setFirstName(data.firstName);
			setLastName(data.lastName);
			setDiscription(data.desc);
			setFollowers(data.followers);
			//console.log(followers);
			setFollowing(data.following);
			//return data; // in data has all the current users data from db!

		}catch(error) {
			console.log(error);
		}
	};

	const getUserPosts = async event => {

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
	}, [])




	return(
		<div class="profileScreen">
		  <PageNavbar/>
		  <div className="profile">
		  <div className="profileTop">
				<div className="profileCover">
					<img src={cover} className="profileCoverImg"/>
					
				</div>
				<div className="profileInfo">
					<div id="pfpDiv">
						<img src={pfp} className="profileUserImg"/>
						<span id="name">{firstName} {lastName}</span>
						<div id="aboutMeDiv">
							<span id="aboutMeTitle"><strong>About Me:</strong></span>
							<br/>
							<p id="aboutMeContent">{desc}</p>
						</div>
					</div>
					<FollowButton/>
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
      							<Tab>Users They Follow</Tab>
								<Tab>Users Following Them</Tab>
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

export default Profile;