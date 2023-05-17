
import React from "react";
import LandingImage from "../LandingImage/header.png";
import ProductCard from "../components/ProductCard";

function LandingPage() {
  return (

    <div style={{ position: "relative", fontFamily: "Red Hat Display" }}>
      <img
        src={LandingImage}
        alt="Min bild"
        style={{
          width: "1460px",
          height: "1044px",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "352px",
          left: "301px",
          width: "873px",
          height: "306px",
          backgroundColor: "rgba(0, 0, 0, 0.7)", // svart färg med 70% opacitet
          border: "2px solid rgba(0, 0, 0, 0.7)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: "48px",
            textAlign: "center",
            width: "873px",
            height: "306px",
            top: "352px",
            placeItems: "center",

          }}
        >
          Silent. Green. Ecowheelz.
        </div>

        <div style={{ color: "white", fontSize: "24px", textAlign: "center" }}>
          Sustainable transport made easy. Your green ride awaits!
        </div>
        <div> buttons</div>
      </div>
      <ProductCard />
    </div>
  );
}
export default LandingPage;
