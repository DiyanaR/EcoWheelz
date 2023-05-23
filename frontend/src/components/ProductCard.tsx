import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/ProductCard.css";
import ShowInfoModal from "./ShowInfoModal";

// import "bootstrap/dist/css/bootstrap.min.css";

interface Product {
  id: number;
  title: string;
  subtitle: string;
  shortdescription: string;
  longdescription: string;
  specification: string;
  img: string;
  price: number;
}

export default function ProductsCards() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showText, setShowText] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );

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

  const handleShowText = (productId: number) => {
    setSelectedProductId(productId);
  };

  const closeModal = () => {
    setSelectedProductId(null);
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

                  <div className="Product-text">
                    <div className="ProductCard-icon">
                      <h2 className="Product-title">{product.title}</h2>
                      {selectedProductId === null ? (
                        <div
                          className="Product-iconBox"
                          onClick={() => handleShowText(product.id)}
                        >
                          <img
                            className="Product-icon"
                            src="./icons/placeholder.png"
                            alt="icon"
                          />
                        </div>
                      ) : (
                        <div className="Modal-show">
                          {/* <hr className="Product-line" /> */}
                          {selectedProductId === product.id && (
                            <ShowInfoModal
                              subtitle={product.subtitle}
                              shortdescription={product.shortdescription}
                              closeModal={closeModal}
                            />
                          )}
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
                </div>
              </li>
            ))}
          </ol>
        ) : null}
        <div className="Product-show-more">
          <Link to={`/productpage`}>
            <button
              className="Product-button"
              onClick={() => setShowText(!showText)}
            >
              Show more
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
