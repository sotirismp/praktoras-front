import "./PowerspinDraws.css";
import Header from "../UI/Powerspin/PowerspinDraws/components/Header";
import DrawList from "../UI/Powerspin/PowerspinDraws/components/Draws/DrawList";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

let timeDif = 0;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const getActualTime = async () => {
  document.title = "Κληρώσεις Power Spin";
  const resp = await fetch(
    "https://worldtimeapi.org/api/timezone/Europe/Athens"
  );
  const data = await resp.json();
  const arr = data.datetime.split("T");
  const date = arr[0].split("-");
  const year = date[0];
  const month = date[1];
  const day = date[2];
  const arr2 = arr[1].split(".");
  const time = arr2[0].split(":");
  const hours = time[0];
  const mins = time[1];
  const secs = time[2];

  return new Date(
    parseInt(year),
    parseInt(month) - 1,
    parseInt(day),
    parseInt(hours),
    parseInt(mins),
    parseInt(secs)
  ).getTime();
};

function PowerspinDraws(props) {
  const [draws, setDraws] = useState([]);
  const [distributedMoney, setDistributedMoney] = useState(0);
  const [timeDif, setTimeDif] = useState(0);
  const [activeDraw, setActiveDraw] = useState({ drawTime: 0, drawId: 0 });
  const [isInit, setIsInit] = useState(true);
  let navigate = useNavigate();

  useEffect(() => {
    if (!props.token) return navigate("/login");

    const fetchData = async () => {
      setTimeDif((await getActualTime()) - Date.now());

      const response = await fetch(props.host + "/draws", {
        method: "POST",
        body: JSON.stringify({ token: props.token }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok || response.status !== 200) return navigate("/login");
      const data = await response.json();

      data.last.pop();

      const formattedData = data.last.map((draw) => {
        return {
          drawId: draw.drawId,
          drawTime: draw.drawTime,
          listWinningNumbers: draw.listWinningNumbers,
        };
      });

      setDistributedMoney(
        data.last[0].prizeCategories.reduce((sum, cur) => {
          return sum + cur.distributed;
        }, 0)
      );

      setIsInit(false);
      setActiveDraw({
        drawTime: data.active.drawTime,
        drawId: data.active.drawId,
      });
      setDraws(formattedData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!isInit) {
      const timer = setTimeout(async () => {
        let data, response;
        do {
          response = await fetch(props.host + "/draw", {
            method: "POST",
            body: JSON.stringify({ token: props.token }),
            headers: { "Content-Type": "application/json" },
          });
          data = await response.json();
          if (!response.ok || response.status !== 200)
            return navigate("/login");
          await sleep(1000);
        } while (data.last.drawId !== activeDraw.drawId);

        const lastFormattedDraw = {
          drawId: data.last.drawId,
          drawTime: data.last.drawTime,
          listWinningNumbers: data.last.listWinningNumbers,
        };
        let tempDraws = [...draws];

        tempDraws.pop();
        tempDraws.unshift(lastFormattedDraw);

        setDistributedMoney(
          data.last.prizeCategories.reduce((sum, cur) => {
            return sum + cur.distributed;
          }, 0)
        );

        setActiveDraw({
          drawTime: data.active.drawTime,
          drawId: data.active.drawId,
        });
        setDraws(tempDraws);
      }, activeDraw.drawTime - Date.now() - timeDif + 5000);

      return () => clearTimeout(timer);
    }
  }, [activeDraw]);

  return (
    <div className="powerspin-container">
      <Header
        nextDraw={activeDraw.drawTime}
        distributedMoney={distributedMoney}
        timeDif={timeDif}
      />
      <DrawList draws={draws} />
    </div>
  );
}

export default PowerspinDraws;
