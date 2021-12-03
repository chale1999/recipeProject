import React from 'react';
import {Link} from 'react-router-dom';
import './PageNavbar.css';
import Bookmark from '@mui/icons-material/Bookmark';
import FoodBank from '@mui/icons-material/FoodBank';
import Search from '@mui/icons-material/Search';
import Notifications from '@mui/icons-material/Notifications';
import pfp from '../imgs/person.jpg';
import logo from '../imgs/MegaBitesLogo_transparent-large.png'

function PageNavbar()
{   
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
                <input placeholder="Search" id="searchbar"/>
            </div>

            <div id="navBarRight">
                <div className="navItem">
                    <Link to="/home"><FoodBank fontSize="large"/></Link>
                </div>
                <div className="navItem">
                    <Link to="/bookmarks"><Bookmark fontSize="large"/></Link>
                </div>
                <div className="navItem">
                  <Notifications fontSize="large"/>
                  <span id="notifCount">1</span>
                </div>
                <div className="navItem">
                  <Link to="/current-user"><img src={pfp} alt="Your profile pic" id="profilePicture"/></Link>
                </div>
            </div>
        </div> 
    </div>
    );
};

export default PageNavbar;