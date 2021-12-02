import React from "react";
import { useState } from 'react';
import axios from "axios";
import "./CreateRecipe.css";
import { useHistory } from "react-router-dom";
import PageNavbar from "../../components/navbar/PageNavbar.jsx";
import imageUpload from "../../components/imgs/uploadbutton.JPG";
import setRef from "@mui/utils/setRef";



const CreateRecipe = () =>
{
    const history = useHistory();
    // required section (need to pass into api as json)
    const [recipeName,setrecipeName] = useState(""); 
    const [temp,setIngedients] = useState("");
    const [temptwo,setDirections] = useState("");

    

   // const ingredients = temp.split('\n');
    //console.log(test);

    // optional section ( if not filled out will just be empty string which is fine to pass into api)
    const [cookTime,setcookTime] = useState("");
    const [prepTime,setPrepTime] = useState("");
    const [servingCount,setServingCount] = useState("");
    const [desc,setDesc] = useState("");
    const [img,setImg] = useState("");

    const [error,setError] = useState("");


    //console.log(recipeName);
    //console.log(directions);
    //console.log(cookTime);
    //console.log(ingredients);
    //console.log(prepTime);
    //console.log(servingCount);
    //console.log(desc);
    //console.log(img);

    const doCreateRecipe = async event =>     
    {   
        event.preventDefault();
        const config = {
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        };

		try {
            const ingredients = temp.split('\n');
            const directions = temptwo.split('\n');
			const {data} = await axios.post("api/posts", {recipeName, ingredients, directions, cookTime, prepTime, servingCount, desc, img},
			config);

            history.push('/home');


		}catch(error) {
			setError(error.response.error);
            //setError("Error Creating Recipe");
		}
        
        
    };   

    return(
    <div>
        <PageNavbar/>
        <div className="newScreen"> 
        <div className="newRecipe">
        <div className="newInfo1">
            <div clasclassNames="newRecipeImage">
                <p className="fieldLabel">Upload Image</p>
                <label for="recipeImage">
                    <img id="image" alt ="pic upload" height="200" src={imageUpload}/>
                </label>
                <input id="recipeImage" type="file" accept=".png, .jpg, .jpeg"/>
            </div>
            <hr/>
            <div className="newInfo1Row1">
                <div className="timeField">
                    <p className="fieldLabel">Preparation Time</p>
                    <input type="text" id="timeInput" placeholder="ex. 30 mins" value={prepTime} onChange={(e) => setPrepTime(e.target.value)}/>
                </div>
                <br/>
                <div className="timeField">
                    <p className="fieldLabel">Cooking Time</p>
                    <input type="text" id="timeInput" placeholder="ex. 30 mins" value={cookTime} onChange={(e) => setcookTime(e.target.value)}/>
                </div>
                <br/>
                <div className="timeField">
                    <p className="fieldLabel">Number of servings</p>
                    <input type="text" id="timeInput" placeholder="ex. 2 servings" value={servingCount} onChange={(e) => setServingCount(e.target.value)}/>
                </div>
            </div>
        </div>
        <div className="newInfo2">
            <div className="newRecipeTitle">
                <p className="fieldLabel">Recipe Title</p>
                    <form>
                        <input type="text" id="recipeName" placeholder="Name" required value={recipeName} onChange={(e) => setrecipeName(e.target.value)}/>
                   </form>
                </div>
            <hr/>
            <div className="newRecipeDesc">
                <p className="fieldLabel">Recipe Description</p>                
                <form>
                    <textarea id="recipeDesc" placeholder="Describe your recipe in 150 words!" maxLength="150" value={desc} onChange={(e) => setDesc(e.target.value)}/>
                </form>
            </div>
            <hr/>
            <div className="newRecipeIngr">
                <p className="fieldLabel">Ingredients List</p>
                <form>
                    <textarea id="recipeDesc" placeholder="Place each ingredient on a new line." required value={temp} onChange={(e) => setIngedients(e.target.value)}/>   
                </form>
            </div>
            <hr/>
            <div className="newRecipeProc">
                <p className="fieldLabel">Procedure</p>
                <form>
                    <textarea id="recipeDesc" placeholder="Describe the procedure for creating your recipe! Try to place each step on a new line." required value={temptwo} onChange={(e) => setDirections(e.target.value)}/>
                </form>
            </div>
            <button id="submitButton" onClick={doCreateRecipe}>Submit</button>
            
        </div>
        </div>
        </div>
        
    </div>

    );
};





export default CreateRecipe;