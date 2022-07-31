import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import SvgUser from "../assets/SvgUser.js";
import Nav from "react-bootstrap/Nav";
import kino from "../assets/kino.png";
import tzoker from "../assets/tzoker.png";
import powerspin from "../assets/powerspin.png";

function Navbar(props) {
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
            <Link to="/#">Praktoras</Link>
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
            <Link to="/#powerSpin" id="powerspin" onClick={props.linkHandler}>
              <div className="nav-link-item">
                <img src={powerspin} alt="" className="nav-image"></img>
                PowerSpin
              </div>
            </Link>
          </div>
          <Nav.Item>
            <Link to="profile" className="links">
              <SvgUser className="icon"></SvgUser>
              {props.username}
            </Link>
          </Nav.Item>
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
        <Link to="/#powerSpin" onClick={props.linkHandler}>
          <img src={powerspin} alt="" className="nav-image"></img>
          PowerSpin
        </Link>
        <hr></hr>
      </div>
    </>
  );
}

export default Navbar;
