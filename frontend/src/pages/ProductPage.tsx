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
        const response = await fetch("/scooter.json");
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
      <div className="Product-box">
        {products.length > 0 ? (
          <ol className="Product-list">
            {products.map((product) => (
              <li key={product.id}>
                <div className="Product-container">
                  <img
                    className="Product-image"
                    src={product.img}
                    alt={product.img}
                  />

                  {/* <Link to={`/VegView/${product.name}`}> */}
                  <div>
                    <div className="Product-text">
                      <hr className="Product-line" />
                      <div className="ProductCard-icon">
                        <h1 className="Product-title">{product.title}</h1>

                        <button onClick={handleShowText}>
                          <img
                            className="Product-icon"
                            src="./icons/placeholder.png"
                            alt="icon"
                          />
                        </button>

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
