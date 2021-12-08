import React, { useState } from "react";
import './EditButton.css';
import EditIcon from '@mui/icons-material/Edit';

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
            <EditIcon id="editRecipe"/>
        </div>
    );
};

export default DeleteButton;