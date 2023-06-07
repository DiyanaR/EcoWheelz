import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/ProductCard.css";
import ShowInfoModal from "../components/ShowInfoModal";

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
  const [showModal, setShowModal] = useState(false);
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
    if (selectedProductId === productId) {
      // Clicked on the same icon, close the modal
      setSelectedProductId(null);
    } else {
      // Clicked on a different icon, show the modal for the selected product
      setSelectedProductId(productId);
    }
  };

  const closeModal = () => {
    setSelectedProductId(null);
  };

  return (
    <>
      <h1 className="product-header">Popular products</h1>
      {products.length > 0 ? (
        <div className="product-list">
          {products.slice(0, 3).map((product) => (
            <li key={product.id}>
              <div className="product-container">
                <img
                  className="product-image"
                  src={product.img}
                  alt={product.img}
                />

                <div className="product-text">
                  <div className="product-iconBox">
                    <h2 className="productCard-title">{product.title}</h2>

                    <img
                      className={
                        showModal ? "product-icon rotate" : "product-icon"
                      }
                      src={"./icons/placeholder.png"}
                      alt="icon"
                      onClick={() => {
                        handleShowText(product.id);
                        setShowModal(!showModal);
                      }}
                    />
                  </div>

                  <hr className="product-line" />
                  <div className="productCard-icon">
                    {selectedProductId === product.id && (
                      <ShowInfoModal
                        subtitle={product.subtitle}
                        shortdescription={product.shortdescription}
                        closeModal={closeModal}
                      />
                    )}
                  </div>

                  <h3 className="product-subtitle">{product.subtitle}</h3>
                  <p className="popularProduct-shortdescription">
                    {product.shortdescription}
                  </p>
                  <div className="productCard-button">
                    <p className="product-price">{product.price}:-</p>

                    <Link to={`/detailpage/${product.title}`}>
                      <button className="product-button">View product</button>
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </div>
      ) : null}
      <div className="product-show-more">
        <Link to={`/productpage`}>
          <button
            className="product-button"
            onClick={() => setShowText(!showText)}
          >
            View all products
          </button>
        </Link>
      </div>
    </>
  );
}
