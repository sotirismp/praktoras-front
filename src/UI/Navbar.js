import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import SvgUser from "../assets/SvgUser.js";
import SvgMessage from "../assets/SvgMessage";
import Nav from "react-bootstrap/Nav";
import kino from "../assets/kino.png";
import tzoker from "../assets/tzoker.png";
import powerspin from "../assets/powerspin.png";
import Typed from "react-typed";

function Navbar(props) {
  const [messageBubble, setMessageBubble] = useState(2);
  return (
    <>
      <header className="navbar" expand="lg" bg="dark" variant="dark">
        <div className="nav-container">
          <div className="title">
            <div
              className={
                props.isBurgerOpen ? "menu-btn openBurger" : "menu-btn"
              }
              onClick={props.burgerHandler}
            >
              <div className="burger"></div>
            </div>
            <Link to="/#" style={{ width: "200px" }}>
              <Typed
                strings={["Praktoras.com"]}
                typeSpeed={100}
                backSpeed={50}
                loop={true}
                className="typed"
              />
            </Link>
          </div>
          <div className="nav-link-container">
            <Link to="/#jackpots" onClick={props.linkHandler}>
              <div className="nav-link-item">
                <img src={tzoker} alt="" className="nav-image"></img>
                Jackpots
              </div>
            </Link>
            <Link to="/#kino" onClick={props.linkHandler}>
              <div className="nav-link-item">
                <img src={kino} alt="" className="nav-image"></img>
                Kino
              </div>
            </Link>
            <Link
              target="_blank"
              to="/powerspinDraws"
              id="powerspin"
              onClick={props.linkHandler}
            >
              <div className="nav-link-item">
                <img src={powerspin} alt="" className="nav-image"></img>
                PowerSpin
              </div>
            </Link>
          </div>
          <div className="right-nav-container">
            <Nav.Item className="nav-link-item messages">
              <Link to="messages" className="links">
                <SvgMessage className="icon icon2"></SvgMessage>
                Μηνύματα
                {messageBubble && (
                  <div className="message-bubble">{messageBubble}</div>
                )}
              </Link>
            </Nav.Item>
            <Nav.Item className="nav-link-item">
              <Link to="profile" className="links">
                <SvgUser className="icon"></SvgUser>
                {props.username}
              </Link>

              <a onClick={props.logoutHandler} style={{ fontSize: "1.5vh" }}>
                Αποσύνδεση
              </a>
            </Nav.Item>
          </div>
        </div>
      </header>
      <div
        className={
          props.isBurgerOpen ? "nav-link-mobile open" : "nav-link-mobile close"
        }
      >
        <Link to="/#subs" onClick={props.linkHandler}>
          Συνδρομές
        </Link>
        <hr></hr>
        <Link to="/#jackpots" onClick={props.linkHandler}>
          <img src={tzoker} alt="" className="nav-image"></img>
          Jackpots
        </Link>
        <hr></hr>
        <Link to="/#kino" onClick={props.linkHandler}>
          <img src={kino} alt="" className="nav-image"></img>
          Kino
        </Link>
        <hr></hr>
        <Link to="/powerspinDraws" onClick={props.linkHandler}>
          <img src={powerspin} alt="" className="nav-image"></img>
          PowerSpin
        </Link>
        <hr></hr>
      </div>
    </>
  );
}

export default Navbar;
