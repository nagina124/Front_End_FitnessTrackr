import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  Hero,
  LoginModal,
  Navbar,
  RegisterModal,
  MyRoutines,
  Routines,
  Activities,
  ProfileNavbar,
  AddRoutineForm,
} from "./components";
import { getToken, getUsername } from "./auth";

function App() {
  const [registerClick, setRegisterClick] = useState(false);
  const [loginClick, setLoginClick] = useState(false);
  const [authenticate, setAuthentication] = useState(false);
  const [token, setToken] = useState("");
  const [username, setUsername] = useState();

  useEffect(() => {
    if (getToken()) {
      setAuthentication(true);
    }
    getUsername()
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setUsername(result.username);
      })
      .catch(console.error);
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Navbar loginClick={loginClick} setLoginClick={setLoginClick} />
          <Hero
            loginClick={loginClick}
            setLoginClick={setLoginClick}
            registerClick={registerClick}
            setRegisterClick={setRegisterClick}
          />
          <RegisterModal
            loginClick={loginClick}
            setLoginClick={setLoginClick}
            registerClick={registerClick}
            setRegisterClick={setRegisterClick}
            authenticate={authenticate}
            setAuthentication={setAuthentication}
            username={username}
            setUsername={setUsername}
            token={token}
            setToken={setToken}
          />
          <LoginModal
            loginClick={loginClick}
            setLoginClick={setLoginClick}
            registerClick={registerClick}
            setRegisterClick={setRegisterClick}
            username={username}
            setUsername={setUsername}
            token={token}
            setToken={setToken}
          />
        </Route>
        <Route path="/login">
          <Navbar loginClick={loginClick} setLoginClick={setLoginClick} />
          <Hero
            loginClick={loginClick}
            setLoginClick={setLoginClick}
            registerClick={registerClick}
            setRegisterClick={setRegisterClick}
          />
          <RegisterModal
            loginClick={loginClick}
            setLoginClick={setLoginClick}
            registerClick={registerClick}
            setRegisterClick={setRegisterClick}
            authenticate={authenticate}
            setAuthentication={setAuthentication}
            username={username}
            setUsername={setUsername}
            token={token}
            setToken={setToken}
          />
          <LoginModal
            loginClick={loginClick}
            setLoginClick={setLoginClick}
            registerClick={registerClick}
            setRegisterClick={setRegisterClick}
            authenticate={authenticate}
            setAuthentication={setAuthentication}
            username={username}
            setUsername={setUsername}
            token={token}
            setToken={setToken}
          />
        </Route>
        <Route path="/register">
          <Navbar loginClick={loginClick} setLoginClick={setLoginClick} />
          <Hero
            loginClick={loginClick}
            setLoginClick={setLoginClick}
            registerClick={registerClick}
            setRegisterClick={setRegisterClick}
          />
          <RegisterModal
            loginClick={loginClick}
            setLoginClick={setLoginClick}
            registerClick={registerClick}
            setRegisterClick={setRegisterClick}
            authenticate={authenticate}
            setAuthentication={setAuthentication}
            username={username}
            setUsername={setUsername}
            token={token}
            setToken={setToken}
          />
          <LoginModal
            loginClick={loginClick}
            setLoginClick={setLoginClick}
            registerClick={registerClick}
            setRegisterClick={setRegisterClick}
            username={username}
            setUsername={setUsername}
            token={token}
            setToken={setToken}
          />
        </Route>
        <Route path="/myroutines">
          <ProfileNavbar
            authenticate={authenticate}
            username={username}
            setUsername={setUsername}
          />
          <MyRoutines
            authenticate={authenticate}
            username={username}
            setUsername={setUsername}
          />
        </Route>
        <Route path="/routines">
          <Navbar loginClick={loginClick} setLoginClick={setLoginClick} />
          <Routines
            authenticate={authenticate}
            username={username}
            setUsername={setUsername}
          />
        </Route>
        <Route path="/activities">
          <Activities />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
