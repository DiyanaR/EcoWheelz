import styled from "styled-components";
import HeroImg from "../assets/header.png";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <>
      <Main>
        <div style={{ position: "relative", fontFamily: "Red Hat Display" }}>
          <div className="hero-image">
            <div className="hero-text-banner">
              <div>Silent. Green. Ecowheelz.</div>

              <div>
                Sustainable transport made easy. Your green ride awaits!
              </div>

              <Link to="/productpage">
                <button>Explore more</button>
              </Link>
            </div>
          </div>

          <ProductCard />
        </div>
      </Main>
    </>
  );
}

const Main = styled.div`
  .hero-image {
    background: url(${HeroImg}), #080d11;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
    height: calc(100dvh - 92px);
    max-height: 1024px;
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
