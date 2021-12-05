import React, { useState } from "react";
import Add from '@mui/icons-material/Add';
import Check from '@mui/icons-material/Check';
import './FollowButton.css';
import axios from 'axios';
import { useParams } from 'react-router';



function FollowButton() {

    const {username} = useParams();
    const [isFollowing, setFollowing] = useState(false);
    const [followers,setFollowers] = useState([]);

	const followUser = async event => {
		const config = {
			headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("authToken")}`,
			},
		};
		 try {
			const {data} = await axios.put(`/api/users/${username}/follow`, config);
			setFollowers(data);
		 } catch(error) {
			console.log(error);
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
        
    return(
        <div>
            {isFollowing ?
                <button class="followingUserButton" onClick={followUser}>
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