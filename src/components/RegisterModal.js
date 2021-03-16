import React from "react";
import { Link } from "react-router-dom";
import Image2 from "../assets/svg-2.svg";
import "./Modal.css";

const RegisterModal = ({
  loginClick,
  setLoginClick,
  registerClick,
  setRegisterClick,
}) => {
  window.addEventListener("click", (e) => {
    if (e.target === document.getElementById("register-modal")) {
      setRegisterClick(!registerClick);
    }
  });

  const handleClick = () => {
    setLoginClick(!loginClick);
    setRegisterClick(!registerClick);
  };

  const close_btn = () => setRegisterClick(!registerClick);

  return (
    <>
      <div
        className={registerClick ? "modal-open" : "modal"}
        id="register-modal"
      >
        <div className="modal-content">
          <span onClick={close_btn} className="close-btn">&times;</span>
          <div className="modal-content-left">
            <img src={Image2} alt="Fitness Stats" id="modal-img" />
          </div>
          <div className="modal-content-right">
            <form action="/" method="GET" className="modal-form" id="form">
              <h1>
                Get started today! Create your account by filling out the form
                below.
              </h1>
              <div className="form-validation">
                <input
                  type="text"
                  className="modal-input"
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                />
                <p>Error Message</p>
              </div>
              <div className="form-validation">
                <input
                  type="password"
                  className="modal-input"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                />
                <p>Error Message</p>
              </div>
              <div className="form-validation">
                <input
                  type="password"
                  className="modal-input"
                  id="password_confirm"
                  name="password"
                  placeholder="Confirm your password"
                />
                <p>Error Message</p>
              </div>
              <input
                type="submit"
                className="modal-input-btn"
                value="Sign Up"
              />
              <span className="modal-input-login">
                Already have an account? Login{" "}
                <Link
                  onClick={handleClick}
                  style={{
                    textDecoration: "none",
                    color: "var(--brightorange)",
                    fontSize: "600",
                  }}
                  to="/login"
                >
                  here
                </Link>
              </span>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterModal;
