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
      <h1 className="Product-header">Popular products</h1>
      {/* <div className="Product-box"> */}
      {products.length > 0 ? (
        <div className="Product-list">
          {products.slice(0, 3).map((product) => (
            <li key={product.id}>
              <div className="Product-container">
                <img
                  className="Product-image"
                  src={product.img}
                  alt={product.img}
                />

                <div className="Product-text">
                  <div className="Product-iconBox">
                    <h2 className="ProductCard-title">{product.title}</h2>

                    <img
                      className={
                        showModal ? "Product-icon rotate" : "Product-icon"
                      }
                      src={"./icons/placeholder.png"}
                      alt="icon"
                      onClick={() => {
                        handleShowText(product.id);
                        setShowModal(!showModal);
                      }}
                    />
                  </div>

                  <hr className="Product-line" />
                  <div className="ProductCard-icon">
                    {/* {selectedProductId === null ? ( */}

                    {selectedProductId === product.id && (
                      <ShowInfoModal
                        subtitle={product.subtitle}
                        shortdescription={product.shortdescription}
                        closeModal={closeModal}
                      />
                    )}

                    {/* // )} */}
                  </div>

                  <h3 className="Product-subtitle">{product.subtitle}</h3>
                  <p className="PopularProduct-shortdescription">
                    {product.shortdescription}
                  </p>
                  <div className="ProductCard-button">
                    <p className="Product-price">{product.price}:-</p>

                    <Link to={`/detailpage/${product.title}`}>
                      <button className="Product-button">View product</button>
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </div>
      ) : null}
      <div className="Product-show-more">
        <Link to={`/productpage`}>
          <button
            className="Product-button"
            onClick={() => setShowText(!showText)}
          >
            View all products
          </button>
        </Link>
      </div>
      {/* </div> */}
    </>
  );
}
