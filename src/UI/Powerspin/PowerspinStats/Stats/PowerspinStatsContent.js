import React from "react";
import classes from "./PowerspinStatsContent.module.css";
import PowerspinStatsItem from "./PowerspinStatsItem";

function PowerspinStatsContent(props) {
  const data = [
    {
      title: "",
      delays: {
        numbers: [
          { index: 20, draws: 50 },
          { index: 14, draws: 28 },
          { index: 13, draws: 21 },
          { index: 1, draws: 7 },
          { index: 2, draws: 98 },
        ],
        sidebets: {
          red: 50,
          green: 2,
          blue: 10,
          symbol: 87,
        },
      },
    },
    {},
    {},
  ];

  return (
    <div className={classes.mainContentContainer}>
      <div className={classes.mainContent}>
        <div className={classes.mainContentTitle}>Καθυστερήσεις PowerSpin</div>
        <div className={classes.container}>
          <PowerspinStatsItem title={"1ος Τροχός"} delays={data[0].delays} />
          <PowerspinStatsItem title={"2ος Τροχός"} delays={data[0].delays} />
          <PowerspinStatsItem title={"3ος Τροχός"} delays={data[0].delays} />
          {/* <PowerspinStatsItem title="Καθυστερήσεις #1 spin" />
        <PowerspinStatsItem title="Καθυστερήσεις #1 spin" /> */}
        </div>
      </div>
    </div>
  );
}

export default PowerspinStatsContent;
