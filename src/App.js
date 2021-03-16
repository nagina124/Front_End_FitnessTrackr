import React, { useState } from 'react';
import "./App.css";
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Hero from "./components/Hero";
import RegisterModal from './components/RegisterModal';
import LoginModal from './components/LoginModal';

function App() {
  const [registerClick, setRegisterClick] = useState(false);
  const [loginClick, setLoginClick] = useState(false);

  return (
    <Router>
      <Navbar loginClick={loginClick} setLoginClick={setLoginClick}/>
      <Hero loginClick={loginClick} setLoginClick={setLoginClick} registerClick={registerClick} setRegisterClick={setRegisterClick}/>
      <RegisterModal loginClick={loginClick} setLoginClick={setLoginClick} registerClick={registerClick} setRegisterClick={setRegisterClick}/>
      <LoginModal loginClick={loginClick} setLoginClick={setLoginClick} registerClick={registerClick} setRegisterClick={setRegisterClick}/>
      <Switch>
        <Route path="/" />
      </Switch>
    </Router>
  );
}

export default App;
