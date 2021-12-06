import React from 'react';
import { useHistory } from 'react-router';
import PageNavbar from '../../components/navbar/PageNavbar';
import './Results.css';
import { useParams } from 'react-router';
import axios from "axios";
import { useEffect } from 'react';
import SmallRecipe from '../../components/smallRecipeIcon/smallRecipeCard';
import { useState } from 'react';

const numResults = "46";

const Results = () =>
{
	//const history = useHistory();
	const {searchTerm} = useParams();

	console.log("Search term is: "+searchTerm);// works


	const [posts, setPosts] = useState([]); 
	let numResults;

	const getSearchResults = async event => {
        //event.preventDefault();
        let token = localStorage.getItem("authToken");

        const config = {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            },
        };

        try{
			let url = `api/posts/search/${searchTerm}`;
			
            const {data} = await axios.get(url, config);
			console.log(data);
            setPosts(data); // sets the posts to result from API
			let numResults = data.length;

            console.log(data); // here are all the posts from searching

        }catch(err){
            console.log("NOPE");
        }

    } 

	useEffect(() => {
        getSearchResults();
    },[]);

	return(
		<div id="searchPage">
		<PageNavbar/>
			<div id="searchResults">
				<div id="searchContent">
					<div id="searchTermLeftAlign">
						<div id="searchTermDiv">
							<span id="searchTermSpan">Results for "{searchTerm}"</span>
						</div>
					</div>
					<div id="recipeResults">
						<div id="searchResultsDiv">
							<span id="resultCount">{numResults} Results</span>
						</div>
						<div id="recipeRender">
						{posts.map((p) => (
                            <SmallRecipe key = {p._id} posts = {p}/>
                        ))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Results;