import classes from "./Draw.module.css";

const Draw = (props) => {
  const colorClassChooser = (color, symbol) => {
    if (symbol) return classes.symbolBg;

    if (color.toLowerCase() === "red") return classes.redBg;
    if (color.toLowerCase() === "green") return classes.greenBg;
    if (color.toLowerCase() === "blue") return classes.blueBg;
  };

  const firstNum = [
    classes.drawCard,
    colorClassChooser(
      props.draw.listWinningNumbers[0].sidebets.color,
      props.draw.listWinningNumbers[0].sidebets.symbol
    ),
  ];
  const secondNum = [
    classes.drawCard,
    colorClassChooser(
      props.draw.listWinningNumbers[1].sidebets.color,
      props.draw.listWinningNumbers[1].sidebets.symbol
    ),
  ];
  const thirdNum = [
    classes.drawCard,
    colorClassChooser(
      props.draw.listWinningNumbers[2].sidebets.color,
      props.draw.listWinningNumbers[2].sidebets.symbol
    ),
  ];

  return (
    <div className={classes.containerDrawRow}>
      <div className={classes.drawTime}>
        {new Date(props.draw.drawTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </div>
      <div className={classes.containerDrawNumbers}>
        <div className={firstNum.join(" ")}>
          {props.draw.listWinningNumbers[0].list[0] <= 24
            ? props.draw.listWinningNumbers[0].list[0]
            : ""}
        </div>
        <div className={secondNum.join(" ")}>
          {props.draw.listWinningNumbers[1].list[0] <= 24
            ? props.draw.listWinningNumbers[1].list[0]
            : ""}
        </div>
        <div className={thirdNum.join(" ")}>
          {props.draw.listWinningNumbers[2].list[0] <= 24
            ? props.draw.listWinningNumbers[2].list[0]
            : ""}
        </div>
      </div>
    </div>
  );
};

export default Draw;
