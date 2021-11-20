import React from "react";
import "./CreateRecipe.css";
import PageNavbar from "../../components/navbar/PageNavbar.jsx";



const CreateRecipe = () =>
{

    return(
    <div>
        <PageNavbar/>
        <div class="newScreen"> 
        <div class="newRecipe">
        <div class="newInfo1">
            <div class="newRecipeImage">
                <h4><b>Upload Image</b></h4>
                <form>
                    <input type="file" id="myfile" accept=".png, .jpg, .jpeg"/>
                </form>
            </div>
            <hr/>
            <div class="newInfo1Row1">
                <div class="timeField">
                    <h6>Preparation Time</h6>
                    <input type="text" id="timeInput" placeholder="ex. 30 mins"/>
                </div>
                <br/>
                <div class="timeField">
                    <h6>Cooking Time</h6>
                    <input type="text" id="timeInput" placeholder="ex. 30 mins"/>
                </div>
                <br/>
                <div class="timeField">
                    <h6># of Servings</h6>
                    <input type="text" id="timeInput" placeholder="ex. 2 servings"/>
                </div>
            </div>
        </div>
        <div class="newInfo2">
            <div class="newRecipeTitle">
                    <h4><b>Recipe Name</b></h4>
                    <form>
                        <input type="text" id="recipeName" placeholder="Name"/>
                   </form>
                </div>
            <hr/>
            <div className="newRecipeDesc">
                <h4><b>Recipe Description</b></h4>
                <form>
                    <textarea id="recipeDesc" placeholder="Describe your recipe in 150 words!" maxLength="150"/>
                </form>
            </div>
            <hr/>
            <div className="newRecipeIngr">
                <h4><b>Ingredients List</b></h4>
                <form>
                    <textarea id="recipeDesc" placeholder="Place each ingredient on a new line."/>   
                </form>
            </div>
            <hr/>
            <div className="newRecipeProc">
                <h4><b>Procedure</b></h4>
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