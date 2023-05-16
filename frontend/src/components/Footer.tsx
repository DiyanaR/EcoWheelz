import React from 'react';
import "../css/Footer.css";

// function Footer() {
//   return (
//     <footer className='footer'>
//       <div className="footer-container">
//         <div className="footer-column">
//           <h3>About Us</h3>
//           <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, delectus doloremque! Ducimus, enim. </p>
//         </div>
//         <div className="footer-column">
//         <h3>FAQ</h3>
//          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
//         </div>
//         <div className="footer-column">
//           <h3>Contact</h3>
//           <p>Email: info@example.com</p>
//           <p>telefonnnnnnnsnnsns</p>
//         </div>
//         <p>&copy; {new Date().getFullYear()} My Website. All rights reserved.</p>
//         </div>

//     </footer>
//   );
// }

// export default Footer;


function Footer(){
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h3 className="footer-heading">About Us</h3>
          <p className="footer-link">work with us</p>
          <p className="footer-link">privacy Policy</p>
          <p className="footer-link">terms and conditions</p>
        </div>
        <div className="footer-column">
          <h3 className="footer-heading">FAQ</h3>
          <p className="footer-link">shipping and returns</p>
          <p className="footer-link">store policy</p>
          <p className="footer-link">Payments</p>
        </div>
        <div className="footer-column">
          <h3 className="footer-heading">Contact</h3>
          <p className="footer-link">939399393</p>
          <p className="footer-link">-----</p>
          <p className="footer-link">-----</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
