import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../css/ProductPage.css";
import "../css/ProductCard.css";
import ShowInfoModal from "../components/ShowInfoModal";
import SearchBar from "../components/SearchBar";
import { ReactComponent as Arrowicon } from "../assets/arrow.svg";

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
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [showMore, setShowMore] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );
  const [showModal, setShowModal] = useState(true);
  const categoriesRef = useRef<HTMLDivElement>(null);

  const handletopClick = () => {
    if (categoriesRef.current) {
      categoriesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSearch = (searchTerm: string) => {};

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

  useEffect(() => {
    if (showMore) {
      setVisibleProducts(products);
    } else {
      setVisibleProducts(products.slice(0, 3));
    }
  }, [showMore, products]);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

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
      <div className="productPage-box">
        <div className="desktop-serachbar">
          <SearchBar onSearch={handleSearch} />
        </div>
        <div ref={categoriesRef}>
          {products.length > 0 ? (
            <ol className="productPage-list">
              {visibleProducts.map((product) => (
                <li key={product.id}>
                  <div className="productPage-container">
                    <img
                      className="productPage-image"
                      src={product.img}
                      alt={product.img}
                    />

                    <div className="productPage-info">
                      <div className="productPage-text">
                        <div className="productCardPage-icon">
                          <h1 className="productPage-title">{product.title}</h1>
                          <img
                            className={
                              selectedProductId === product.id
                                ? "product-icon rotate"
                                : "product-icon"
                            }
                            src="./icons/placeholder.png"
                            alt="icon"
                            onClick={() => handleShowText(product.id)}
                          />
                        </div>
                        <hr className="product-line" />
                        {showModal && (
                          <div className="modal-show">
                            {selectedProductId === product.id && (
                              <ShowInfoModal
                                subtitle={product.subtitle}
                                shortdescription={product.shortdescription}
                                closeModal={closeModal}
                              />
                            )}
                          </div>
                        )}
                        <h2 className="subtitle">{product.subtitle}</h2>
                        <p className="short-description">
                          {product.shortdescription}
                        </p>

                        <div className="productPage-button">
                          <p className="product-price">{product.price}:-</p>
                          <Link to={`/detailpage/${product.title}`}>
                            <button className="product-button">
                              View product
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          ) : null}
        </div>
        <div className="product-show-more">
          <Link to={`/productpage`}>
            {!showMore && (
              <button className="product-button" onClick={handleShowMore}>
                View more
              </button>
            )}
          </Link>
        </div>

        <div className="arrow-container">
          <button className="top-to-btm" onClick={handletopClick}>
            <span className="button-content">
              <Arrowicon className="arrow-icon" />
            </span>
          </button>
        </div>
      </div>
    </>
  );
}

export default ProductPage;
