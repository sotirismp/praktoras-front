import React from "react";
import classes from "./PowerspinStatsItem.module.css";

function PowerspinStatsItem({ title, delays }) {
  return (
    <div className={classes.mainItem}>
      <div className={classes.title}>{title}</div>
      <div className={classes.numbersContainer}>
        {/* <div className={classes.numberItem}>
          <div className={classes.indexNumber}>20</div>
          <div
            className={classes.progressNumber}
            style={{ width: "100%" }}
          ></div>
          <div className={classes.drawsNumber}>39</div>
        </div> */}
        <div className={classes.numberItem}></div>
        <div className={classes.numberItem}></div>
        <div className={classes.numberItem}></div>
        <div className={classes.numberItem}></div>
      </div>
      <div className={classes.sidebetsContainer}></div>
    </div>
  );
}

export default PowerspinStatsItem;
