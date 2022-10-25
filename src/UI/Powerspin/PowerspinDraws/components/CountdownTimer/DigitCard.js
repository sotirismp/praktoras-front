import React from "react";
import classes from "./DigitCard.module.css";

function DigitCard(props) {
  return (
    <div className={classes.digitCardContainer}>
      <div className={classes.digitCardDigits}>
        {props.digits.toString().padStart(2, "0")}
      </div>
      <div className={classes.digitCardText}>{props.text}</div>
    </div>
  );
}

export default DigitCard;
