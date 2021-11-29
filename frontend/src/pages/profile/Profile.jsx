import NavBar from '../../components/navbar/PageNavbar';
import './Profile.css';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import { useHistory } from 'react-router';


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
		<>
		  <NavBar/>
		  <div className="profile">
			<div className="profileTop">
			cover photo and pfp
			</div>
			<div className="break">

			</div>
			<div className="tabs">
			tabs like followers, my recipes, etc
			</div>
	      </div>
		</>
	);
};

export default Profile;