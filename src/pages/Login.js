import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../UI/Card";
import Container from "../UI/Container";

import "./Login.css";
import SvgUser from "../assets/SvgUser.js";
import SvgLock from "../assets/SvgLock.js";

const Login = (props) => {
  let navigate = useNavigate();

  const userRef = useRef();
  const passRef = useRef();
  const [error, setError] = useState(null);
  const [userSvgIcon, setUserSvgIcon] = useState("#fff");
  const [lockSvgIcon, setLockSvgIcon] = useState("#fff");
  useEffect(() => {
    if (props.token) return navigate("/");
  }, []);

  const onKeyInputPassword = (e) => {
    if (e.keyCode === 13) loginHandler();
  };

  const loginHandler = async () => {
    const resp = await fetch(props.host + "/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        username: userRef.current.value,
        password: passRef.current.value,
      }),
    });
    const data = await resp.json();
    if (resp.status === 200) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      props.setData({ token: data.token, username: data.username });
      navigate("/");
    } else {
      console.log(data.message);
      setError({ message: data.message });
    }
  };

  const focusInputUsername = () => {
    setError(null);
    setUserSvgIcon("var(--red)");
  };
  const blurInputUsername = () => {
    setUserSvgIcon("#fff");
  };
  const focusInputPassword = () => {
    setError(null);
    setLockSvgIcon("var(--red)");
  };
  const blurInputPassword = () => {
    setLockSvgIcon("#fff");
  };
  return (
    <>
      {!props.token && (
        <Container className="container">
          <Card>
            <div className="card-row">
              <div className="logo">Praktoras</div>
            </div>
            <div className="card-row">
              <SvgUser className="icon" color={userSvgIcon} />
              <input
                ref={userRef}
                className="input"
                placeholder="Username"
                onClick={focusInputUsername}
                onBlur={blurInputUsername}
              ></input>
            </div>
            <div className="card-row">
              <SvgLock className="icon" color={lockSvgIcon} />
              <input
                type="password"
                ref={passRef}
                className="input"
                placeholder="Password"
                onClick={focusInputPassword}
                onBlur={blurInputPassword}
                onKeyDown={onKeyInputPassword}
              ></input>
            </div>
            <div className="card-row">
              <button className="submit" onClick={loginHandler}>
                Login
              </button>
            </div>
            <div className="card-row">
              {error && (
                <div
                  className="message"
                  style={{ backgroundColor: error.color }}
                >
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
      )}
    </>
  );
};

export default Login;
