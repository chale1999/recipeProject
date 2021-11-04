// JavaScript source code
import React from 'react';
import './styling.css';
import googleplay from './imgs/playstorebutton.png';

function AppStoreLink()
{
	return(
	  <div class="center" id="appLink">
         <p>Get our app!<br/><a href="https://play.google.com/"><img id="logo" alt ="Available on Google Play Store" src={googleplay} width="134" height="50"/></a></p>
	  </div>
	)
}

export default AppStoreLink;