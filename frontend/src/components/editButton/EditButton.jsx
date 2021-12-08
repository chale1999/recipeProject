import React, { useState } from "react";
import './EditButton.css';
import EditIcon from '@mui/icons-material/Edit';

function DeleteButton() {
    return(
        <div id="editButtonDiv">    
            <EditIcon id="editRecipe"/>
        </div>
    );
};

export default DeleteButton;