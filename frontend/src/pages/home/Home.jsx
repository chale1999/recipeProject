import React from "react";
import "./HomeStyle.css";
import PageNavbar from "../../components/navbar/PageNavbar.jsx";

const Home = () =>
{
    return(
    <div>
        <PageNavbar/>
        <div class="container"> 
            <div class="feedItem">
                <div class="itemContent">
                    <div class="itemPicture">

                    </div>
                    <div class="itemInfo">
                        <p>This is a feed item!</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    );
};

export default Home;