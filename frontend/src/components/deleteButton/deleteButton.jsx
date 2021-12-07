import React, { useState } from "react";
import './DeleteButton.css';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function DeleteButton() {
    const deleteConfirm = () =>
    {
        console.log("in del confirm");
        var doDelete = window.confirm("Are you sure you want to delete your recipe? This action cannot be undone.");
        if(doDelete)
        {
            console.log("DELETE");
        }

        else
        {
            console.log("no delete");
        }
    };
    return(
        <div id="deleteButtonDiv" onClick = {deleteConfirm}>    
            <DeleteForeverIcon id="deleteRecipe" sx={{color: 'red'}}/>
        </div>
    );
};

export default DeleteButton;