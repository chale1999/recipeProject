import PageNavbar from '../../components/navbar/PageNavbar';
import './EditProfile.css';
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

const EditProfile = () =>
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

	const editCover = () =>
	{
		console.log("edit cover!!");
	};

	const editPFP = () =>
	{
		console.log("edit pfp!!");
	};

	const editName = () =>
	{
		console.log("edit name!!");
	};

	const editBio = () =>
	{
		console.log("edit bio!!");
	};

	useEffect(() => {
		getProfile();
	}, {});

	return(
		<div class="profileScreen">
		  <PageNavbar/>
		  <div className="profile">
			<div className="profileTop">
				<div className="profileCover">
					<img src={cover} className="profileCoverImg"/>
					<div>
						<button id="editCover" onClick={editCover}><Create/></button>
					</div>
					<div id="pfpDiv">
						<img src={pfp} className="profileUserImg"/>
						<div>
							<button id="editPFP" onClick={editPFP}><Create/></button>
						</div>
					</div>
				</div>
				
				<div className="profileInfo">
					<h4 className="profileInfoName"><b>{firstName} {lastName}</b></h4>
					<button id="editName" onClick={editName}><Create/></button>
					<span className="profileInfoDesc">{desc}</span>
				</div>
			</div>
			<div className="break">

			</div>
	      </div>
		</div>
	);
};

export default EditProfile;