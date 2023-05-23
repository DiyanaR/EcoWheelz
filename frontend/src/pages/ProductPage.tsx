import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CarouselTest from "../components/CarouselTest";
import Carousel from "react-bootstrap/Carousel";
// import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "../css/ProductPage.css";
import "../css/ProductCard.css";

interface Product {
  id: number;
  title: string;
  subtitle: string;
  shortdescription: string;
  longdescription: string;
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

  // const handleShowText = () => {
  //   setShowText(!showText);
  // };

  return (
    <>
      <div className="ProductPage-box">
        {products.length > 0 ? (
          <ol className="ProductPage-list">
            {products.map((product) => (
              <li key={product.id}>
                <div className="ProductPage-container">
                  <div>
                    <img
                      className="ProductPage-image"
                      src={product.img}
                      alt={product.img}
                    />
                  </div>

                  {/* <Link to={`/VegView/${product.name}`}> */}
                  <div className="ProductPage-info">
                    <div className="ProductPage-text">
                      <div className="ProductCardPage-icon">
                        <h1 className="Product-title">{product.title}</h1>
                        <h2>{product.subtitle}</h2>
                        <p>{product.shortdescription}</p>

                        {/* <div onClick={handleShowText}>
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
                        )} */}
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
