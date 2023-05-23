
import React, { useState, ChangeEvent, useEffect } from "react";
import SearchResults from "./searchResults";
import "../css/SearchBar.css";

interface SearchBarProps {
  onSearch: (searchQuery: string) => void;
}

interface Product {
  id: number;
  title: string;
  subtitle: string;
  price: string;
  shortdescription: string;
  longdescription: string;
  specification: string;
  img: string;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [searchNotFound, setSearchNotFound] = useState(false);

  useEffect(() => {

    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:8080/products?search=${searchQuery}`);
        const data = await response.json();
        setAllProducts(data);
        // setSearchNotFound(data.length === 0);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [searchQuery]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchQuery = event.target.value;
    setSearchQuery(searchQuery);
    performSearch(searchQuery);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    performSearch(searchQuery);
  };




  const performSearch = (searchQuery: string) => {
    if (searchQuery.trim() !== "") {
      const filteredResults = allProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(filteredResults);
      onSearch(searchQuery);
      setSearchNotFound(filteredResults.length === 0);
    } else {
      setResults([]);
      onSearch("");
      setSearchNotFound(false);
    }
  };

  return (
    <form className="search-bar" onSubmit={handleFormSubmit}>
      <input
        type="text"
        id="searchQuery"
        name="searchQuery"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search..."
      />

      {searchNotFound && results.length === 0 && <p>Your search was not found.</p>}
      {/* <div className="search-results-container"> */}
      {/* <div style={{ backgroundColor: "black" }}> */}
      {results.length > 0 && <SearchResults results={results} />}
      {/* </div> */}
    </form>

  );
}

export default SearchBar;
