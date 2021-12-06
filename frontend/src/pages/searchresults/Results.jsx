import React from 'react';
import PageNavbar from '../../components/navbar/PageNavbar';
import './Results.css';

const searchTerm = "chicken";
const numResults = "46";

const Results = () =>
{
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
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Results;