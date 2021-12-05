import React, { useState } from "react";
import Add from '@mui/icons-material/Add';
import Check from '@mui/icons-material/Check';
import './FollowButton.css';

function FollowButton() {

    const [isFollowing, setFollowing] = useState(false);

    const followTemplate = (
        <form className="followUserButton" onClick={() => setFollowing(true)}>
            <Add/>
            <br/>
            <span id="followUserButtonText">Follow User</span>
        </form>
    );
    const followingTemplate = (
        <form className="followingUserButton" onClick={() => setFollowing(false)}>
            <Check/>
            <br/>
            <span id="followingUserButtonText">Following</span>
        </form>
    );
        
    return(
        <div>
            {isFollowing ? followingTemplate : followTemplate}
        </div>
    );
}

export default FollowButton;