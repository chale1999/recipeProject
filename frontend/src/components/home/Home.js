import React from "react";
import HomeComponent from './HomeComponent.js'
import PageNavbar from "../navbar/PageNavbar.js";

function Home(){
    return(
    <div>
        <PageNavbar/>
        <HomeComponent/>
    </div>

    )
}

export default Home;