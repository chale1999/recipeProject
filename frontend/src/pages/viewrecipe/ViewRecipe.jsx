import React from 'react';
import './ViewRecipe.css';
import PageNavbar from '../../components/navbar/PageNavbar.jsx';
import SamplePic from '../../components/imgs/spoon-and-fork-crossed.jpg'
import { useParams } from 'react-router';
import { useHistory } from 'react-router';
import { useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const ViewRecipe = () =>{

    const history = useHistory();
    const {id} = useParams();
    console.log(id);


    const [username,setUsername] = useState(""); 
    const [recipeName,setRecipeName] = useState("");
    const [desc,setDescription] = useState(""); 
    const [ingredients,setIngredients] = useState([]);
    const [directions,setDirections] = useState([]);
    const [prepTime,setPrepTime] = useState("");
    const [cookTime,setCookTime] = useState("");
    const [servingCount,setServingCount] = useState("");
    

    const getPost = async event => {
		var token = localStorage.getItem("authToken");
		var decoded = jwt_decode(token);

		const config = {
			headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("authToken")}`,
			},
		};

		try {
			const {data} = await axios.get(`/api/posts/${id}`,config);
            setRecipeName(data.recipeName);
            setUsername(data.username);
            setDescription(data.desc);
            setIngredients(data.ingredients);
            setDirections(data.directions);
            setPrepTime(data.prepTime);
            setCookTime(data.cookTime);
            setServingCount(data.servingCount);

		}catch(error) {
			console.log(error);
		}

	};


    useEffect(() => {
        getPost();
    },[]);




    return(
        <div>
            <PageNavbar/>
            <div class="viewRecipePage">
                <div class="viewRecipeContainer">
                    <div className="viewRecipeInfo1">
                        <img alt ="pic upload" height="200" src={SamplePic}/>
                        <hr/>
                        <div className="timeField">
                            <p className="fieldLabel">Preparation Time</p>
                            <span>{prepTime}</span>
                        </div>
                        <br/>
                        <div className="timeField">
                            <p className="fieldLabel">Cooking Time</p>
                            <span>{cookTime}</span>
                        </div>
                        <br/>
                        <div className="timeField">
                            <p className="fieldLabel">Number of servings</p>
                            <span>{servingCount}</span>
                        </div>
                        <br/>
                        <div className="newRecipeIngr">
                            <p className="fieldLabel">Ingredients List</p>
                            <form>
                                <ul>
                                {ingredients.map((p) => (
									<li>{p}</li>
								))}
                                </ul>
                            </form>
                        </div>
                        <hr/>
                    </div>
                    <div class="viewRecipeInfo2">
                        <BookmarkAddIcon id="addBookmark"/>
                        <div className="viewRecipeTitle">
                            <span style={{textAlign: 'center', fontSize: '40px', fontWeight: 'bold'}}>{recipeName}</span>
                        </div>
                        <hr/>
                        <div className="viewRecipeDesc">
                            <p className="fieldLabel">Description</p>                
                            <form>
                                <span>{desc}</span>
                            </form>
                        </div>
                        <hr/>
                        <div className="newRecipeProc">
                            <p className="fieldLabel">Procedure</p>
                            <form>
                                <ul>
                                {directions.map((p) => (
									<li>{p}</li>
								))}
                                </ul>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewRecipe;