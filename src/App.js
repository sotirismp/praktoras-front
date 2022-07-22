import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import "./App.css";
import { useEffect, useState } from "react";

const host = "http://192.168.1.100:9000";
//const host = "";

function App() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    token: localStorage.getItem("token"),
    username: localStorage.getItem("username"),
  });

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setData({});
    navigate("/login");
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            token={data.token}
            username={data.username}
            logoutHandler={logoutHandler}
            data={data}
            host={host}
          />
        }
      />
      <Route
        path="/login"
        element={<Login token={data.token} setData={setData} host={host} />}
      />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
