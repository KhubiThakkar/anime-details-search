import React, { useState } from 'react';
import SearchBar from '../components/searchbar';
import Pagination from "@mui/material/Pagination"; 

function SearchPage() {
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(15);
  const [pagination, setPagination ] = useState([]);
  const [enableResults, setEnableResults ] = useState(0);
  const [searchTerm, setSearchTerm ] = useState('');

  console.log("--------------------------results: ", results)
  console.log("currentPage: ", currentPage)
  console.log("resultsPerPage: ", resultsPerPage)
  console.log("pagination: ", pagination)
  console.log("enableResults: ", enableResults)
  console.log("searchTerm: ", searchTerm)

  async function handleSearch(term) {
    // Hit the API and store the data in state variables
    const response = await fetch(`https://api.jikan.moe/v4/characters?page=${currentPage}&limit=${resultsPerPage}&q=${term}&order_by=favorites&sort=desc`)
    const values = await response.json();
    setResults(values.data);
    setPagination(values.pagination);
    setSearchTerm(term);

    // If there are results fround from the search, only then show the Pagination component
    if (values.pagination.items.total !== 0) {
      setEnableResults(1)
    } else {
      setEnableResults(0)
    }
  }

  async function handlePagination(event, value) {
    // Hit the API and store the data in state variables
    const response = await fetch(`https://api.jikan.moe/v4/characters?page=${value}&limit=${resultsPerPage}&q=${searchTerm}&order_by=favorites&sort=desc`)
    const values = await response.json();
    setResults(values.data);
    setPagination(values.pagination);
    setCurrentPage(value);
  }

  return (
    <div>
      <SearchBar onSearch={handleSearch} />

      {/* This is the part responsible for displaying the results */}
      {results.map((result)=> (
        <a href={result.url} className="button">{result.name}</a>
      ))}
      
      {/* pagination */}
      <div className='pagination-container'>
        {enableResults > 0 ? (
          <Pagination count={pagination.last_visible_page} page={pagination.current_page} onChange={handlePagination} />
        ) : null}
      </div>
    </div>
  );
}

export default SearchPage;
