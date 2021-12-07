import React, { useState } from "react";
import './BookmarkButton.css';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkIcon from '@mui/icons-material/Bookmark';

function BookmarkButton() {

    const [isBookmarked, setBookmarked] = useState(false);

    const bookmarkTemplate = (
        <form id="bookmarkForm"  onClick={() => setBookmarked(true)}>
            <BookmarkAddIcon id="addBookmark"/>
        </form>
    );

    const bookmarkedTemplate = (
        <form id="bookmarkedForm"  onClick={() => setBookmarked(false)}>
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