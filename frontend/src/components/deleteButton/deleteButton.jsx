import React, { useState } from "react";
import './DeleteButton.css';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from 'axios';
import { useParams } from "react-router";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router";

function DeleteButton() {

    const {id} = useParams();
    console.log("For del" +id);
    const history = useHistory();
    let token = localStorage.getItem("authToken");
	var decoded = jwt_decode(token);

    const doDeleteFunc = async event => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        try{
            const {data} = await axios.delete(`/api/posts/${id}`,config);
            console.log(data);
            history.push('/home');

        }catch(error) {
            console.log(error.message)
        }
    }

    const deleteConfirm = () =>
    {
        console.log("in del confirm");
        var doDelete = window.confirm("Are you sure you want to delete your recipe? This action cannot be undone.");
        if(doDelete)
        { 
            doDeleteFunc();
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