import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../UI/Powerspin/PowerspinDraws/components/Header";
import classes from "./PowerspinStats.module.css";
import { getActualTime } from "../Helpers/getActualTime";
import { sleep } from "../Helpers/sleep";
import PowerspinStatsContent from "../UI/Powerspin/PowerspinStats/Stats/PowerspinStatsContent";

function PowerspinStats(props) {
  const [timeDif, setTimeDif] = useState(0);
  const [activeDraw, setActiveDraw] = useState({ drawTime: 0, drawId: 0 });
  const [delays, setDelays] = useState(null);
  const [isInit, setIsInit] = useState(true);
  let navigate = useNavigate();

  const config = {
    method: "POST",
    body: JSON.stringify({ token: props.token }),
    headers: { "Content-Type": "application/json" },
  };

  useEffect(() => {
    if (!props.token) return navigate("/login");

    const fetchData = async () => {
      setTimeDif((await getActualTime()) - Date.now());

      const response = await fetch(props.host + "/powerspinStats", config);
      if (!response.ok || response.status !== 200) return navigate("/login");
      const data = await response.json();
      console.log(data);

      setIsInit(false);

      setActiveDraw({
        drawTime: data.active.drawTime,
        drawId: data.active.drawId,
      });

      setDelays(data.last);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!isInit) {
      const timer = setTimeout(async () => {
        let data, response;
        do {
          response = await fetch(props.host + "/powerspinStats", config);
          if (!response.ok || response.status !== 200)
            return navigate("/login");
          data = await response.json();
          await sleep(1000);
        } while (data.active.drawId === activeDraw.drawId);
        setActiveDraw({
          drawTime: data.active.drawTime,
          drawId: data.active.drawId,
        });
        setDelays(data.last);
      }, activeDraw.drawTime - Date.now() - timeDif + 5000);

      return () => clearTimeout(timer);
    }
  }, [activeDraw]);

  return (
    <div className={classes.background}>
      <div className={classes.container}>
        <Header
          nextDraw={activeDraw.drawTime}
          distributedMoney={1000}
          timeDif={timeDif}
        />
        <PowerspinStatsContent delays={delays} />
      </div>
    </div>
  );
}

export default PowerspinStats;
