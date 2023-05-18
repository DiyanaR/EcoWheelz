import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/ProductCard.css";

interface Product {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  img: string;
  price: number;
}

export default function ProductsCards() {
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
      <h1 className="Product-header">Our products</h1>
      <div className="Product-box">
        {products.length > 0 ? (
          <ol className="Product-list">
            {products.slice(0, 3).map((product) => (
              <li key={product.id}>
                <div className="Product-container">
                  <img
                    className="Product-image"
                    src={product.img}
                    alt={product.img}
                  />

                  {/* <Link to={`/VegView/${product.name}`}> */}
                  <div className="Product-text">
                    <hr className="Product-line" />
                    <div className="ProductCard-icon">
                      <h2 className="Product-title">{product.title}</h2>

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
                        <button className="Product-button">View product</button>
                      </Link>
                    </div>
                  </div>

                  {/* </Link> */}
                </div>
              </li>
            ))}
          </ol>
        ) : null}
        {/* {visibleProduct < products.length && ( */}
        <div className="Product-show-more">
          <Link to={`/productpage`}>
            <button className="Product-button" onClick={handleShowText}>
              Show more
            </button>
          </Link>
        </div>
        {/* )} */}
      </div>
    </>
  );
}
