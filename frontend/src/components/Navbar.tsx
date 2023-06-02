import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";
import SearchBar from "../components/SearchBar";
import { ReactComponent as AccountIcon } from "../assets/account.svg";
import { ReactComponent as CartIcon } from "../assets/cart.svg";
import { ReactComponent as SearchIcon } from "../assets/search.svg";
import { ReactComponent as MenuIcon } from "../assets/hamburger.svg";
import { ReactComponent as CloseIcon } from "../assets/close.svg";
import { ShopContext } from "./ContextProvider";
import AccountPopup from "./AccountPopup";

export default function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [popup, setPopup] = useState(false);
  const [showSearchMobile, setShowSearchMobile] = useState(false);
  const {
    userContext: { login },
    cartContext: { cartProducts },
  } = useContext(ShopContext);

  const handleSearch = (searchTerm: string) => {
    //     console.log("Sökt:", searchTerm);
  };

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
    setPopup(false);
  };

  // Includes duplicates in the counter
  function cartItemCount() {
    if (cartProducts) {
      const counter = cartProducts.reduce((acc, cartItem) => {
        return acc + cartItem.amount;
      }, 0);

      return counter;
    }

    return null;
  }

  return (
    <>
      <div className="spacer" />
      <nav className="navbar-desktop">
        <Link to="/">
          <div className="logo-container">
            <img
              src="/logo/Logo-desktop.png"
              alt="Logo"
              className="logo-image"
            />
            <span className="logo-text">EcoWheelz</span>
          </div>
        </Link>

        <ul className="nav-links-desktop">
          <li>
            <Link to="/productpage">Products</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/faq">FAQ</Link>
          </li>
          <div className="side-push">
            <li className="account">
              <AccountIcon
                onClick={() => setPopup(!popup)}
                className="cart-icon"
              />

              {login ? <div className="logged-icon" /> : null}
              {popup && <AccountPopup setPopup={setPopup} />}
            </li>
            <li className="cart">
              {cartProducts && cartProducts.length > 0 ? (
                <div className="product-counter">{cartItemCount()}</div>
              ) : null}

              <Link to="/cart">
                <CartIcon className="account-icon" />
              </Link>
            </li>
          </div>
        </ul>

        <div className="menu-icon">
          <span className="search push">
            <SearchIcon
              onClick={() => setShowSearchMobile(!showSearchMobile)}
              className="nav-icon"
            />
          </span>

          <span className="account">
            <AccountIcon
              onClick={() => {
                setPopup(!popup);
                setMenuOpen(false);
              }}
              className="nav-icon"
            />

            {login ? <div className="logged-icon" /> : null}
            {popup && <AccountPopup setPopup={setPopup} />}
          </span>

          <span className="cart">
            {cartProducts && cartProducts.length > 0 ? (
              <div className="product-counter">
                {cartProducts.reduce((acc, cartItem) => {
                  return acc + cartItem.amount;
                }, 0)}
              </div>
            ) : null}

            <Link to="/cart">
              <CartIcon className="nav-icon cart-size" />
            </Link>
          </span>

          {isMenuOpen ? (
            <CloseIcon className="nav-icon" onClick={handleMenuToggle} />
          ) : (
            <MenuIcon className="nav-icon" onClick={handleMenuToggle} />
          )}
        </div>

        <div className={`slide-menu ${isMenuOpen ? "open" : ""}`}>
          <div className="slide-menu-content">
            <ul className="nav-links">
              <li>
                <Link onClick={() => setMenuOpen(false)} to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link onClick={() => setMenuOpen(false)} to="/productpage">
                  Products
                </Link>
              </li>
              <li>
                <Link onClick={() => setMenuOpen(false)} to="/about">
                  About
                </Link>
              </li>
              <li>
                <Link onClick={() => setMenuOpen(false)} to="/contact">
                  Contact
                </Link>
              </li>
              <li>
                <Link onClick={() => setMenuOpen(false)} to="/faq">
                  FAQ
                </Link>
              </li>
              <li></li>
            </ul>
          </div>
        </div>

        {showSearchMobile && <SearchBar onSearch={handleSearch} />}
      </nav>
    </>
  );
}
