import React from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";
// import logo from '../logo/logo-desktop.png';
import SearchBar from "../components/SearchBar";



export default function Navbar() {
  const handleSearch = (searchTerm: string) => {
    // lägga söklogiken här
    console.log("Sökterm:", searchTerm);
  };
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">
            <div className="logo-container">
            {/* <span className="logo-text">EcoWheelz</span> */}

              {/* <img src={logo} alt="Logo" className="logo-image"/> */}
                <img src="/logo/logo-desktop.png" alt="Logo" className="logo-image" />
                <span className="logo-text">EcoWheelz</span>
                </div>



            </Link>


          </li>
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
        </ul>
        {/* <SearchBar onSearch={handleSearch} /> */}
      </nav>
    </>
  );
}
