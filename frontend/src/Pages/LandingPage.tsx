import styled from "styled-components";
import LandingImage from "../LandingImage/header.png";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <>
      <Main>
        <div style={{ position: "relative", fontFamily: "Red Hat Display" }}>
          <img className="hero-image" src={LandingImage} alt="Min bild" />

          <div className="hero-headline">
            <div
              style={{
                color: "white",
                fontSize: "48px",
                textAlign: "center",
                // width: "873px",
                // height: "306px",
                top: "352px",
                placeItems: "center",
                marginBottom: "20px",
              }}
            >
              Silent. Green. Ecowheelz.
            </div>

            <div
              style={{ color: "white", fontSize: "16px", marginRight: "130px" }}
            >
              Sustainable transport made easy. Your green ride awaits!
            </div>

            <Link to="/productpage">
              <button
                style={{
                  fontFamily: "Red Hat Display",
                  fontSize: "14px",
                  lineHeight: "19px",
                  textAlign: "left",
                  verticalAlign: "top",
                  color: "#faf9f8",
                  width: "109px",
                  height: "39px",
                  borderRadius: "16px",
                  borderColor: "#9ae5bd",
                  backgroundColor: "transparent",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "20px",
                }}
              >
                Explore more
              </button>
            </Link>
          </div>

          <ProductCard />
        </div>
      </Main>
    </>
  );
}

const Main = styled.div`
  .hero-image {
    width: 1460px;
    height: 1044px;
    z-index: 0;
  }

  .hero-headline {
    position: "absolute";
    top: "352px";
    left: "301px";
    width: "873px";
    height: "306px";
    background-color: "rgba(0, 0, 0, 0.7)"; // svart färg med 70% opacitet
    border: "2px solid rgba(0, 0, 0, 0.7)";
    display: "flex";
    flex-direction: "column";
    align-items: "center";
    justify-content: "center";
  }
`;
