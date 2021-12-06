import React from 'react';
import {Link} from 'react-router-dom';
import { useState, useEffect } from "react";
import './PageNavbar.css';
import Bookmark from '@mui/icons-material/Bookmark';
import FoodBank from '@mui/icons-material/FoodBank';
import Search from '@mui/icons-material/Search';
import Notifications from '@mui/icons-material/Notifications';
import pfp from '../imgs/person.jpg';
import logo from '../imgs/MegaBitesLogo_transparent-large.png';
import LogoutIcon from '@mui/icons-material/Logout';

const HoverableDiv = ({ handleMouseOver, handleMouseOut }) => {
  return (
    <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      <Link to="/current-user"><img src={pfp} alt="My Profile" id="profilePicture"/></Link>
    </div>
  );
};

const Menu = () =>
{
    return(
        <div id="dropDown">
            <div id="menu">
                <button id="goToProfile">My Profile</button>
                <button id="editProfile">Edit My Profile</button>
                <button id="logOut"><LogoutIcon/>Log Out</button>
            </div>
        </div>
    );
};

const DropDownMenu = () =>
{
    const [isHovering, setIsHovering] = useState(false);
    const handleMouseOver = () => {
        setIsHovering(true);
    };

    const handleMouseOut = () => {
        setIsHovering(false);
  };
    return(
        <div>
            <HoverableDiv handleMouseOver={handleMouseOver} handleMouseOut={handleMouseOut}/>
            {isHovering && <Menu/>}
        </div>
    );
};

export default DropDownMenu;

