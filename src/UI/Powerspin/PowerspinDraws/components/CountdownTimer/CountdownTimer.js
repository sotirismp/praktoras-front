import { useState, useEffect } from "react";
import DigitCard from "./DigitCard";
import Spinner from "../UI/Spinner";
import classes from "./CountdownTimer.module.css";

function CountdownTimer(props) {
  const [remainingTime, setRemainingTime] = useState(0);
  console.log(remainingTime);
  const [timeLeft, setTimeLeft] = useState({
    secs: 0,
    mins: 0,
    hours: 0,
  });

  const calculateTimeLeft = () => {
    const dateNow = Date.now() + props.timeDif;
    setRemainingTime(props.nextDraw - dateNow);
    setTimeLeft(secondsToTime(props.nextDraw - dateNow));
  };

  const secondsToTime = (_secs) => {
    const secs = Math.floor((_secs / 1000) % 60);
    const mins = Math.floor((_secs / 1000 / 60) % 60);
    const hours = Math.floor((_secs / 1000 / 60 / 60) % 24);
    return { secs: secs, mins: mins, hours: hours };
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      calculateTimeLeft();
    }, 1000);

    return () => clearTimeout(timer);
  });

  let content = <Spinner />;
  if (remainingTime > 0)
    content = (
      <>
        <DigitCard digits={timeLeft.hours} text="ΩΡΕΣ" />
        <DigitCard digits={timeLeft.mins} text="ΛΕΠΤΑ" />
        <DigitCard digits={timeLeft.secs} text="ΔΕΥΤ/ΠΤΑ" />
      </>
    );

  return (
    <div className={classes.countdownTimerContainer}>
      <div className={classes.countdownTimerTitle}>ΕΠΟΜΕΝΗ ΚΛΗΡΩΣΗ</div>
      <div className={classes.countdownDigitsContainer}>{content}</div>
    </div>
  );
}

export default CountdownTimer;
