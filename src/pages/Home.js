import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../UI/Navbar";
import Spinner from "../UI/Spinner";
import "./Home.css";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function Home(props) {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [subs, setSubs] = useState([]);
  const [laiko, setLaiko] = useState(null);
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
        setSubs([...data.subs]);
        const resp2 = await fetch(props.host + "/laiko", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            token: props.data.token,
          }),
        });
        const laikoData = await resp2.json();
        console.log(laikoData);
        setLaiko(laikoData);
        const resp3 = await fetch(props.host + "/jackpots", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            token: props.data.token,
          }),
        });
        const jackpots = await resp3.json();
        console.log(jackpots);
      } else {
        props.logoutHandler();
      }
    };
    checkToken();
  }, [navigate]);

  const burgerHandler = (e) => {
    setIsBurgerOpen((prevIsBurgerOpen) => !prevIsBurgerOpen);
  };

  const linkHandler = async (e) => {
    if (isBurgerOpen) setIsBurgerOpen(!isBurgerOpen);
    await sleep(25);
    document
      .getElementById(e.view.location.hash.substring(1))
      .scrollIntoView({ behavior: "smooth", "padding-top": "10vh" });
    document.getElementById(e.view.location.hash.substring(1)).scrollTop -= 200;
  };

  const epochToDate = (epoch) => {
    const today = new Date(epoch);
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    const formattedToday = dd + "/" + mm + "/" + yyyy;
    return formattedToday;
  };

  /* <Nav.Link onClick={props.logoutHandler}>Logout</Nav.Link>;
   */
  return (
    <>
      <Navbar
        isBurgerOpen={isBurgerOpen}
        burgerHandler={burgerHandler}
        linkHandler={linkHandler}
        username={props.username}
      ></Navbar>
      {!isBurgerOpen && (
        <main>
          <section id="jackpots">
            Jackpots
            {!laiko && <Spinner>Loading Λαικό</Spinner>}
          </section>
          <hr></hr>

          <section id="subs" className="subs">
            <h2>Ενεργές συνδρομές</h2>
            <div className="body-container">
              {subs.map((e) => (
                <div key={e._id} className="sub">
                  <div className="sub-title">{e.name}</div>
                  <div className="sub-main">
                    <div className="card__face card__face--front">
                      Απομένουν{" "}
                      {Math.floor((e.end - Date.now()) / 1000 / 60 / 60 / 24)}{" "}
                      Μέρες
                    </div>
                    <div className="card__face card__face--back">
                      Εναρξη συνδρομής: {epochToDate(e.start)}
                      <br></br>
                      Λήξη συνδρομής: {epochToDate(e.end)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <hr></hr>
          <section id="kino">Kino</section>
          <hr></hr>
          <section id="powerSpin">PowerSpin</section>
        </main>
      )}
    </>
  );
}

export default Home;
