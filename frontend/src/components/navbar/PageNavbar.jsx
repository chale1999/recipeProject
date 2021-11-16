import React from 'react';
import {Link} from 'react-router-dom';
import './PageNavbar.css';
import { Bookmark, FoodBank, Search, Notifications} from '@mui/icons-material';
import pfp from '../imgs/person.jpg';
function PageNavbar()
{   
    /*const mystyle = {
        color: "white",
        backgroundColor: "lightGreen",
        padding: "8px",
        margin: 2,
        fontfamily: 'Kumbh Sans',

    };*/
    return(  
    <div id="navbar">
        <div class="navbar__container">
            <div id="logoContainer">
                <span id="navbar__logo">MegaBites</span>
            </div>

            <div class="navbar__toggle" id="mobile-menu">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div>

            <div id="navBarMiddle">
                <Search id="searchIcon"/>
                <input placeholder="Search" id="searchbar"/>
            </div>

            <div id="navBarRight">
                <div class="navItem">
                    <Link to="/home"><FoodBank fontSize="large"/></Link>
                </div>
                <div class="navItem">
                    <Link to="/bookmarks"><Bookmark fontSize="large"/></Link>
                </div>
                <div class="navItem">
                  <Notifications fontSize="large"/>
                  <span id="notifCount">1</span>
                </div>
                <div class="navItem">
                  <Link to="/profile"><img src={pfp} alt="Your profile picture" id="profilePicture"/></Link>
                </div>
            </div>
        </div> 
    </div>
    );
};

export default PageNavbar;