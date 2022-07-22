import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "../UI/Container";
import SvgUser from "../assets/SvgUser.js";
import $ from "jquery";

import "./Home.css";

function Home(props) {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [subs, setSubs] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    if (!props.token) return navigate("/login");
  }, []);

  useEffect(() => {
    const checkToken = async () => {
      const resp = await fetch(props.host + "/userInfo", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          token: props.data.token,
        }),
      });

      if (resp.ok && resp.status === 200) {
        const data = await resp.json();
        console.log("hello");
        setSubs([...data.subs]);
      } else {
        props.logoutHandler();
      }
    };
    checkToken();
  }, [navigate]);

  const burgerHandler = (e) => {
    setIsBurgerOpen(!isBurgerOpen);
  };

  const linkHandler = (e) => {
    /*const yOffset = -100;
    const element = document.getElementById(e.view.location.hash.substring(1));
    const y =
      element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
    console.log();*/
    setIsBurgerOpen(!isBurgerOpen);
    document
      .getElementById(e.view.location.hash.substring(1))
      .scrollIntoView({ behavior: "smooth", "padding-top": "10vh" });
    document.getElementById(e.view.location.hash.substring(1)).scrollTop -= 200;
  };

  /* <Nav.Link onClick={props.logoutHandler}>Logout</Nav.Link>;*/
  return (
    <>
      <nav className="navbar" expand="lg" bg="dark" variant="dark">
        <div className="nav-container">
          <div className="title">
            <div
              className={isBurgerOpen ? "menu-btn openBurger" : "menu-btn"}
              onClick={burgerHandler}
            >
              <div className="burger"></div>
            </div>
            <Link to="/#">Praktoras</Link>
          </div>
          <Nav.Item>
            <Link to="profile" className="links">
              <SvgUser className="icon"></SvgUser>
              {props.username}
            </Link>
          </Nav.Item>
        </div>
      </nav>
      <div
        className={
          isBurgerOpen ? "nav-link-mobile open" : "nav-link-mobile close"
        }
      >
        <Link to="/#subs" onClick={linkHandler}>
          Συνδρομές
        </Link>
        <hr></hr>
        <Link to="/#jackpots" onClick={linkHandler}>
          Jackpots
        </Link>
        <hr></hr>
        <Link to="/#kino" onClick={linkHandler}>
          Kino
        </Link>
        <hr></hr>
        <Link to="/#powerSpin" onClick={linkHandler}>
          PowerSpin
        </Link>
        <hr></hr>
      </div>
      {!isBurgerOpen && (
        <main>
          <section id="subs" className="subs">
            <h2>Ενεργές συνδρομές</h2>
            <div className="body-container">
              {subs.map((e) => (
                <div key={e._id} className="sub">
                  <div className="sub-title">{e.name}</div>
                  <div className="sub-main">
                    Απομένουν{" "}
                    {Math.floor((e.end - Date.now()) / 1000 / 60 / 60 / 24)}{" "}
                    Μέρες
                  </div>
                  <div className="sub-bar">
                    {Math.floor(
                      ((Date.now() - e.start) * 100) / (e.end - e.start)
                    )}
                    %
                  </div>
                </div>
              ))}
            </div>
          </section>
          <hr></hr>
          <section id="jackpots" className="power-spin">
            Jackpots
          </section>
          <hr></hr>
          <section id="kino" className="kino">
            Kino
          </section>
          <hr></hr>
          <section id="powerSpin" className="power-spin">
            PowerSpin
          </section>
        </main>
      )}
    </>
  );
}

export default Home;
