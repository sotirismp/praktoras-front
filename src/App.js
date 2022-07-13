import { Link, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import "./App.css";
import { useState } from "react";

function App() {
  const [token, setToken] = useState(null);
  return (
    <Routes>
      <Route path="/" element={<Home token={token} />} />
      <Route
        path="/login"
        element={<Login token={token} setToken={setToken} />}
      />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
