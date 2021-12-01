import React from 'react';
import './ViewRecipe.css';
import PageNavbar from '../../components/navbar/PageNavbar.jsx';
import SamplePic from '../../components/imgs/food.jpg'

const ViewRecipe = () =>{
    return(
        <div>
            <PageNavbar/>
            <div class="viewRecipePage">
                <div class="viewRecipeContainer">
                    <div className="viewRecipeInfo1">
                        <img id="image" alt ="pic upload" height="200" src={SamplePic}/>
                        <hr/>
                        <div className="timeField">
                            <p className="fieldLabel">Preparation Time</p>
                            <span>30 mins.</span>
                        </div>
                        <br/>
                        <div className="timeField">
                            <p className="fieldLabel">Cooking Time</p>
                            <span>30 mins.</span>
                        </div>
                        <br/>
                        <div className="timeField">
                            <p className="fieldLabel">Number of servings</p>
                            <span>2 servings</span>
                        </div>
                    </div>
                    <div class="viewRecipeInfo2">
                        <div className="viewRecipeTitle">
                            <p className="fieldLabel">Recipe Title</p>
                            <form>
                                <span>Sample Title</span>
                            </form>
                        </div>
                        <hr/>
                        <div className="viewRecipeDesc">
                            <p className="fieldLabel">Recipe Description</p>                
                            <form>
                                <span>Sample Description</span>
                            </form>
                        </div>
                        <hr/>
                        <div className="newRecipeIngr">
                            <p className="fieldLabel">Ingredients List</p>
                            <form>
                                <span>Sample Ingredients</span>
                            </form>
                        </div>
                        <hr/>
                        <div className="newRecipeProc">
                            <p className="fieldLabel">Procedure</p>
                            <form>
                                <span>Sample Procedure</span>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewRecipe;