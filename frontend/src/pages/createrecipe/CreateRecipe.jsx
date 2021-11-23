import React from "react";
import "./CreateRecipe.css";
import PageNavbar from "../../components/navbar/PageNavbar.jsx";
import imageUpload from "../../components/imgs/uploadbutton.JPG";



const CreateRecipe = () =>
{

    return(
    <div>
        <PageNavbar/>
        <div class="newScreen"> 
        <div class="newRecipe">
        <div class="newInfo1">
            <div class="newRecipeImage">
                <p class="fieldLabel">Upload Image</p>
                <label for="recipeImage">
                    <img id="image" height="200" src={imageUpload}/>
                </label>
                <input id="recipeImage" type="file" accept=".png, .jpg, .jpeg"/>
            </div>
            <hr/>
            <div class="newInfo1Row1">
                <div class="timeField">
                    <p class="fieldLabel">Preparation Time</p>
                    <input type="text" id="timeInput" placeholder="ex. 30 mins"/>
                </div>
                <br/>
                <div class="timeField">
                    <p class="fieldLabel">Cooking Time</p>
                    <input type="text" id="timeInput" placeholder="ex. 30 mins"/>
                </div>
                <br/>
                <div class="timeField">
                    <p class="fieldLabel">Number of servings</p>
                    <input type="text" id="timeInput" placeholder="ex. 2 servings"/>
                </div>
            </div>
        </div>
        <div class="newInfo2">
            <div class="newRecipeTitle">
                <p class="fieldLabel">Recipe Title</p>
                    <form>
                        <input type="text" id="recipeName" placeholder="Name"/>
                   </form>
                </div>
            <hr/>
            <div className="newRecipeDesc">
                <p class="fieldLabel">Recipe Description</p>                
                <form>
                    <textarea id="recipeDesc" placeholder="Describe your recipe in 150 words!" maxLength="150"/>
                </form>
            </div>
            <hr/>
            <div className="newRecipeIngr">
                <p class="fieldLabel">Ingredients List</p>
                <form>
                    <textarea id="recipeDesc" placeholder="Place each ingredient on a new line."/>   
                </form>
            </div>
            <hr/>
            <div className="newRecipeProc">
                <p class="fieldLabel">Procedure</p>
                <form>
                    <textarea id="recipeDesc" placeholder="Describe the procedure for creating your recipe! Try to place each step on a new line."/>
                </form>
            </div>
        </div>
        </div>
        </div>
    </div>

    );
};





export default CreateRecipe;