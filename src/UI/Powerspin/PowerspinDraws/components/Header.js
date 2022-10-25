import CountdownTimer from "./CountdownTimer/CountdownTimer";
import classes from "./Header.module.css";

const Header = (props) => {
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  return (
    <div className={classes.headerContainer}>
      <div className={classes.logoContainer}>
        <div className={classes.logo}></div>
      </div>
      <div className={classes.mainContainer}>
        <div className={classes.title}>PRAKTORAS.COM</div>
        <div className={classes.info}>
          Κέρδη τελευταίας κλήρωσης{" "}
          {numberWithCommas(Math.ceil(props.distributedMoney))} €
        </div>
      </div>
      <CountdownTimer nextDraw={props.nextDraw} timeDif={props.timeDif} />
    </div>
  );
};

export default Header;
