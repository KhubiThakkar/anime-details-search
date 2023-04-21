import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  function handleSearch(e) {
    e.preventDefault();
    onSearch(searchTerm);
  }

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Enter the keyword"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
