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
    const [searchTerm,setSearchTerm] = useState("");
    const history = useHistory();
    const doLogout = () =>
    {
        localStorage.removeItem("authToken");
        history.push("/");
    }

    const doSearch = () =>
    {
        const url = `/${searchTerm}`;
        history.push(url);
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
                <Search id="searchIcon" style={{fontSize: '28px'}}/>
                <form id="searchForm" onSubmit={doSearch}>
                    <input placeholder="Search" id="searchbar" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                    <input type="submit" style={{display: 'none'}}/>
                </form>
            </div>

            <div id="navBarRight">
                <div className="navItem" id="homeButton">
                    <Link to="/home"><FoodBank style={{fontSize:"40px"}}/></Link>
                    <div id="dropdown-content-home">
                        <div id="dropdown-text-home">
                            <span>Home</span>
                        </div>
                    </div>
                </div>
                <div className="navItem" id="bookmarkButton">
                    <Link to="/bookmarks"><Bookmark style={{fontSize:"40px"}}/></Link>
                    <div id="dropdown-content-bookmark">
                        <div id="dropdown-text-bookmark">
                            <span>My Bookmarks</span>
                        </div>
                    </div>

                </div>
                <div className="navItem" id="profileButton">
                    <Link to="/current-user"><img src={pfp} alt="My Profile" id="profilePicture"/></Link>
                    <div id="dropdown-content-profile">
                        <div id="dropDownButtons-profile">
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