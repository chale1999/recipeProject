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
    // required section (need to pass into api as json)
    const [recipeName,setRecipeName] = useState(""); 
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
               
            setIngredients(splitArrAddNewline(data.ingredients));
            console.log("ingreds: " + ingredients);
            setDirections(splitArrAddNewlineDirect(data.directions));
            setPrepTime(data.prepTime);
            setCookTime(data.cookTime);
            setServingCount(data.servingCount);
		}catch(error) {
			console.log(error);
		}
	};

    const splitArrAddNewline = (arr) =>
    {
        var arr_newline = arr.join('\r\n');
        console.log(arr_newline);
        return arr_newline;
    };

    const splitArrAddNewlineDirect = (arr) =>
    {
        var arr_newline = arr.join('\r\n');
        return arr_newline;
    };

    const descOnChange = (val) =>
    {
        setDescription(val);
    };  

    require( [ "dynamic-textarea" ], function( dynamicTextarea ) {
        console.log("refresh");
        dynamicTextarea.refresh();
    });

    useEffect(() => {
        getPost();
    },[]); 

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
                                <textarea data-dynamic id="editRecipeIngreds" placeholder="Place each ingredient on a new line." required value={ingredients} onChange={(e) => setIngredients(e.target.value)}/>   
                            </form>
                        </div>
                        <hr/>
                        <div className="newRecipeProc">
                            <p className="fieldLabel">Procedure</p>
                            <form>
                                <textarea data-dynamic id="editRecipeDirects" placeholder="Describe the procedure for creating your recipe! Place each step on a new line." required value={directions} onChange={(e) => setDirections(e.target.value)}/>
                            </form>
                        </div>            
                    </div>
                </div>
                <button id="submitButton">Submit</button>
            </div>
       </div>
   </div>

    );
}

export default EditRecipe;