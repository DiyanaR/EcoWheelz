import React, { useState, ChangeEvent, useEffect } from "react";
// import SearchResults from "./searchResults";
import "../css/SearchBar.css";


function SearchBar() {

  return (
    <form className="search-bar" >
      <input
        type="text"
        // value={searchQuery}
        // onChange={handleInputChange}
        placeholder="Search..."
      />


    </form>
  );
}

export default SearchBar;
