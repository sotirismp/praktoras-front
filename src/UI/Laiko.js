import React from "react";
import { Link } from "react-router-dom";
import classes from "./Laiko.module.css";

function Laiko(props) {
  const epochToDate = (epoch) => {
    const d = new Date(props.laiko.next_draw * 1000);
    return (
      "" +
      d.getDate().toString().padStart(2, 0) +
      "/" +
      (d.getMonth() + 1).toString().padStart(2, 0) +
      "/" +
      d.getFullYear()
    );
  };

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  return (
    <div className={classes.laikoCon}>
      <div className={classes.laikoRow}>Jackpot Λαικού</div>
      <div className={classes.laikoRow}>
        <div className={classes.bold}>
          {numberWithCommas(props.laiko.jackpot)} €
        </div>
      </div>

      <div className={classes.laikoRow}>Επόμενη Κλήρωση</div>
      <div className={classes.laikoRow}>
        <div className={classes.bold}>{epochToDate(props.laiko.next_draw)}</div>
      </div>

      <div className={classes.laikoRow}>
        <a
          href={"http://laheia.gr" + props.laiko.url}
          className={classes.button}
          target="_blank"
        >
          Λήψη Λαικού PDF
        </a>
      </div>
    </div>
  );
}

export default Laiko;
