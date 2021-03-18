import React from "react";
import { Link } from "react-router-dom";
import Image from "../assets/svg-1.svg";
import "./Hero.css";

const Hero = ({ registerClick, setRegisterClick }) => {
  const handleClick = () => setRegisterClick(!registerClick);

  return (
    <>
      <div className="main">
        <div className="main-container">
          <div className="main-content">
            <h1>Fitness at your Fingertips</h1>
            <p>
              FitnessTrac.kr allows you to fully optimize your fitness routines
              and activities so you can focus solely on results
            </p>
            <button onClick={handleClick} className="main-btn">
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: "#fff",
                  zIndex: "1",
                  position: "relative",
                }}
              >
                Get Started
              </Link>
            </button>
          </div>
          <div className="main-img-container">
            <img src={Image} alt="Fitness Tracker" id="main-img" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
