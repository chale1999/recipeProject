import PageNavbar from '../../components/navbar/PageNavbar';
import ReactDOM from 'react-dom';
import CheckIcon from '@mui/icons-material/Check';
import './EditProfile.css';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import { useHistory } from "react-router-dom";
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
	const setFullName = useState("");
	const [firstName,setFirstName] = useState(""); 
    const [lastName,setLastName] = useState("");
    const [desc,setDiscription] = useState("");
	const [followers,setFollowers] = useState([]);
	const [following, setFollowing] = useState([]);
	const [posts, setPosts] = useState([]);
	const [error,setError] = useState("");

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
		var nameElement = document.getElementById('name');
		var editButton = document.getElementById('editName');
		var name = nameElement.textContent;
		console.log(name);
		nameElement.remove();
		editButton.remove();
		const nameEditElem = <h4 className="profileInfoName"><form method = "get" onSubmit={doEditName}><input style={{textAlign: 'center'}} type="text" placeholder={name} onChange={(e) => setFirstName(e.target.value.split()[0])}></input><button type="submit" class="reset-this"><CheckIcon style={{border:'1px solid black', borderRadius: '10px', marginLeft:'5px', height: '38px', width:'38px'}}/></button></form></h4>
		ReactDOM.render(nameEditElem, document.getElementById('nameDiv'));
	};

	const doEditName = async event =>
	{
		event.preventDefault();
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
			const {data} = await axios.put(`/api/users/${username}`, {firstName, lastName}, config);

			console.log(data);
			History.push('/home')


		}catch(error) {
			setError(error.response.error);
			//setError("Error Creating Recipe");
		}

		console.log("check worked!!");
	};
	const editAboutMe = () =>
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
					<div id="coverDiv">
						<img src={cover} className="profileCoverImg"/>
						<button id="editCover" onClick={editCover}><Create/></button>
					</div>
				</div>
				<div className="profileInfo">
					<div id="pfpDiv">
						<div id="actualImg">
							<img src={pfp} className="profileUserImg"/>
							<button id="editPFP" onClick={editPFP}><Create/></button>
						</div>
						<div id="nameDiv">
							<span id="name">{firstName} {lastName}</span>
							<div id="editNameButtonDiv">
								<button id="editName" onClick={editName}><Create/></button>
							</div>
						</div>
						<div id="aboutMeDiv">
							<span id="aboutMeTitle"><strong>About Me:</strong></span>
							<div id="editAboutMeButtonDiv">
								<span id="aboutMeContent">A54ub7aCseZpAdEa8w53Z2AM62CdrHLkoAZLIRc5fJv8k9QVio</span>
								<button id="editAboutMe" onClick={editAboutMe}><Create/></button>
							</div>
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