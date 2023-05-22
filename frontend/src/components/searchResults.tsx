import React from "react";

interface product {
  id: number;
  name: string;

}

interface SearchResultsProps {
  results: product[];
}

function SearchResults({ results }: SearchResultsProps) {
  return (
    <div>

      <ul>
        {results.map((product) => (
          // <li key={product.id}>{product.name}</li>
          <li key={product.id}>
            <span>{product.name}</span>
            </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchResults;
