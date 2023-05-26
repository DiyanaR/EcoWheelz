// import React from "react";
// import { Link } from "react-router-dom";
// import "../css/Navbar.css";
// import SearchBar from "../components/SearchBar";

// export default function Navbar() {
//   const handleSearch = (searchTerm: string) => {
//     console.log("Sökt:", searchTerm);
//   };
//   return (
//     <>
//       <nav>
//         <ul>
//           <li>
//             <Link to="/">
//               <div className="logo-container">

//                 <img
//                   src="/logo/logo-desktop.png"
//                   alt="Logo"
//                   className="logo-image"
//                 />
//                 <span className="logo-text">EcoWheelz</span>
//               </div>
//             </Link>
//           </li>
//           <li>
//             <Link to="/productpage">Products</Link>
//           </li>
//           <li>
//             <Link to="/about">About</Link>
//           </li>
//           <li>
//             <Link to="/contact">Contact</Link>
//           </li>
//           <li>
//             <Link to="/faq">FAQ</Link>
//           </li>
//           <Link to="/cart">
//             <img src="/icons/Vector.png" alt="icon" />
//           </Link>
//         </ul>

//         <SearchBar onSearch={handleSearch} />
//       </nav>
//     </>
//   );
// }






// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "../css/Navbar.css";
// import SearchBar from "../components/SearchBar";

// export default function Navbar() {
//   const handleSearch = (searchTerm: string) => {
//     console.log("Sökt:", searchTerm);
//   };

//   const [isMenuOpen, setMenuOpen] = useState(false);

//   const handleMenuToggle = () => {
//     setMenuOpen(!isMenuOpen);
//   };

//   return (
//     <>
//       <nav>
//         <div className={`menu-icon ${isMenuOpen ? "open" : ""}`} onClick={handleMenuToggle}>
//           <div className="menu-icon-bar"></div>
//           <div className="menu-icon-bar"></div>
//           <div className="menu-icon-bar"></div>
//         </div>

//         <ul className={`nav-links ${isMenuOpen ? "open" : ""}`}>
//           <li>
//             <Link to="/">
//               <div className="logo-container">
//                 <img src="/logo/logo-desktop.png" alt="Logo" className="logo-image" />
//                 <span className="logo-text">EcoWheelz</span>
//               </div>
//             </Link>
//           </li>
//           <li>
//             <Link to="/productpage">Products</Link>
//           </li>
//           <li>
//             <Link to="/about">About</Link>
//           </li>
//           <li>
//             <Link to="/contact">Contact</Link>
//           </li>
//           <li>
//             <Link to="/faq">FAQ</Link>
//           </li>
//           <li>
//             <Link to="/cart">
//               <img src="/icons/Vector.png" alt="icon" />
//             </Link>
//           </li>
//         </ul>

//         <SearchBar onSearch={handleSearch} />
//       </nav>
//     </>
//   );
// }



// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "../css/Navbar.css";
// import SearchBar from "../components/SearchBar";

// export default function Navbar() {
//   const [isMenuOpen, setMenuOpen] = useState(false);

//   const handleSearch = (searchTerm: string) => {
//     console.log("Sökt:", searchTerm);
//   };

//   const handleMenuToggle = () => {
//     setMenuOpen(!isMenuOpen);
//   };

//   return (
//     <>
//       <nav>
//         <div className="menu-icon" onClick={handleMenuToggle}>
//           <div className={`menu-icon-bar ${isMenuOpen ? "open" : ""}`}></div>
//           <div className={`menu-icon-bar ${isMenuOpen ? "open" : ""}`}></div>
//           <div className={`menu-icon-bar ${isMenuOpen ? "open" : ""}`}></div>
//         </div>

//         <ul className={`nav-links ${isMenuOpen ? "open" : ""}`}>
//           <li className="logo-li">

//             <Link to="/">
//             <div className="logo-container">
//               <img src="/logo/logo-desktop.png" alt="Logo" className="logo-image" />
//               <span className="logo-text">EcoWheelz</span>
//             </div>
//             </Link>
//           </li>
//           <li>
//             <Link to="/productpage">Products</Link>
//           </li>
//           <li>
//             <Link to="/about">About</Link>
//           </li>
//           <li>
//             <Link to="/contact">Contact</Link>
//           </li>
//           <li>
//             <Link to="/faq">FAQ</Link>
//           </li>
//           <li>
//             <Link to="/cart">
//               <img src="/icons/Vector.png" alt="icon" />
//             </Link>
//           </li>
//         </ul>

//         <SearchBar onSearch={handleSearch} />
//       </nav>
//     </>
//   );
// }








// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "../css/Navbar.css";
// import SearchBar from "../components/SearchBar";

// export default function Navbar() {
//   const [isMenuOpen, setMenuOpen] = useState(false);

//   const handleSearch = (searchTerm: string) => {
//     console.log("Sökt:", searchTerm);
//   };

//   const handleMenuToggle = () => {
//     setMenuOpen(!isMenuOpen);
//   };

//   return (
//     <>
//       <nav>
//         <div className="menu-icon" onClick={handleMenuToggle}>
//           <div className={`menu-icon-bar ${isMenuOpen ? "open" : ""}`}></div>
//           <div className={`menu-icon-bar ${isMenuOpen ? "open" : ""}`}></div>
//           <div className={`menu-icon-bar ${isMenuOpen ? "open" : ""}`}></div>
//         </div>

//         <ul className={`nav-links ${isMenuOpen ? "open" : ""}`}>
//           <li className="logo-li">
//             <Link to="/">
//               <div className="logo-container">
//                 <img src="/logo/logo-desktop.png" alt="Logo" className="logo-image" />
//                 <span className="logo-text">EcoWheelz</span>
//               </div>
//             </Link>
//           </li>
//           <li>
//             <Link to="/productpage">Products</Link>
//           </li>
//           <li>
//             <Link to="/about">About</Link>
//           </li>
//           <li>
//             <Link to="/contact">Contact</Link>
//           </li>
//           <li>
//             <Link to="/faq">FAQ</Link>
//           </li>
//           <li>
//             <Link to="/cart">
//               <img src="/icons/Vector.png" alt="icon" />
//             </Link>
//           </li>
//         </ul>

//         <ul className={`mobile-nav-links ${isMenuOpen ? "open" : ""}`}>
//           <li>
//             <Link to="/productpage">Products</Link>
//           </li>
//           <li>
//             <Link to="/about">About</Link>
//           </li>
//           <li>
//             <Link to="/contact">Contact</Link>
//           </li>
//           <li>
//             <Link to="/faq">FAQ</Link>
//           </li>
//           <li>
//             <Link to="/cart">
//               <img src="/icons/Vector.png" alt="icon" />
//             </Link>
//           </li>
//         </ul>

//         <SearchBar onSearch={handleSearch} />
//       </nav>
//     </>
//   );
// }



import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";
import SearchBar from "../components/SearchBar";

export default function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleSearch = (searchTerm: string) => {
    console.log("Sökt:", searchTerm);
  };

  // const handleMenuToggle = () => {
  //   setMenuOpen(prevState => !prevState);
  // };

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav>
        <div className={`menu-icon ${isMenuOpen ? "open" : ""}`} onClick={handleMenuToggle}>
        <div className="menu-icon-bar"></div>
          <div className="menu-icon-bar"></div>
          <div className="menu-icon-bar"></div>

        </div>

        <ul className={`nav-links ${isMenuOpen ? "hidden" : ""}`}>

          <li className="logo-li">
            <Link to="/">
              <div className="logo-container">
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
          <li>
            <Link to="/cart">
              <img src="/icons/Vector.png" alt="icon" />
            </Link>
          </li>
        </ul>



        <ul className={`mobile-nav-links ${isMenuOpen ? "open" : ""}`}>
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
            <li>
              <Link to="/cart">
                <img src="/icons/Vector.png" alt="icon" />
              </Link>
            </li>
            </ul>




        <SearchBar onSearch={handleSearch} />
      </nav>
    </>
  );
}
