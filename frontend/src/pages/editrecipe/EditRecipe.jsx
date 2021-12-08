import React from 'react';
import './EditRecipe.css';
import PageNavbar from '../../components/navbar/PageNavbar.jsx';
import SamplePic from '../../components/imgs/spoon-and-fork-crossed.jpg'
import { useParams } from 'react-router';
import { useHistory } from 'react-router';
import { useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import BookmarkButton from '../../components/bookmarkbutton/BookmarkButton';
import DeleteButton from '../../components/deleteButton/deleteButton';
import dynamictextarea from 'dynamic-textarea';


const EditRecipe = () =>
{
    const history = useHistory();
    const {id} = useParams();
    let url  = `/recipe/${id}`;
    // required section (need to pass into api as json)
    const [recipeName,setRecipeName] = useState(""); 
    const [temp1,setTemp1] = useState("");
    const [temp2,setTemp2] = useState("");
    const [ingredients,setIngredients] = useState([]);
    const [directions,setDirections] = useState([]);
    const [cookTime,setCookTime] = useState("");
    const [prepTime,setPrepTime] = useState("");
    const [servingCount,setServingCount] = useState("");
    const [desc,setDescription] = useState("");
    const [img,setImg] = useState("");
    const [error,setError] = useState("");

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
            setDescription(data.desc);
               
            setTemp1(splitArrAddNewline(data.ingredients));
            setTemp2(splitArrAddNewlineDirect(data.directions));
            setPrepTime(data.prepTime);
            setCookTime(data.cookTime);
            setServingCount(data.servingCount);
		}catch(error) {
			console.log(error);
		}
	};

    const splitArrAddNewline = (arr) =>
    {
        var arr_newline = arr.join('\n');
        console.log(arr_newline);
        return arr_newline;
    };

    const splitArrAddNewlineDirect = (arr) =>
    {
        var arr_newline = arr.join('\n');
        return arr_newline;
    };

    require( [ "dynamic-textarea" ], function( dynamicTextarea ) {
        console.log("refresh");
        dynamicTextarea.refresh();
    });

    useEffect(() => {
        getPost();
    },[]); 


    const updateChanges = async event =>
    {
        event.preventDefault();

        var token = localStorage.getItem("authToken");
		var decoded = jwt_decode(token);
        
		const config = {
			headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("authToken")}`,
			},
		};

       try {
            //console.log("Updated name: "+ recipeName);
            //console.log("Updated desc: "+ desc);
    
            const ingredients = temp1.split('\n');

            const directions = temp2.split('\n');


		    const {data} = await axios.put(`/api/posts/${id}`,{recipeName, desc, ingredients, directions, prepTime,cookTime, servingCount},config);
            history.push(url);
           
		}catch(error) {
			console.log(error.message);
		}
        
    }

    return(
        <div>
        <PageNavbar/>
        <div id="editRecipeScreen"> 
            <div id="recipeDisplay">
                <div id="recipeIntake">
                    <div className="newInfo1">
                        <div className="newRecipeImage">
                            <p className="fieldLabel">Upload Image</p>
                            <label for="recipeImage">
                                <img alt ="pic upload" height="200" src={SamplePic}/>
                            </label>
                            <input id="recipeImage" type="file" accept=".png, .jpg, .jpeg" style={{display:'none'}}/>
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
                                <input type="text" id="timeInput" placeholder="ex. 1h 30 mins" value={cookTime} onChange={(e) => setCookTime(e.target.value)}/>
                            </div>
                            <br/>
                            <div className="timeField">
                                <p className="fieldLabel">Number of servings</p>
                                <input type="text" id="timeInput" placeholder="ex. 4 servings" value={servingCount} onChange={(e) => setServingCount(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                    <div className="newInfo2">
                        <div id="deleteButtonEdit">
                             <DeleteButton/>
                        </div>
                        <div className="newRecipeTitle">
                            <p className="fieldLabel">Recipe Title</p>
                                <form>
                                    <input type="text" id="recipeName" placeholder="Title" required value={recipeName} onChange={(e) => setRecipeName(e.target.value)}/>
                               </form>
                            </div>
                        <hr/>
                        <div className="newRecipeDesc">
                            <p className="fieldLabel">Recipe Description</p>                
                            <form>
                                <textarea data-dynamic id="editRecipeDesc" placeholder="Describe your recipe in 150 words!" maxLength="150" value={desc} onChange={(e) => setDescription(e.target.value)}/>
                            </form>
                        </div>
                        <hr/>
                        <div className="newRecipeIngr">
                            <p className="fieldLabel">Ingredients List</p>
                            <form>
                                <textarea data-dynamic id="editRecipeIngreds" placeholder="Place each ingredient on a new line." required value={temp1} onChange={(e) => setTemp1(e.target.value)}/>   
                            </form>
                        </div>
                        <hr/>
                        <div className="newRecipeProc">
                            <p className="fieldLabel">Procedure</p>
                            <form>
                                <textarea data-dynamic id="editRecipeDirects" placeholder="Describe the procedure for creating your recipe! Place each step on a new line." required value={temp2} onChange={(e) => setTemp2(e.target.value)}/>
                            </form>
                        </div>            
                    </div>
                </div>
                <button id="submitButton" onClick={updateChanges}>Submit</button>
            </div>
       </div>
   </div>

    );
}

export default EditRecipe;