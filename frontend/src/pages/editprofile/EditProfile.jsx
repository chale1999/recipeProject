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
	const [isEditName, setEditName] = useState("");
	const [isEditAbout, setEditAbout] = useState("");
	const [firstName,setFirstName] = useState(""); 
    const [lastName,setLastName] = useState("");
    const [desc,setDescription] = useState("");

	const [fullName, setFullName] = useState("");

	const [error,setError] = useState("");


	const editCover = () =>
	{
		console.log("edit cover!!");
	};

	const editPFP = () =>
	{
		console.log("edit pfp!!");
		<form>
		  <input type="file" id="img" name="img" accept="image/*"/>
		  <input type="submit"/>
		</form>
	};

	const handleChange=(e) =>{
		setFullName(e.target.value);
	}

	const editName = () =>
	{
		console.log("edit name!!");
		//var nameElement = document.getElementById('name');
		//var editButton = document.getElementById('editName');
		
		//var name = nameElement.textContent;
		//console.log(name);
		setEditName("edit");
		//editButton.remove();
		//render(nameEditElem, document.getElementById('nameDiv'));
		//var textbox = document.getElementById("nameEditTextBox");
		//textbox.setAttribute('size', textbox.getAttribute('value').length);
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

		console.log("Full name is: "+fullName);
		console.log("first name is: " + fullName.split(' ')[0]);
		setFirstName(fullName.split(' ')[0]);
		console.log("last name is: " + fullName.split(' ')[1]);
		setLastName(fullName.split(' ')[1]);
		try {
			
			const {data} = await axios.put(`/api/users/${username}`, {firstName:fullName.split(' ')[0], lastName:fullName.split(' ')[1]}, config);

			//console.log(data);
			history.push('/home')

		}catch(error) {
			console.log("bad");
		}

		console.log("check worked!!");
	};

	const editAboutMe = () =>
	{
		console.log("edit bio!!");
		//var abtMeElem = document.getElementById('aboutMeContent');
		//var abtMeButton = document.getElementById('editAboutMe');
		//var abtMeText = abtMeElem.textContent;
		setEditAbout("edit");
		//console.log(abtMeText);
		//abtMeElem.remove();
		//abtMeButton.remove();
		//const abtMeEditElem = <h3 style={{marginTop: '10px'}}><form id="abtMeForm" method="get" style={{border:'none', display: 'flex'}} onSubmit={doEditAboutMe}><input autoFocus id="aboutMeEditTextBox" style={{textAlign: 'center', padding:'5px', outline: 'none', border:'none', flex:'11'}} type="text" value={desc}onChange={(e) => setDescription(e.target.value)}></input><button id="saveAbtMeChange" type="submit" class="reset-this" style={{width:'38px', height:'38px',borderRadius:'10px', display: 'flex', alignItems:'center'}}><CheckIcon class="editButton" style={{border:'1px solid black', borderRadius: '10px', height: '38px', width:'38px'}}/></button></form></h3>
		//ReactDOM.render(abtMeEditElem, document.getElementById('editAboutMeButtonDiv'));
		//var textbox = document.getElementById("aboutMeEditTextBox");
		//var form = document.getElementById("abtMeForm");
		//var bttn = document.getElementById("saveAbtMeChange");
		//textbox.setAttribute('size', textbox.getAttribute('value').length + 5);
		//textbox.setAttribute('outline-width:', 0);
	};

	const doEditAboutMe = async event =>
	{
		console.log("in doEditAboutMe");
		console.log(desc);
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
			const {data} = await axios.put(`/api/users/${username}`, {desc}, config);

			console.log(data);
			history.push('/home')


		}catch(error) {
			console.log(error);
			//setError("Error Creating Recipe");
		}

		console.log("check worked!!");
	};

	return(
		<div class="profileScreen">
		  <PageNavbar/>
		  <div className="profile">
			<div className="profileTop">
				<div className="profileCover">
					<div id="coverDiv">
						<img src={cover} className="profileCoverImg"/>
						<label class="editButton" id="editCover" for="coverUpload" onClick={editCover} style={{outline:'1px solid black', width:'38px', height:'38px', display: 'flex', alignItems:'center', justifyContent: 'center'}}><Create/></label>
						<input type="file" id="coverUpload" style={{display:'none'}}></input>
					</div>
				</div>
				<div className="profileInfo">
					<div id="pfpDiv">
						<div id="actualImg">
							<img src={pfp} className="profileUserImg"/>
							<label class="editButton" id="editPFP" for="pfpUpload" onClick={editPFP}  style={{outline:'1px solid black', width:'38px', height:'38px', display: 'flex', alignItems:'center'}}><Create id="editPfpIcon"/></label>
							<input type="file" id="pfpUpload" style={{display:'none'}}></input>
						</div>
						<div id="nameDiv">
						<div>
							{isEditName ?
								<h2 style={{marginTop: '10px'}}>
								<form onSubmit={doEditName} style={{width: 'fit-content', border:'none', display:'flex', alignItems:'center', justifyContent:'center'}}>
								<input autoFocus id="nameEditTextBox" autoFocus style={{textAlign: 'center', width: 'fit-content', border:'none', outlineWidth:'0'}} type="text" value={fullName} onChange={(e)=> setFullName(e.target.value)}></input>
								<button type="submit" class="reset-this" style={{width:'38px', height: '38px', borderRadius:'10px', display: 'flex', alignItems:'center'}}>
								<CheckIcon class="editButton" style={{border:'1px solid black', borderRadius: '10px', height: '38px', width:'38px'}}/>
								</button></form></h2>
							:
								<div id="editNameButtonDiv">
								<button class="editButton" id="editName" onClick={editName} style={{border:'1px solid black'}}><Create/></button>
								</div>
							}
						</div>
						</div>
						<br/>
						<div id="aboutMeDiv">
							<span id="aboutMeTitle"><strong>About Me:</strong></span>
							{isEditAbout ?
								<h3 style={{marginTop: '10px'}}>
								<form id="abtMeForm" method="get" style={{border:'none', display: 'flex'}} onSubmit={doEditAboutMe}>
								<input autoFocus id="aboutMeEditTextBox" style={{textAlign: 'center', padding:'5px', outline: 'none', border:'none', flex:'11'}} type="text"  value={desc} onChange={(e) => setDescription(e.target.value)}>
								</input><button id="saveAbtMeChange" type="submit" class="reset-this" style={{width:'38px', height:'38px',borderRadius:'10px', display: 'flex', alignItems:'center'}}>
								<CheckIcon class="editButton" style={{border:'1px solid black', borderRadius: '10px', height: '38px', width:'38px'}}/>
								</button></form></h3>

							:
								<div id="editAboutMeButtonDiv">
									<span id="aboutMeContent" style={{fontSize:'25px'}}>{desc}</span>
									<button class="editButton" id="editAboutMe" onClick={editAboutMe} style={{border:'1px solid black'}}><Create/></button>
								</div>
							}
							
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