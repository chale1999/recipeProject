import React from 'react';
import './ViewRecipe.css';
import PageNavbar from '../../components/navbar/PageNavbar.jsx';
import SamplePic from '../../components/imgs/spoon-and-fork-crossed.jpg'
import { useParams } from 'react-router';
import { useHistory } from 'react-router';
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import BookmarkButton from '../../components/bookmarkbutton/BookmarkButton';
import DeleteButton from '../../components/deleteButton/deleteButton';
import EditButton from '../../components/editButton/EditButton';

const ViewRecipe = () =>{
    const history = useHistory();
    const {id} = useParams();
    const editURL = `/edit-recipe/${id}`;
    console.log("editURL = " + editURL);
    console.log("recipeId"+id);

    const [username,setUsername] = useState(""); 
    const [recipeName,setRecipeName] = useState("");
    const [desc,setDescription] = useState(""); 
    const [ingredients,setIngredients] = useState([]);
    const [directions,setDirections] = useState([]);
    const [prepTime,setPrepTime] = useState("");
    const [cookTime,setCookTime] = useState("");
    const [servingCount,setServingCount] = useState("");
    var delVisible;
    var logged_in_user;
    var poster_user;

    const getPost = async event => {
        console.log("getPost");
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
            console.log("set poster user as:"+ username + " came in as: "+ data.username);
            setDescription(data.desc);
            setIngredients(data.ingredients);
            setDirections(data.directions);
            setPrepTime(data.prepTime);
            setCookTime(data.cookTime);
            setServingCount(data.servingCount);

            var token = localStorage.getItem("authToken");
		    var decoded = jwt_decode(token);
            logged_in_user = decoded.username;
            poster_user = data.username;
            console.log("decoded user:" + decoded.username);
            console.log("logged_in_user:" + logged_in_user);
            console.log("username of poster: " + poster_user);

            if(logged_in_user === poster_user)
            {
                
                console.log("Delete is visible")
                document.getElementById("bookmarkForm").remove();
                document.getElementById("editButtonDiv").style.display="block";
                delVisible = true;
            }

            else
            {
                console.log("delete not visible!");
                delVisible = false;
            }
        
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
									<label for="custom-checkbox"><li><input id="ingredientCheck" class="custom-checkbox custom-control-input:checkedingredCheckBox" type="checkbox" style={{marginRight: '2px'}}/>{p}</li></label>
								))}
                                </ul>
                            </form>
                        </div>
                    </div>
                    <div class="viewRecipeInfo2">
                        <BookmarkButton id="bookmarkButton" username={username}  recipeid={id} />
                        <Link to= {editURL}><EditButton id="editButton"/></Link>
                        <div className="viewRecipeTitle">
                            <span style={{textAlign: 'center', fontSize: '40px', fontWeight: 'bold'}}>{recipeName}</span>
                            <hr/>
                        </div>
                        <hr/>
                        <div className="viewRecipeDesc">
                            <p className="fieldLabel">Description</p>                
                            <form>
                                <span>{desc}</span>
                            </form>
                            <hr/>
                        </div>                       
                        <div className="newRecipeProc">
                            <p className="fieldLabel">Procedure</p>
                            <form>
                                <ol>
                                {directions.map((p) => (
									<li>{p}</li>
								))}
                                </ol>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewRecipe;