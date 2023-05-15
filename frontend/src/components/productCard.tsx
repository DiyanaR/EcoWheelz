import React, { useState, useEffect } from "react";
import "../css/ProductCard.css";

interface Product {
  id: number;
  title: string;
  subtitle: string;
  img: string;
  price: number;
}

function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/scooter.json");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {products.length > 0 ? (
        <ol className="Product-list">
          {products.map((product) => (
            <li key={product.id}>
              <div className="Vegetables-container">
                {/* <Link to={`/VegView/${product.name}`}> */}
                <h1>{product.title}</h1>
                <p>{product.subtitle}</p>
                <p>{product.price}</p>
                <img
                  className="Product-image"
                  src={product.img}
                  alt={product.img}
                />
                {/* </Link> */}
              </div>
            </li>
          ))}
        </ol>
      ) : null}
    </>
  );
}

export default Products;
