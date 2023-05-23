import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CarouselTest from "../components/CarouselTest";
import Carousel from "react-bootstrap/Carousel";
// import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "../css/ProductPage.css";

interface Product {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  img: string;
  price: number;
}

function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleShowText = () => {
    setShowText(!showText);
  };

  return (
    <>
      <div className="ProductPage-box">
        {products.length > 0 ? (
          <ol className="Product-list">
            {products.map((product) => (
              <li key={product.id}>
                <div className="ProductPage-container">
                  <img
                    className="Product-image"
                    src={product.img}
                    alt={product.img}
                  />

                  {/* <Link to={`/VegView/${product.name}`}> */}
                  <div>
                    <div className="Product-text">
                      <div className="ProductCard-icon">
                        <h1 className="Product-title">{product.title}</h1>

                        <div onClick={handleShowText}>
                          <img
                            className="Product-icon"
                            src="./icons/placeholder.png"
                            alt="icon"
                          />
                        </div>

                        {showText && (
                          <div>
                            {<p>{product.subtitle}</p>}
                            {
                              <p className="Product-description">
                                {product.description}
                              </p>
                            }
                          </div>
                        )}
                      </div>

                      <div className="ProductCard-button">
                        <p className="Product-price">{product.price}</p>
                        <Link to={`/detailpage/${product.title}`}>
                          <hr className="Product-line" />
                          <button className="Product-button">
                            View product
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* </Link> */}
                </div>
              </li>
            ))}
          </ol>
        ) : null}

        {/* {visibleProduct < products.length && ( */}
        <div className="Product-show-more"></div>
        {/* )} */}
      </div>
    </>
  );
}

export default ProductPage;
