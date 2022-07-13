import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Home(props) {
  let navigate = useNavigate();
  useEffect(() => {
    if (!props.token) navigate("/login");
  }, []);
  return (
    <div>
      <Link to="/login">Login </Link>
      <br></br>
      <Link to="/register">Register </Link>
    </div>
  );
}

export default Home;
