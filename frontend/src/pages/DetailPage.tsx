import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/DetailPage.css";
import "../css/ProductCard.css";
import { useParams } from "react-router-dom";
import { useRef } from "react";
import SearchBar from "../components/SearchBar";

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

export default function DetailPage() {
  // const { id } = useParams<{ id: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product[]>([]);

  const [filteredProduct, setFilteredProduct] = useState<Product[]>([]);
  // const title = products.length > 0 ? products[0].title : "";
  const { title } = useParams<{ title: string }>();
  const productRef = useRef<HTMLDivElement>(null);

  const handleSearch = (searchTerm: string) => {
    //     console.log("Sökt:", searchTerm);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/products");
        const data = await response.json();
        console.log(data);
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
        console.log(data);
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
    console.log(products);
    console.log(filteredProduct);
    console.log(title);
  }, [products, title]);

  const handleClickProduct = () => {
    if (productRef.current) {
      productRef.current.scrollIntoView({ behavior: "smooth" });
      window.scrollTo(0, 0);
    }
  };

  // const addProduct = () => {
  //   const result = [];
  //   result.push(products);
  // };

  return (
    <>
      {filteredProduct.length > 0 && (
        <div id="top " className="DetailPage-box">
          <div className="DetailPage-info">
            <img
              className="DetailPage-image"
              src={filteredProduct[0].img}
              alt={filteredProduct[0].img}
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
                  <img src="../icons/stars.png" alt="icon" />
                  <button className="Product-button">Add to Bag</button>
                </div>
              </div>
            </div>
          </div>

          <div className="container-specification">
            {/* <div className="specification-wrapper"> */}
            <div className="Specification-header">
              <h2>Specifikations</h2>
            </div>
            <ul>
              <li>
                {filteredProduct[0].specification.split(",").map((spec) => (
                  <li>{spec}</li>
                ))}
              </li>
            </ul>
            {/* </div> */}
          </div>

          <h1 className="Product-header">Other products</h1>
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
                      {/* <div className="OtherProductCard-icon"> */}
                      <h2 className="Product-title">{product.title}</h2>
                      <h3>{product.subtitle}</h3>
                      <p className="OtherProduct-shortdescription">
                        {product.shortdescription}
                      </p>
                      {/* </div> */}

                      <div className="OtherProductCard-button">
                        <p className="Product-price">{product.price}:-</p>
                        <Link
                          to={`/detailpage/${product.title}`}
                          onClick={handleClickProduct}
                        >
                          <a href="#top">
                            <button className="Product-button">
                              View product
                            </button>
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          ) : null}
          <div className="Product-show-more"></div>
          <div className="desktop-serachbar">
        <SearchBar onSearch={handleSearch} />
        </div>
        </div>
      )}
    </>
  );
}
