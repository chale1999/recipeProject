import React from 'react';
import './PageNavbar.css';
import { Bookmark, FoodBank, Search, Notifications, AccountCircle} from '@mui/icons-material';
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
                    <FoodBank fontSize="large"/>
                </div>
                <div class="navItem">
                    <Bookmark fontSize="large"/> 
                </div>
                <div class="navItem">
                  <Notifications fontSize="large"/>
                  <span id="notifCount">1</span>
                </div>
            </div>
            <img src={pfp} alt="Your profile picture!" id="profilePicture"/>
        </div> 
    </div>
    );
};

export default PageNavbar;