import React from "react";
import { Link } from "react-router-dom";
import classes from "./PageNotFound.module.css";

function PageNotFound() {
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>404 Page not found</h1>
      <Link className={classes.subtitle} to="/">
        Go Home
      </Link>
    </div>
  );
}

export default PageNotFound;
