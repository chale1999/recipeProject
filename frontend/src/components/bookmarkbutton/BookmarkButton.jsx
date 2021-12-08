import React, { useState } from "react";
import './BookmarkButton.css';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useParams } from 'react-router';
import axios from "axios";
import { useHistory } from "react-router";
import {useEffect } from 'react';
import jwt_decode from "jwt-decode";

function BookmarkButton({username,recipeid}) {


    const history = useHistory();
    const [isBookmarked, setBookmarked] = useState(false);
    const [bookmarkList, setBookmarkList] = useState([]);


    const getUserdata = async event => {
        
        let token = localStorage.getItem("authToken");
		var decoded = jwt_decode(token);

		const config = {
			headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
			},
		};
		 try {
			const {data} = await axios.get(`/api/users/${username}`,config);
            setBookmarkList(data.bookmarks);
            console.log(bookmarkList)
		 } catch(error) {
			console.log(error.message);
		 }
        
    };

    
    const checkBookmarks = async event => {
        if(bookmarkList.includes(recipeid))
        {
            console.log("Is bookmarked")
            setBookmarked(true);
        }
        else
        {
            setBookmarked(false);
            console.log("Is NOT bookmarked")
        }
    }
    

    const doBookmark = async event => {
        //event.preventDefault();
        let token = localStorage.getItem("authToken");
		var decoded = jwt_decode(token);

		const config = {
			headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
			},
		};
		 try {
			const {data} = await axios.put(`/api/users/${recipeid}/bookmark`,{},config);
            setBookmarked(true);
            history.push('/bookmarks');
		 } catch(error) {
			console.log(error.message);
		 }
    }

    const doUnBookmark = async event => {
        //event.preventDefault();
        let token = localStorage.getItem("authToken");
		var decoded = jwt_decode(token);

		const config = {
			headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
			},
		};
		 try {
			const {data} = await axios.put(`/api/users/${recipeid}/unbookmark`,config);
            setBookmarked(false);
            history.push('/bookmarks');
		 } catch(error) {
			console.log(error.message);
		 }
    }

    useEffect(() => {
        checkBookmarks();
        getUserdata();
    },[isBookmarked]);

    const bookmarkTemplate = (
        <form id="bookmarkForm"  onClick={() => doBookmark()}>
            <BookmarkAddIcon id="addBookmark"/>
        </form>
    );

    const bookmarkedTemplate = (
        <form id="bookmarkedForm"  onClick={() => doUnBookmark()}>
            <BookmarkIcon id="addBookmark"/>
        </form>
    );

    return(
        <div>
            {isBookmarked ?
                <button class="bookmarkedButton">
                    {bookmarkedTemplate}
                </button>
            :
                <button class="bookmarkButton">
                    {bookmarkTemplate}
                </button>
            }
        </div>
    );
};

export default BookmarkButton;