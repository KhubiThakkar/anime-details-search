import React, { useState } from 'react';
import debounce from 'lodash/debounce';
import Pagination from "@mui/material/Pagination"; 

function SearchTextBox () {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [totalResults, setTotalResults] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  console.log("-------------results: ", results)
  console.log("totalResults: ", totalResults)
  console.log("lastPage: ", lastPage)

  const fetchResults = (value, pagenumber) => {
    // Here you can make an API call to retrieve the search results based on the user's query
    fetch(`https://api.jikan.moe/v4/characters?q=${value}&page=${pagenumber}&limit=15&order_by=favorites&sort=desc`)
      .then(response => response.json())
      .then(values => {
        setResults(values.data)
        setTotalResults(values.pagination.items.total)
        setLastPage(values.pagination.last_visible_page)
      })
      .catch(error => console.log(error));
  }

  const debouncedFetchResults = debounce(fetchResults, 1000);

  const handleChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    setCurrentPage(1);
    // Here we're using the debouncedFetchResults function to delay the API call by 1s
    // the API doesn't work because it has a limit for 3 API calls in a minute, therefore type slowly
    debouncedFetchResults(value, 1);
  };

  const handlePagination = (event, pageValue) => {
    setCurrentPage(pageValue)
    debouncedFetchResults(query, pageValue);
  }

  return (
    <div>
      <input 
        type="text" 
        value={query}
        placeholder='Search the Anime...'
        onChange={handleChange} />

      { totalResults > 0 ? (
        results.map(result => (
          <a 
            href={result.url} 
            key={result.mal_id}
            className="button"> {result.name} </a>
        ))
      ) : (
        <div className='alertmessage'>ALERT! No results found</div>
      )}

      <div className='pagination-container'>
        {totalResults > 0 ? (
          <Pagination count={lastPage} page={currentPage} onChange={handlePagination} />
        ) : null}
      </div>
      
    </div>
  );
}

export default SearchTextBox;