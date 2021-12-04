import PageNavbar from '../../components/navbar/PageNavbar';
import ReactDOM from 'react-dom';
import CheckIcon from '@mui/icons-material/Check';
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
		var nameElement = document.getElementById('profileName');
		var editButton = document.getElementById('editName');
		var name = nameElement.textContent;
		console.log(name);
		nameElement.remove();
		editButton.remove();
		const nameEditElem = <h4 className="profileInfoName"><form method = "get" onSubmit={check}><input style={{textAlign: 'center'}} type="text" placeholder={name}></input><button type="submit" class="reset-this"><CheckIcon style={{border:'1px solid black', borderRadius: '10px', marginLeft:'5px', height: '38px', width:'38px'}}/></button></form></h4>
		ReactDOM.render(nameEditElem, document.getElementById('nameDiv'));
	};

	const check = () =>
	{
		console.log("check worked!!");
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
					<div id="nameDiv">
						<h4 id="profileName" className="profileInfoName"><b>{firstName} {lastName}</b></h4>
					</div>
					<div id="infoContainer">
						<button id="editName" onClick={editName}><Create/></button>
					</div>
					
					<div id="bio">
						<h5 id="aboutMe"><b>About Me</b></h5>
						<div id="bioContents">
							<span class="profileInfoDesc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim blandit aaa volutpat maecenas volutpat blandit aliquam etiam erat. Mattis molestie a iaculis at erat pellentesque.</span>
							<button id="editBio"><Create/></button>
						</div>
					</div>
				</div>
				
			</div>
			<div className="break">

			</div>
	      </div>
		</div>
	);
};

export default EditProfile;