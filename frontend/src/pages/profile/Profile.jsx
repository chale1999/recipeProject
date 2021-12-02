import PageNavbar from '../../components/navbar/PageNavbar';
import './Profile.css';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import { useHistory } from 'react-router';
import {Link} from 'react-router-dom';
import pfp from '../../components/imgs/person.jpg';
import cover from '../../components/imgs/food.jpg';
import recipeImage from '../../components/imgs/food.jpg';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


const Profile = () =>
{
	const history = useHistory();
	const getProfile = async event =>
	{
		//event.preventDefault();
		var token = localStorage.getItem("authToken");
		var decoded = jwt_decode(token);
		
		console.log(decoded);
 
		
		const config = {
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        };

		const username = decoded.username;

		try {
			const {data} = await axios.get(`/api/users/${username}`,config);
			console.log(data); // in data has all the current users data from db!

		}catch(error) {
			console.log(error);
		}
	}


	getProfile();
	return(
		<div class="profileScreen">
		  <PageNavbar/>
		  <div className="profile">
			<div className="profileTop">
				<div className="profileCover">
					<img src={cover} className="profileCoverImg"/>
					<img src={pfp} className="profileUserImg"/>
				</div>
				<div className="profileInfo">
					<h4 className="profileInfoName"><b>Sample Name</b></h4>
					<span className="profileInfoDesc">Hello! My name is Sample Name. I love to cook and specialize in baking!</span>
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
    						</TabPanel>
    						<TabPanel>
							<div className="profileFollowedUserContainer">
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
							</div>
    						</TabPanel>
							<TabPanel>
							<div className="profileFollowedUserContainer">
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
							</div>
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