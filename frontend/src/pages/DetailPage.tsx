import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/DetailPage.css";
import "../css/ProductCard.css";
import { useParams } from "react-router-dom";
import { useRef } from "react";
import SearchBar from "../components/SearchBar";
import { Cart, ShopContext } from "../components/ContextProvider";
import { ReactComponent as Arrowicon } from "../assets/arrow.svg";

interface Product {
  id: number;
  title: string;
  subtitle: string;
  shortdescription: string;
  longdescription: string;
  specification: string;
  img: string;
  price: string;
}

export default function DetailPage() {
  // const { id } = useParams<{ id: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product[]>([]);
  const [cartNotif, setCartNotif] = useState(false);
  const [filteredProduct, setFilteredProduct] = useState<Product[]>([]);
  const { title } = useParams<{ title: string }>();
  const [rating, setRating] = useState(0);

  const {
    cartContext: { cartProducts, setCartProducts },
  } = useContext(ShopContext);

  const handleSearch = (searchTerm: string) => {
    //     console.log("Sökt:", searchTerm);
  };

  const categoriesRef = useRef<HTMLDivElement>(null);

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
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/products/${title}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [title]);

  useEffect(() => {
    if (products.length > 0 && title) {
      const filteredProduct = products.filter(
        (product) => product.title === title
      );
      setFilteredProduct(filteredProduct);
    }
  }, [products, title]);

  const handletopClick = () => {
    if (categoriesRef.current) {
      categoriesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  function addProductToCart() {
    // Just incase the product isn't loaded
    if (product && cartProducts) {
      const { id, title, subtitle, price, img } = product[0];

      let duplicateItemValidation = false;

      const dubplicateItemCheck = cartProducts.map((cartItem) => {
        if (cartItem.id === id) {
          cartItem.quantity++;
          duplicateItemValidation = true;
        }

        return cartItem;
      });

      if (duplicateItemValidation) {
        setCartProducts(dubplicateItemCheck);
      } else {
        setCartProducts([
          ...cartProducts,
          {
            id,
            title,
            subtitle,
            price: Number(price.replace(".", "")),
            img,
            quantity: 1,
          },
        ]);
      }

      // trigger cart notfication
      setCartNotif(true);

      setTimeout(() => {
        setCartNotif(false);
      }, 2000);
    }
  }

  return (
    <>
      <div ref={categoriesRef}>
        {filteredProduct.length > 0 && (
          <div id="top " className="DetailPage-box">
            <div className="desktop-serachbar">
              <SearchBar onSearch={handleSearch} />
            </div>
            <div className="DetailPage-info">
              <img
                className="DetailPage-image"
                src={filteredProduct[0].img}
                alt={filteredProduct[0].title}
              />
              <div className="DetailPage-text">
                <div className="DetailPage-shortText">
                  <h1>
                    {filteredProduct[0].title.charAt(0).toUpperCase() +
                      filteredProduct[0].title.slice(1)}
                  </h1>
                  <p>{filteredProduct[0].subtitle}</p>
                  <p>{filteredProduct[0].longdescription}</p>
                  <h2>{filteredProduct[0].price}:-</h2>
                  <div className="DetailPage-container">
                    <div>
                      {[1, 2, 3, 4, 5].map((value) => (
                        <span
                          key={value}
                          style={{
                            cursor: "pointer",
                            marginRight: "5px",
                            color: value <= rating ? "#9ae5bd" : "gray",
                          }}
                          onClick={() => setRating(value)}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    {/* <img src="../icons/stars.png" alt="icon" /> */}
                    <button
                      onClick={addProductToCart}
                      className="Product-button"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="container-specification">
              <div className="Specification-header">
                <h2>Specifikations</h2>
              </div>
              <ul>
                {filteredProduct[0].specification
                  .split(",")
                  .map((spec, index) => (
                    <li key={index}>{spec}</li>
                  ))}
              </ul>
            </div>

            <h1 className="Product-header">Popular products</h1>
            {products.length > 0 ? (
              <ol className="DetailPage-list">
                {products.slice(0, 2).map((product) => (
                  <li key={product.id}>
                    <div className="OtherProduct-container">
                      <img
                        className="OtherProduct-image"
                        src={product.img}
                        alt={product.img}
                      />

                      <div className="OtherProduct-text">
                        <h2 className="Product-title">{product.title}</h2>
                        <h3>{product.subtitle}</h3>
                        <p className="OtherProduct-shortdescription">
                          {product.shortdescription}
                        </p>

                        <div className="OtherProductCard-button">
                          <p className="Product-price">{product.price}:-</p>
                          <Link
                            to={`/detailpage/${product.title}`}
                            onClick={handletopClick}
                          >
                            <button className="Product-button">
                              View product
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            ) : null}
          </div>
        )}
      </div>
      <div className="arrow-container">
        <button className="top-to-btm" onClick={handletopClick}>
          <span className="button-content">
            <Arrowicon className="arrow-icon" />
          </span>
        </button>
      </div>

      {filteredProduct[0]?.title && cartNotif && (
        <div className="cart-notification">
          {filteredProduct[0]?.title} has been added to your cart
        </div>
      )}
    </>
  );
}
