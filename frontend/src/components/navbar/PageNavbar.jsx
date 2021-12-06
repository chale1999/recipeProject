import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import { useState, useEffect } from "react";
import './PageNavbar.css';
import DropDownMenu from './DropDownMenu.jsx';
import Bookmark from '@mui/icons-material/Bookmark';
import FoodBank from '@mui/icons-material/FoodBank';
import Search from '@mui/icons-material/Search';
import Notifications from '@mui/icons-material/Notifications';
import pfp from '../imgs/person.jpg';
import logo from '../imgs/MegaBitesLogo_transparent-large.png';
import LogoutIcon from '@mui/icons-material/Logout';
import Create from '@mui/icons-material/Create';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const PageNavbar = () =>
{   
    const history = useHistory();
    const doLogout = () =>
    {
        localStorage.removeItem("authToken");
        history.push("/");
    }

    return(  
    <div id="navbar">
        <div className="navbar__container">
            <div id="logoContainer">
                <Link to="/home"><img src={logo} id="navbar__logo"/></Link>
            </div>

            <div className="navbar__toggle" id="mobile-menu">
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>

            <div id="navBarMiddle">
                <Search id="searchIcon"/>
                <form>
                    <input placeholder="Search" id="searchbar"/>
                    <input type="submit" style={{display: 'none'}}/>
                </form>
            </div>

            <div id="navBarRight">
                <div className="navItem">
                    <Link id="homeButton" to="/home"><FoodBank fontSize="large"/></Link>
                </div>
                <div className="navItem" id="bookmarkButton">
                    <Link to="/bookmarks"><Bookmark  fontSize="large" /></Link>
                </div>
                <div className="navItem" id="profileButton">
                    <Link to="/current-user"><img src={pfp} alt="My Profile" id="profilePicture"/></Link>
                    <div id="dropdown-content">
                        <div id="dropDownButtons">
                            <button id="myProfileButton"><Link to="/current-user"><AccountCircleIcon/>&nbsp;My Profile</Link></button>
                            <button><Link to="/edit-profile"><Create/>&nbsp;Edit Profile</Link></button>
                            <button onClick={doLogout} id="logOutButton"><LogoutIcon/>&nbsp;&nbsp;Log Out&nbsp;&nbsp;</button>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    </div>
    );
};

export default PageNavbar;