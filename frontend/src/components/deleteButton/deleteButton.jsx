import React, { useState } from "react";
import './DeleteButton.css';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function DeleteButton() {

    return(
        <div>    
            <DeleteForeverIcon id="deleteRecipe"/>
        </div>
    );
};

export default DeleteButton;