import React from "react";
import Card from "../UI/Card";
import Container from "../UI/Container";
import { Link } from "react-router-dom";

function Register() {
  return (
    <Container>
      <Card>
        <div className="logo">Praktoras</div>
        <div className="card-row">
          <input className="input" placeholder="Όνομα"></input>
        </div>
        <div className="card-row">
          <input className="input" placeholder="Επίθετο"></input>
        </div>
        <div className="card-row">
          <input className="input" placeholder="Τηλέφωνο"></input>
        </div>
        <div className="card-row">
          <input className="input" placeholder="Κωδικός Πρακτορείου"></input>
        </div>
        <div className="card-row">
          <button className="submit">Εκδήλωση Ενδιαφέροντος</button>
        </div>
        <div className="card-row">
          <Link to={{ pathname: "/login" }}>Πίσω στην είσοδο</Link>
        </div>
      </Card>
    </Container>
  );
}

export default Register;
