import React from "react";
import Image3 from "../assets/svg-3.svg";
import { Link } from "react-router-dom";

const LoginModal = ({
  loginClick,
  setLoginClick,
  registerClick,
  setRegisterClick,
}) => {
  window.addEventListener("click", (e) => {
    if (e.target === document.getElementById("login-modal")) {
      setLoginClick(!loginClick);
    }
  });

  const handleClick = () => {
    setLoginClick(!loginClick);
    setRegisterClick(!registerClick);
  };

  const close_btn = () => setLoginClick(!loginClick);

  return (
    <>
      <div className={loginClick ? "modal-open" : "modal"} id="login-modal">
        <div className="modal-content">
          <span onClick={close_btn} className="close-btn">&times;</span>
          <div className="modal-content-left">
            <img src={Image3} alt="Working Out" id="modal-img" />
          </div>
          <div className="modal-content-right">
            <form action="/" method="GET" className="modal-form" id="form">
              <h1>Let's Get to it!</h1>
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
              <input type="submit" className="modal-input-btn" value="Login" />
              <span className="modal-input-login">
                Don't have an account? Sign Up{" "}
                <Link
                  onClick={handleClick}
                  style={{
                    textDecoration: "none",
                    color: "var(--brightorange)",
                    fontSize: "600",
                  }}
                  to="/register"
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

export default LoginModal;
