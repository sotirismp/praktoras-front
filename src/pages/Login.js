import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../UI/Card";
import Container from "../UI/Container";

import "./Login.css";
import SvgUser from "../assets/SvgUser.js";
import SvgLock from "../assets/SvgLock.js";

const Login = (props) => {
  let navigate = useNavigate();
  useEffect(() => {
    if (props.token) navigate("/");
  }, []);
  const userRef = useRef();
  const passRef = useRef();
  const messageText = "Hello guys this is message error text";
  const [token, setToken] = useState();
  const [error, setError] = useState(null);
  const [userSvgIcon, setUserSvgIcon] = useState("#000");
  const [lockSvgIcon, setLockSvgIcon] = useState("#000");

  const loginHandler = async () => {
    const resp = await fetch("http://localhost:9000/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        username: userRef.current.value,
        password: passRef.current.value,
      }),
    });
    if (resp.status === 200) {
      const data = await resp.json();
      props.setToken(data.token);
      navigate("/");
    } else {
      setError({ message: "Wrong credentials", color: "red" });
    }
  };

  const focusInputUsername = () => {
    setError(null);
    setUserSvgIcon("#fff");
  };
  const blurInputUsername = () => {
    setUserSvgIcon("#000");
  };
  const focusInputPassword = () => {
    setError(null);
    setLockSvgIcon("#fff");
  };
  const blurInputPassword = () => {
    setLockSvgIcon("#000");
  };
  return (
    <Container className="container">
      <Card>
        <div className="card-row">
          <div className="logo">Praktoras</div>
        </div>
        <div className="card-row">
          <SvgUser width={15} height={15} color={userSvgIcon} />
          <input
            ref={userRef}
            className="input"
            placeholder="Username"
            onClick={focusInputUsername}
            onBlur={blurInputUsername}
          ></input>
        </div>
        <div className="card-row">
          <SvgLock width={15} height={15} color={lockSvgIcon} />
          <input
            type="password"
            ref={passRef}
            className="input"
            placeholder="Password"
            onClick={focusInputPassword}
            onBlur={blurInputPassword}
          ></input>
        </div>
        <div className="card-row">
          <button className="submit" onClick={loginHandler}>
            Login
          </button>
        </div>
        <div className="card-row">
          {error && (
            <div className="message" style={{ backgroundColor: error.color }}>
              {error.message}
            </div>
          )}
        </div>
        <div className="hr-line"></div>
        <div className="card-row">
          <Link to={{ pathname: "/register" }}>Εκδήλωση Ενδιαφέροντος</Link>
        </div>
      </Card>
    </Container>
  );
};

export default Login;
