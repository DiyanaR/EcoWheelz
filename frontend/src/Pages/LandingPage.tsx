import styled from "styled-components";
import HeroImg from "../assets/header.png";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <>
      <Main>
        <div className="hero-bg-filler">
          <div className="hero-image">
            <div className="hero-text-banner">
              <h1 className="hero-headline">Silent. Green. Ecowheelz.</h1>

              <div className="slogan-container">
                <span className="slogan">
                  Sustainable transport made easy.{" "}
                  <span className="slogan-br">Your green ride awaits!</span>
                </span>

                <Link to="/productpage">
                  <button className="explore-btn">Explore more</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <ProductCard />
      </Main>
    </>
  );
}

const Main = styled.div`
  .hero-bg-filler {
    background-color: #080d11;
    width: 100%;
  }

  .hero-image {
    background: url(${HeroImg});
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    max-width: 1630px;
    height: calc(100dvh - 92px);

    display: flex;
    align-items: center;
    justify-content: center;

    margin: auto;
  }

  .hero-text-banner {
    background: rgba(0, 0, 0, 0.7);
    padding: 0 35px;
    height: 310px;
    font-family: "Red Hat Display";
    color: white;
    font-weight: 700;

    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .hero-headline {
    margin: 0;
    font-size: 64px;
    line-height: 75px;
  }

  .slogan {
    display: inline-block;
    margin: 0;
    font-size: 16px;
  }

  a {
    text-decoration: none;
  }

  .explore-btn {
    background-color: transparent;
    border: 2px solid #9ae5bd;

    padding: 10px 12px;
    border-radius: 20px;
    margin: 0 12px;

    color: white;
    font-size: 16px;
    font-weight: 700;

    cursor: pointer;
  }

  @media (max-width: 815px) {
    .hero-image {
      display: block;
      position: relative;
    }

    .hero-text-banner {
      position: absolute;
      top: 18%;
      right: 0;
      left: 0;
      padding-bottom: 20px;

      height: 260px;
    }

    .hero-headline {
      font-size: 48px;
      line-height: 60px;
    }

    .slogan {
      font-size: 14px;

      .slogan-br {
        display: block;
      }
    }

    .explore-btn {
      display: block;
      position: absolute;
      left: 50%;
      bottom: 12px;
      transform: translateX(-50%);
    }
  }

  @media (max-width: 475px) {
    .hero-text-banner {
      display: block;
      padding-top: 16px;
      height: 240px;
    }

    .hero-headline {
      font-size: 44px;
      line-height: 55px;
    }

    .explore-btn {
      bottom: 16px;
    }
  }
`;
