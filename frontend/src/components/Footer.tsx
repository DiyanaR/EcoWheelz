import React from "react";
import "../css/Footer.css";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <a href="#top" className="arrow-container" onClick={scrollToTop}>
        <img className="arrow-icon" src="/icons/VectorArrow.png" alt="icon" />
      </a>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-column">
            <h3 className="footer-heading">About Us</h3>
            <p className="footer-link">Work with us</p>
            <p className="footer-link">privacy policy</p>
            <p className="footer-link">Terms and conditions</p>
          </div>
          <div className="footer-column">
            <h3 className="footer-heading">FAQ</h3>
            <p className="footer-link">Shipping and returns</p>
            <p className="footer-link">Store policy</p>
            <p className="footer-link">Payments</p>
          </div>
          <div className="footer-column">
            <h3 className="footer-heading">Contact</h3>
            <p className="footer-link">+ 46 745 343 21</p>
            <p className="footer-link">Gloryroad1</p>
            <p className="footer-link">service@eccowheelz.com</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;

// import React, { useState } from "react";
// import "../css/Footer.css";

// function Footer() {
//   const [aboutUsOpen, setAboutUsOpen] = useState(false);
//   const [faqOpen, setFaqOpen] = useState(false);
//   const [contactOpen, setContactOpen] = useState(false);

//   const toggleAboutUs = () => {
//     setAboutUsOpen(!aboutUsOpen);
//   };

//   const toggleFaq = () => {
//     setFaqOpen(!faqOpen);
//   };

//   const toggleContact = () => {
//     setContactOpen(!contactOpen);
//   };

//   return (
//     <footer className="footer">
//       <div className="footer-container">
//         <div className="footer-column">
//           <h3 className="footer-heading" onClick={toggleAboutUs}>
//             About Us
//           </h3>
//           {aboutUsOpen && (
//             <ul className="footer-dropdown">
//               <li className="footer-link">work with us</li>
//               <li className="footer-link">privacy Policy</li>
//               <li className="footer-link">terms and conditions</li>
//             </ul>
//           )}
//         </div>
//         <div className="footer-column">
//           <h3 className="footer-heading" onClick={toggleFaq}>
//             FAQ
//           </h3>
//           {faqOpen && (
//             <ul className="footer-dropdown">
//               <li className="footer-link">shipping and returns</li>
//               <li className="footer-link">store policy</li>
//               <li className="footer-link">Payments</li>
//             </ul>
//           )}
//         </div>
//         <div className="footer-column">
//           <h3 className="footer-heading" onClick={toggleContact}>
//             Contact
//           </h3>
//           {contactOpen && (
//             <ul className="footer-dropdown">
//               <li className="footer-link">939399393</li>
//               <li className="footer-link">-----</li>
//               <li className="footer-link">-----</li>
//             </ul>
//           )}
//         </div>
//       </div>
//     </footer>
//   );
// }

// export default Footer;
