import React, { useEffect, useState } from "react";
import Add from '@mui/icons-material/Add';
import Check from '@mui/icons-material/Check';
import './FollowButton.css';
import axios from 'axios';
import { useParams } from 'react-router';
import jwt_decode from "jwt-decode";



function FollowButton({followingList}) {

    const {username} = useParams();
    let token = localStorage.getItem("authToken");
	var decoded = jwt_decode(token);
    const loggedib_username = decoded.username;

    const [isFollowing, setFollowing] = useState(false);
    const [followers,setFollowers] = useState([]);
    const [success,setSuccess] = useState([]);
    const [error,setError] = useState([]);
    console.log("Props is "+followingList)
    var arr = followingList.toString()
    var actual_array = arr.split(',');
    //console.log("array : "+arr);

    const checkFollowing = async event => {
        if(actual_array.includes(loggedib_username))
        {
            console.log("Is following")
            setFollowing(true);
        }
        {
            setFollowing(false);
        }
        console.log("Is NOT following")
    }

	const followUser = async event => {
        event.preventDefault();
        let token = localStorage.getItem("authToken");
		var decoded = jwt_decode(token);

		const config = {
			headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
			},
		};
		 try {
			const {data} = await axios.put(`/api/users/${username}/follow`,{},config);
            setSuccess(data);
		 } catch(error) {
			setError(error.message);
		 }
	};

    const unfollowUser = async event => {
        event.preventDefault();
        let token = localStorage.getItem("authToken");
        const config = {
			headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
			},
		};
        try {
			const {data} = await axios.put(`/api/users/${username}/unfollow`,{}, config);
            setSuccess(data);
		 } catch(error) {
			setError(error.message);
		 }
    };

    const followTemplate = (
        <form id="followForm" onClick={() => setFollowing(true)}>
            <Add/>
            <span id="followUserButtonText">Follow</span>
        </form>
    );

    const followingTemplate = (
        <form id="followingForm" onClick={() => setFollowing(false)}>
            <Check/>
            <span id="followingUserButtonText">Following</span>
        </form>
    );

    useEffect(() => {
        checkFollowing();
    },[{username}])
        
    return(
        <div>
            {isFollowing ?
                <button class="followingUserButton" onClick={unfollowUser}>
                    {followingTemplate}
                </button>
            :
                <button class="followUserButton" onClick={followUser}>
                    {followTemplate}
                </button>
            }
        </div>
    );
}

export default FollowButton;