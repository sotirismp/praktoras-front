import React from "react";
import "./Jackpots.css";
import { AiOutlineCheck } from "react-icons/ai";
import tzokerLogo from "../assets/tzoker1.png";
import lottoLogo from "../assets/lotto.png";
import protoLogo from "../assets/proto.png";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function isTuesday(time, day) {
  //day 0=sunday, 1=monday etc..
  const drawDate = new Date(time);
  return drawDate.getDay() === day ? true : false;
}
function epochToDate(epoch) {
  let j = new Date(epoch);
  return (
    j.getUTCDate().toString().padStart(2, "0") +
    "/" +
    (j.getUTCMonth() + 1).toString().padStart(2, "0") +
    "/" +
    j.getUTCFullYear()
  );
}

function Jackpots(props) {
  async function printDiv(id) {
    let w = window.open();
    w.document.write(`<style>.jackpot-con {
        --width: 1000px;
        min-width: var(--width);
        margin-top: 3vh;
        width: var(--width);
        height: calc(var(--width) * 1.4142);
        color: black !important;
        background-color: white;
        border-radius: 1vh;
        font-size: calc(var(--width) * 0.075);
        overflow: hidden;
      }
      .jackpot-logo {
        width: 100%;
        height: 12.5%;
      }
      .title-con {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 15%;
      }
      
      .draw-info {
        width: 45%;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
      }
      .draw-info div {
        color: black !important;
      }
      .draw-info div:nth-child(2) {
        color: red !important;
      }
      .draw-info div:nth-child(4) {
        color: red !important;
      }
      .draw-info div {
      }
      .red {
        font-size: inherit;
        color: red !important;
      }
      .draw-day-con td {
        font-size: calc(var(--width) * 0.03);
        color: black !important;
        padding: 10px 50px 10px 50px;
        border: 1px solid black;
      }
      .tzoker-day-con div,
      div {
        font-size: calc(var(--width) * 0.05);
      }
      .info {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: calc(var(--width) * 0.05);
        height: 5%;
        color: black !important;
      }
      .draw-numbers {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 10%;
        border: 1px solid black;
      }
      .draw-numbers div {
        color: red !important;
        font-size: calc(var(--width) * 0.1);
      }
      .draw-results {
        height: 30%;
        width: 100%;
        table-layout: fixed;
      }
      .draw-results th {
        color: BLACK !important;
        border: 1px solid black;
        font-size: calc(var(--width) * 0.02);
      }
      .draw-results td {
        font-size: calc(var(--width) * 0.035);
        color: BLACK !important;
        border: 1px solid black;
        text-align:center;
      }
      .jackpot-prize {
        height: 12.5%;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        color: red !important;
        border-bottom: 1px solid black;
        font-size: calc(var(--width) * 0.175);
        font-weight: 900;
      }
      .jackpot-footer {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 10%;
        color: black !important;
        text-align:center;
        font-size: calc(var(--width) * 0.025);
      }
      </style>`);
    w.document.write(`<div class='jackpot-con'>`);
    w.document.write(document.getElementById(id).innerHTML);
    w.document.write(`</div>`);
    await sleep(50);
    w.print();
    w.close();
  }

  return (
    <>
      <div className="jackpot-con" id="joker" onClick={() => printDiv("joker")}>
        <img src={tzokerLogo} className="jackpot-logo" alt="Tzoker logo"></img>
        <div className="title-con">
          <table className="draw-day-con">
            <thead></thead>
            <tbody>
              <tr>
                <td>ΤΡΙΤΗ</td>
                <td>
                  {isTuesday(props.jackpots?.data.joker.last.drawTime, 2) && (
                    <AiOutlineCheck style={{ fill: "red" }} />
                  )}
                </td>
              </tr>
              <tr>
                <td>ΠΕΜΠΤΗ</td>
                <td>
                  {isTuesday(props.jackpots?.data.joker.last.drawTime, 4) && (
                    <AiOutlineCheck style={{ fill: "red" }} />
                  )}
                </td>
              </tr>
              <tr>
                <td>ΚΥΡΙΑΚΗ</td>
                <td>
                  {isTuesday(props.jackpots?.data.joker.last.drawTime, 1) && (
                    <AiOutlineCheck style={{ fill: "red" }} />
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="draw-info">
            <div>ΚΛΗΡΩΣΗ:</div>
            <div>&nbsp;{props.jackpots?.data.joker.last.drawId}</div>
            <div>ΤΗΣ:</div>
            <div>
              &nbsp;{epochToDate(props.jackpots?.data.joker.last.drawTime)}
            </div>
          </div>
        </div>
        <div className="info">ΑΡΙΘΜΟΙ ΠΟΥ ΚΛΗΡΩΘΗΚΑΝ</div>
        <div className="draw-numbers">
          <div>{props.jackpots?.data.joker.last.winningNumbers.list[0]}</div>
          <div>{props.jackpots?.data.joker.last.winningNumbers.list[1]}</div>
          <div>{props.jackpots?.data.joker.last.winningNumbers.list[2]}</div>
          <div>{props.jackpots?.data.joker.last.winningNumbers.list[3]}</div>
          <div>{props.jackpots?.data.joker.last.winningNumbers.list[4]}</div>
          <div>+</div>
          <div>{props.jackpots?.data.joker.last.winningNumbers.bonus[0]}</div>
        </div>
        <div className="info">ΑΠΟΤΕΛΕΣΜΑΤΑ ΔΙΑΛΟΓΗΣ</div>
        <table className="draw-results">
          <tbody>
            <tr>
              <th>ΚΑΤΗΓΟΡΙΕΣ ΕΠΙΤΥΧΙΩΝ</th>
              <th>ΣΩΣΤΕΣ ΠΡΟΒΛΕΨΕΙΣ</th>
              <th>ΕΠΙΤΥΧΙΕΣ</th>
              <th>ΚΕΡΔΟΣ ΑΝΑ ΕΠΙΤΥΧΙΑ</th>
            </tr>
            <tr>
              <td>I</td>
              <td>5+1</td>
              <td>
                <div className="red">
                  {props.jackpots?.data.joker.last.prizeCategories[0].winners}
                </div>
              </td>
              <td>
                <div className="red">
                  {numberWithCommas(
                    props.jackpots?.data.joker.last.prizeCategories[0].divident
                  )}{" "}
                  €
                </div>
              </td>
            </tr>
            <tr>
              <td>II</td>
              <td>5</td>
              <td>
                <div className="red">
                  {props.jackpots?.data.joker.last.prizeCategories[1].winners}
                </div>
              </td>
              <td>
                <div className="red">
                  {numberWithCommas(
                    props.jackpots?.data.joker.last.prizeCategories[1].divident
                  )}{" "}
                  €
                </div>
              </td>
            </tr>
            <tr>
              <td>III</td>
              <td>4+1</td>
              <td>
                <div className="red">
                  {props.jackpots?.data.joker.last.prizeCategories[2].winners}
                </div>
              </td>
              <td>2.500 €</td>
            </tr>
            <tr>
              <td>IV</td>
              <td>4</td>
              <td>
                <div className="red">
                  {props.jackpots?.data.joker.last.prizeCategories[3].winners}
                </div>
              </td>
              <td>50,00 €</td>
            </tr>
            <tr>
              <td>V</td>
              <td>3+1</td>
              <td>
                <div className="red">
                  {props.jackpots?.data.joker.last.prizeCategories[4].winners}
                </div>
              </td>
              <td>50,00 €</td>
            </tr>
            <tr>
              <td>VI</td>
              <td>3</td>
              <td>
                <div className="red">
                  {props.jackpots?.data.joker.last.prizeCategories[5].winners}
                </div>
              </td>
              <td>2,00 €</td>
            </tr>
            <tr>
              <td>VII</td>
              <td>2+1</td>
              <td>
                <div className="red">
                  {props.jackpots?.data.joker.last.prizeCategories[6].winners}
                </div>
              </td>
              <td>2,00 €</td>
            </tr>
            <tr>
              <td>VIII</td>
              <td>1+1</td>
              <td>
                <div className="red">
                  {props.jackpots?.data.joker.last.prizeCategories[7].winners}
                </div>
              </td>
              <td>1,50 €</td>
            </tr>
          </tbody>
        </table>
        <div className="jackpot-prize">
          {numberWithCommas(
            props.jackpots?.data.joker.active.prizeCategories[0]
              .minimumDistributed
          )}{" "}
          €
        </div>
        <div className="jackpot-footer">
          ΤΟΥΛΑΧΙΣΤΟΝ ΘΑ ΜΟΙΡΑΣΤΟΥ ΟΙ ΤΥΧΕΡΟΙ ΝΙΚΗΤΕΣ ΤΗΣ Ι ΚΑΤΗΓΟΡΙΑΣ ΣΤΗΝ
          ΕΠΟΜΕΝΗ ΚΛΗΡΩΣΗ
        </div>
      </div>
      <div className="jackpot-con" id="lotto" onClick={() => printDiv("lotto")}>
        <img src={lottoLogo} className="jackpot-logo" alt="Lotto logo"></img>
        <div className="title-con">
          <table className="draw-day-con">
            <tbody>
              <tr>
                <td>ΤΕΤΑΡΤΗ</td>
                <td>
                  {isTuesday(props.jackpots?.data.lotto.last.drawTime, 3) && (
                    <AiOutlineCheck style={{ fill: "red" }} />
                  )}
                </td>
              </tr>
              <tr>
                <td>ΣΑΒΒΑΤΟ</td>
                <td>
                  {isTuesday(props.jackpots?.data.lotto.last.drawTime, 6) && (
                    <AiOutlineCheck style={{ fill: "red" }} />
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="draw-info">
            <div>ΚΛΗΡΩΣΗ:</div>
            <div>&nbsp;{props.jackpots?.data.lotto.last.drawId}</div>
            <div>ΤΗΣ:</div>
            <div>
              &nbsp;{epochToDate(props.jackpots?.data.lotto.last.drawTime)}
            </div>
          </div>
        </div>
        <div className="info">ΑΡΙΘΜΟΙ ΠΟΥ ΚΛΗΡΩΘΗΚΑΝ</div>
        <div className="draw-numbers">
          <div>{props.jackpots?.data.lotto.last.winningNumbers.list[0]}</div>
          <div>{props.jackpots?.data.lotto.last.winningNumbers.list[1]}</div>
          <div>{props.jackpots?.data.lotto.last.winningNumbers.list[2]}</div>
          <div>{props.jackpots?.data.lotto.last.winningNumbers.list[3]}</div>
          <div>{props.jackpots?.data.lotto.last.winningNumbers.list[4]}</div>
          <div>{props.jackpots?.data.lotto.last.winningNumbers.list[5]}</div>
          <div>+</div>
          <div>{props.jackpots?.data.lotto.last.winningNumbers.bonus}</div>
        </div>
        <div className="info">ΑΠΟΤΕΛΕΣΜΑΤΑ ΔΙΑΛΟΓΗΣ</div>
        <div>
          <table className="draw-results">
            <tbody>
              <tr>
                <th>ΚΑΤΗΓΟΡΙΕΣ ΕΠΙΤΥΧΙΩΝ</th>
                <th>ΣΩΣΤΕΣ ΠΡΟΒΛΕΨΕΙΣ</th>
                <th>ΕΠΙΤΥΧΙΕΣ</th>
                <th>ΚΕΡΔΟΣ ΑΝΑ ΕΠΙΤΥΧΙΑ</th>
              </tr>
              <tr>
                <td>I</td>
                <td>6</td>
                <td>
                  <div className="red">
                    {props.jackpots?.data.lotto.last.prizeCategories[0].winners}
                  </div>
                </td>
                <td>
                  <div className="red">
                    {
                      props.jackpots?.data.lotto.last.prizeCategories[0]
                        .divident
                    }
                  </div>
                </td>
              </tr>
              <tr>
                <td>II</td>
                <td>5+1</td>
                <td>
                  <div className="red">
                    {props.jackpots?.data.lotto.last.prizeCategories[1].winners}
                  </div>
                </td>
                <td>50.000 €</td>
              </tr>
              <tr>
                <td>III</td>
                <td>5</td>
                <td>
                  <div className="red">
                    {props.jackpots?.data.lotto.last.prizeCategories[2].winners}
                  </div>
                </td>
                <td>1.500 €</td>
              </tr>
              <tr>
                <td>IV</td>
                <td>4</td>
                <td>
                  <div className="red">
                    {props.jackpots?.data.lotto.last.prizeCategories[3].winners}
                  </div>
                </td>
                <td>30,00 €</td>
              </tr>
              <tr>
                <td>V</td>
                <td>3</td>
                <td>
                  <div className="red">
                    {props.jackpots?.data.lotto.last.prizeCategories[4].winners}
                  </div>
                </td>
                <td>1,50 €</td>
              </tr>
            </tbody>
          </table>
          <div className="jackpot-prize">
            {numberWithCommas(
              props.jackpots?.data.lotto.active.prizeCategories[0]
                .minimumDistributed
            )}{" "}
            €
          </div>
          <div className="jackpot-footer">
            ΤΟΥΛΑΧΙΣΤΟΝ ΘΑ ΜΟΙΡΑΣΤΟΥ ΟΙ ΤΥΧΕΡΟΙ ΝΙΚΗΤΕΣ ΤΗΣ Ι ΚΑΤΗΓΟΡΙΑΣ ΣΤΗΝ
            ΕΠΟΜΕΝΗ ΚΛΗΡΩΣΗ
          </div>
        </div>
      </div>
      <div className="jackpot-con" id="proto" onClick={() => printDiv("proto")}>
        <img src={protoLogo} className="jackpot-logo" alt="Proto logo"></img>
        <div className="title-con">
          <table className="draw-day-con">
            <tbody>
              <tr>
                <td>ΤΡΙΤΗ</td>
                <td>
                  {isTuesday(props.jackpots?.data.proto.last.drawTime, 2) && (
                    <AiOutlineCheck style={{ fill: "red" }} />
                  )}
                </td>
              </tr>
              <tr>
                <td>ΠΕΜΠΤΗ</td>
                <td>
                  {isTuesday(props.jackpots?.data.proto.last.drawTime, 4) && (
                    <AiOutlineCheck style={{ fill: "red" }} />
                  )}
                </td>
              </tr>
              <tr>
                <td>ΚΥΡΙΑΚΗ</td>
                <td>
                  {isTuesday(props.jackpots?.data.proto.last.drawTime, 1) && (
                    <AiOutlineCheck style={{ fill: "red" }} />
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="draw-info">
            <div>ΚΛΗΡΩΣΗ:</div>
            <div>&nbsp;{props.jackpots?.data.proto.last.drawId}</div>
            <div>ΤΗΣ:</div>
            <div>
              &nbsp;{epochToDate(props.jackpots?.data.proto.last.drawTime)}
            </div>
          </div>
        </div>
        <div className="info">ΑΡΙΘΜΟΣ ΠΟΥ ΚΛΗΡΩΘΗΚΕ</div>
        <div className="draw-numbers">
          <div>{props.jackpots?.data.proto.last.winningNumbers.list[0]}</div>
          <div>{props.jackpots?.data.proto.last.winningNumbers.list[1]}</div>
          <div>{props.jackpots?.data.proto.last.winningNumbers.list[2]}</div>
          <div>{props.jackpots?.data.proto.last.winningNumbers.list[3]}</div>
          <div>{props.jackpots?.data.proto.last.winningNumbers.list[4]}</div>
          <div>{props.jackpots?.data.proto.last.winningNumbers.list[5]}</div>
          <div>{props.jackpots?.data.proto.last.winningNumbers.list[6]}</div>
        </div>
        <div className="info">ΑΠΟΤΕΛΕΣΜΑΤΑ ΔΙΑΛΟΓΗΣ</div>
        <table className="draw-results">
          <tbody>
            <tr>
              <th>ΚΑΤΗΓΟΡΙΕΣ ΕΠΙΤΥΧΙΩΝ</th>
              <th>ΣΩΣΤΕΣ ΠΡΟΒΛΕΨΕΙΣ</th>
              <th>ΕΠΙΤΥΧΙΕΣ</th>
              <th>ΚΕΡΔΟΣ ΑΝΑ ΕΠΙΤΥΧΙΑ</th>
            </tr>
            <tr>
              <td>I</td>
              <td>7</td>
              <td>
                <div className="red">
                  {props.jackpots?.data.proto.last.prizeCategories[0].winners}
                </div>
              </td>
              <td>
                <div className="red">
                  {props.jackpots?.data.proto.last.prizeCategories[0].divident}{" "}
                  €
                </div>
              </td>
            </tr>
            <tr>
              <td>II</td>
              <td>6</td>
              <td>
                <div className="red">
                  {props.jackpots?.data.proto.last.prizeCategories[1].winners}
                </div>
              </td>
              <td>
                <div className="red">25.000,00 €</div>
              </td>
            </tr>
            <tr>
              <td>III</td>
              <td>5</td>
              <td>
                <div className="red">
                  {props.jackpots?.data.proto.last.prizeCategories[2].winners}
                </div>
              </td>
              <td>2.500,00 €</td>
            </tr>
            <tr>
              <td>IV</td>
              <td>4</td>
              <td>
                <div className="red">
                  {props.jackpots?.data.proto.last.prizeCategories[3].winners}
                </div>
              </td>
              <td>250,00 €</td>
            </tr>
            <tr>
              <td>V</td>
              <td>3</td>
              <td>
                <div className="red">
                  {props.jackpots?.data.proto.last.prizeCategories[4].winners}
                </div>
              </td>
              <td>25,00 €</td>
            </tr>
            <tr>
              <td>VI</td>
              <td>2</td>
              <td>
                <div className="red">
                  {props.jackpots?.data.proto.last.prizeCategories[5].winners}
                </div>
              </td>
              <td>2,00 €</td>
            </tr>
          </tbody>
        </table>
        <div className="jackpot-prize">
          {numberWithCommas(
            props.jackpots?.data.proto.active.prizeCategories[0]
              .minimumDistributed
          )}{" "}
          €
        </div>
        <div className="jackpot-footer">
          ΤΟΥΛΑΧΙΣΤΟΝ ΘΑ ΜΟΙΡΑΣΤΟΥ ΟΙ ΤΥΧΕΡΟΙ ΝΙΚΗΤΕΣ ΤΗΣ Ι ΚΑΤΗΓΟΡΙΑΣ ΣΤΗΝ
          ΕΠΟΜΕΝΗ ΚΛΗΡΩΣΗ
        </div>
      </div>
    </>
  );
}

export default Jackpots;
