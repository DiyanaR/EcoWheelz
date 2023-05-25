import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/DetailPage.css";
import "../css/ProductCard.css";
import { useParams } from "react-router-dom";
import { useRef } from "react";

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
  const [filteredProduct, setFilteredProduct] = useState<Product[]>([]);
  // const title = products.length > 0 ? products[0].title : "";
  const { title } = useParams<{ title: string }>();
  const productRef = useRef<HTMLDivElement>(null);

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
    }
  };

  return (
    <>
      {filteredProduct.length > 0 && (
        <div className="DetailPage-box">
          <div className="DetailPage-info">
            <img
              className="DetailPage-image"
              src={filteredProduct[0].img}
              alt={filteredProduct[0].img}
            />
            <div className="DetailPage-text">
              {/* <div className="DetailPage-shortText"> */}
              <h1>
                {filteredProduct[0].title.charAt(0).toUpperCase() +
                  filteredProduct[0].title.slice(1)}
              </h1>
              <p>{filteredProduct[0].subtitle}</p>
              <p>{filteredProduct[0].longdescription}</p>
              <h2>{filteredProduct[0].price}</h2>
              <div className="DetailPage-container">
                <img src="../icons/stars.png" alt="icon" />
                <button className="Product-button">Add to Cart</button>
              </div>
            </div>
          </div>

          <div className="DetailPage-specification">
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
          </div>

          <h1 className="Product-header">Other products</h1>
          {products.length > 0 ? (
            <ol className="Product-list">
              {products.slice(0, 2).map((product) => (
                <li key={product.id}>
                  <div className="OtherProduct-container">
                    <img
                      className="OtherProduct-image"
                      src={product.img}
                      alt={product.img}
                    />

                    <div className="OtherProduct-text">
                      <div className="OtherProductCard-icon">
                        <h2 className="Product-title">{product.title}</h2>
                        <h3>{product.subtitle}</h3>
                      </div>

                      <p className="OtherProduct-description">
                        {product.shortdescription}
                      </p>

                      <div className="OtherProductCard-button">
                        <p className="Product-price">{product.price}</p>
                        <Link
                          to={`/detailpage/${product.title}`}
                          onClick={handleClickProduct}
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
          <div className="Product-show-more"></div>
        </div>
      )}
    </>
  );
}
