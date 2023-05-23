
import React, { useState, ChangeEvent, useEffect } from "react";
import "../css/SearchBar.css";
import { Link } from "react-router-dom";
// import SearchResults from "./searchResults";


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
  // const [searchNotFound, setSearchNotFound] = useState(false);



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



  const performSearch = (searchQuery: string) => {
    if (searchQuery.trim() !== "") {
      const filteredResults = allProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(filteredResults);
      onSearch(searchQuery);
      // setSearchNotFound(searchQuery.length >= 2 &&  filteredResults.length === 0);
    } else {
      setResults([]);
      onSearch("");
      // setSearchNotFound(false);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchQuery = event.target.value;
    setSearchQuery(searchQuery);
    if (searchQuery.length >= 2) {
    performSearch(searchQuery);
  }else {
    setResults([]);
    onSearch("");
    // setSearchNotFound(false);
  }
};


  const handleLinkClick = () => {
    setResults([]);
    setSearchQuery("");
  };



return (
  <>
    <form className="search-bar">
      <input
        type="text"
        id="searchQuery"
        name="searchQuery"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search..."
      />

      {searchQuery && searchQuery.length >= 2 && (
        <div className="dropdown-menu">
          {results.length > 0 ? (
            results.map((product) => (
              <Link
                key={product.id}
                to={`/detailpage/${product.title}`}
                className="dropdown-item"
                onClick={handleLinkClick}
              >
                <img
                  src={product.img}
                  alt={product.title}
                  className="product-image"
                />
                <div className=" product-info">
                  <h3>{product.title}</h3>
                  <p>{product.subtitle}</p>
                </div>
              </Link>
            ))
          ) : (
            <p className="dropdown-item">Your search was not Found</p>
          )}
        </div>
      )}
      {/* {searchNotFound && results.length === 0 && (
        <p className="dropdown-item">Your search was not found.</p>
      )} */}
    </form>
  </>
);
}

export default SearchBar;
