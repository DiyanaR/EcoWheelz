
import React from "react";

interface SearchResultsProps {
  results: Product[];
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

function SearchResults({ results }: SearchResultsProps) {
  return (
    <div className="search-results">
      {results.map((product) => (
        <div key={product.id} className="product-item">
          <h2>{product.title}</h2>
          <p>{product.subtitle}</p>
          <p>{product.price}</p>
          <p>{product.shortdescription}</p>
          <img src={product.img} alt={product.title} />
        </div>
      ))}
    </div>
  );
}

export default SearchResults;
