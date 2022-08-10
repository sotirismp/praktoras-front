import React from "react";
import { Link } from "react-router-dom";
import "./Laiko.css";

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
    <div className="laiko-con">
      <div className="laiko-row">
        Jackpot Λαικού:{" "}
        <div className="bold">{numberWithCommas(props.laiko.jackpot)} €</div>
      </div>
      <div className="laiko-row">
        Επόμενη Κλήρωση:{" "}
        <div className="bold">{epochToDate(props.laiko.next_draw)}</div>
      </div>
      <div className="laiko-row">
        <a
          href={"http://laheia.gr" + props.laiko.url}
          className="button"
          target="_blank"
        >
          Λήψη PDF
        </a>
      </div>
    </div>
  );
}

export default Laiko;
