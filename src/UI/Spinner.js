import React from "react";
import "./Spinner.css";

function Spinner(props) {
  return (
    <div className="spinner">
      {props.children}
      <svg className="svg" viewBox="0 0 50 50">
        <circle
          className="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="5"
        ></circle>
      </svg>
    </div>
  );
}

export default Spinner;
