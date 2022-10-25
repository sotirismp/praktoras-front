import Draw from "./Draw";
import classes from "./DrawList.module.css";

const DrawList = (props) => {
  let tempDraws = [...props.draws];
  //tempDraws.pop();
  const content = tempDraws.map((draw) => (
    <Draw draw={draw} key={draw.drawId} />
  ));

  return <div className={classes.containerDrawList}>{content}</div>;
};

export default DrawList;
