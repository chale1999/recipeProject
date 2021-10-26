import React from 'react';
import '../components/styling.css';

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
    <body>
        <nav class="navbar">
            <div class="navbar__container">
                <a href="/" id="navbar__logo">Recipe!</a>
                <div class="navbar__toggle" id="mobile-menu">
                    <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
                </div>
                <ul class="navbar__menu">
                    <li class="navbar__item">
                        <a href="/" class="navbar__links">
                            Home
                        </a>    
                    </li> 
                    <li class="navbar__item">
                        <a href="/pages/NewPage.js" class="navbar__links">
                            New Page
                        </a>    
                    </li> <li class="navbar__item">
                        <a href="/pages/NewPage.js" class="navbar__links">
                            Another Page
                        </a>    
                    </li> 
                    <li class="navbar__btn">
                        <a href="/" class="button">
                            Login/Sign Up
                        </a>    
                    </li> 
                    
                </ul>
            </div> 
        </nav>
    </body>
    );
};

export default PageNavbar;