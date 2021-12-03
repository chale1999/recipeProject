import React from "react"
import { useHistory } from 'react-router';
import {Link} from 'react-router-dom';
import pfp from '../../components/imgs/person_no_pic.png';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import { useEffect, useState } from 'react';
import './icon.css';
import e from "cors";

export default function Icons({follower_name}) {
    const username = follower_name;
    let test;
    const history = useHistory();
	const [firstName,setFirstName] = useState(""); 
    const [lastName,setLastName] = useState("");
    //console.log(follower_name);
    var token = localStorage.getItem("authToken");
    var decoded = jwt_decode(token);

    if(decoded.username == follower_name)
    {
         test = `/current-user`;
    }
    else{
         test = `/profile/${follower_name}`;
    }
    
    //const firstName = follower_name.firstName;
   //const lastName = follower_name.lastName;

   useEffect(() => {
        const getProfile = async event =>
        {
            //event.preventDefault();
            var token = localStorage.getItem("authToken");
            var decoded = jwt_decode(token);
            
            const config = {
                headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            };

            try {
                const {data} = await axios.get(`/api/users/${username}`,config);
                setFirstName(data.firstName);
                setLastName(data.lastName);

            }catch(error) {
                console.log(error);
            }
        };
        getProfile();
   },[]); // only loads in the data once 




   //const firstName = 'testing';
   //const lastName = 'test';

    return(
        <div className="profileFollowedUserContainer">
            <div className="followedUser">
                <Link to= {test}><img src={pfp} alt="Your profile pic" id="profilePicture"/></Link>
                <span>{firstName} {lastName}</span>
            </div>
            <br/>
        </div>
    )
};

