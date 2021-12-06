// JavaScript source code
import React from 'react';
import './AppStoreLink.css';
import googleplay from '../imgs/playstorebutton.png';

function AppStoreLink()
{
	return(
	  <div id="appLink">
         <span id="appLinkText">Get our app!</span>
		 <span><a href="https://play.google.com/"><img id="logo" alt ="Available on Google Play Store" src={googleplay}/></a></span>
	  </div>
	)
}

export default AppStoreLink;