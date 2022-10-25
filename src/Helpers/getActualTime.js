export async function getActualTime() {
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
}
