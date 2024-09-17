import "./Forecast.css";
import React from "react";
import { Table } from "reactstrap";

export default function Forecast({ idojarasInfo }) {
  if (idojarasInfo === null) {
    return <div> Choose a city </div>;
  }

  const currentRowsJsx = [];
  const currentUnits = idojarasInfo.idojaras.current_units;
  const currentDatas = idojarasInfo.idojaras.current;

  const hourlyDatas = idojarasInfo.idojaras.hourly;

  const dailyUnits = idojarasInfo.idojaras.daily_units;
  const dailyDatas = idojarasInfo.idojaras.daily;
  const dailyRowsJsx = [];
  const modifiedTime = currentDatas.time.replace("T", " ");

  const toTheChart = [];
  let nextTime = modifiedTime.slice(-5);
  let nextHour = nextTime.slice(0, 2);
  let nextMinute = nextTime.slice(3);

  for (let i = 0; i <= 24; ++i) {
    toTheChart.push({
      hour: i % 3 === 0 ? i + "h" : "",
      temperature: hourlyDatas.temperature_2m[i],
    });
  }

  function plusTime(nextHour, nextMinute) {
    let hourNum = Number(nextHour);
    let minuteNum = Number(nextMinute);
    if (minuteNum === 45) {
      minuteNum = 0;
      if (hourNum < 23) {
        hourNum += 1;
      } else if (hourNum === 23) {
        hourNum = 0;
      }
    } else if (minuteNum === 0) {
      minuteNum = 15;
    } else if (minuteNum === 15) {
      minuteNum = 30;
    } else if (minuteNum === 30) {
      minuteNum = 45;
    }
    let hour = hourNum.toString().padStart(2, "0");
    let minute = minuteNum.toString().padStart(2, "0");
    return `${hour}:${minute}`;
  }

  let currentIcon = () => {
    if (currentDatas.precipitation >= 5) {
      return (
        <img
          src={process.env.PUBLIC_URL + "/heavy-rain-day.png"}
          alt="heavy rain cloud"
          style={{
            width: "24px",
            height: "24px",
          }}
        />
      );
    } else if (
      currentDatas.precipitation >= 1 &&
      currentDatas.precipitation < 5
    ) {
      return (
        <img
          src={process.env.PUBLIC_URL + "/low-rain-day.png"}
          alt="low rain cloud"
          style={{
            width: "24px",
            height: "24px",
          }}
        />
      );
    } else if (
      currentDatas.precipitation < 1 &&
      currentDatas.cloud_cover >= 0 &&
      currentDatas.cloud_cover <= 20
    ) {
      return (
        <img
          src={process.env.PUBLIC_URL + "/0-20cloud-day.png"}
          alt="0-20% cloud cover"
          style={{
            width: "24px",
            height: "24px",
          }}
        />
      );
    } else if (
      currentDatas.precipitation < 1 &&
      currentDatas.cloud_cover >= 21 &&
      currentDatas.cloud_cover <= 40
    ) {
      return (
        <img
          src={process.env.PUBLIC_URL + "/21-40cloud-day.png"}
          alt="21-40% cloud cover"
          style={{
            width: "24px",
            height: "24px",
          }}
        />
      );
    } else if (
      currentDatas.precipitation < 1 &&
      currentDatas.cloud_cover >= 41 &&
      currentDatas.cloud_cover <= 60
    ) {
      return (
        <img
          src={process.env.PUBLIC_URL + "/41-60cloud-day.png"}
          alt="41-60% cloud cover"
          style={{
            width: "24px",
            height: "24px",
          }}
        />
      );
    } else if (
      currentDatas.precipitation < 1 &&
      currentDatas.cloud_cover >= 61 &&
      currentDatas.cloud_cover <= 80
    ) {
      return (
        <img
          src={process.env.PUBLIC_URL + "/61-80cloud-day.png"}
          alt="61-80% cloud cover"
          style={{
            width: "24px",
            height: "24px",
          }}
        />
      );
    } else {
      return (
        <img
          src={process.env.PUBLIC_URL + "/81-100cloud-day.png"}
          alt="< 80% cloud cover"
          style={{
            width: "24px",
            height: "24px",
          }}
        />
      );
    }
  };

  const nextRendertime = plusTime(nextHour, nextMinute);

  currentRowsJsx.push(
    <tr key={currentDatas.time}>
      <th scope="row">{modifiedTime}</th>
      <td>
        {currentDatas.temperature_2m} {currentUnits.temperature_2m}
      </td>
      <td>{nextRendertime}</td>
      <td>
        {currentDatas.relative_humidity_2m} {currentUnits.relative_humidity_2m}
      </td>
      <td>
        {currentDatas.precipitation} {currentUnits.precipitation}
      </td>
      <td className="alignCenter">
        {currentDatas.cloud_cover} {currentUnits.cloud_cover} {currentIcon()}
      </td>
      <td>
        {currentDatas.wind_speed_10m} {currentUnits.wind_speed_10m}
      </td>
    </tr>
  );

  for (let i = 0; i < 7; ++i) {
    dailyRowsJsx.push(
      <tr key={dailyDatas.time[i] + i}>
        <th scope="row">{dailyDatas.time[i]}</th>
        <td>
          {dailyDatas.temperature_2m_max[i]} {dailyUnits.temperature_2m_max}
        </td>
        <td>
          {dailyDatas.temperature_2m_min[i]} {dailyUnits.temperature_2m_min}
        </td>
        <td>{dailyDatas.sunrise[i].replace("T", " ")}</td>
        <td>{dailyDatas.sunset[i].replace("T", " ")}</td>
        <td>
          {dailyDatas.precipitation_sum[i]} {dailyUnits.precipitation_sum}
        </td>
      </tr>
    );
  }
  return (
    <>
      <h2 className="h-tags">Current forecast</h2>
      <Table borderless dark hover responsive className="table">
        <thead>
          <tr>
            <th>Date & time</th>
            <th>Temperature</th>
            <th>Next refresh</th>
            <th>Relative humidity</th>
            <th>Precipitation</th>
            <th>Cloud cover</th>
            <th>Wind speed</th>
          </tr>
        </thead>
        <tbody>{currentRowsJsx}</tbody>
      </Table>
      <h3 className="h-tags">Weekly forecast</h3>
      <Table dark hover responsive className="table last-table">
        <thead>
          <tr>
            <th>Date & time</th>
            <th>Maximum temperature</th>
            <th>Minimum temperature</th>
            <th>Sunrise</th>
            <th>Sunset</th>
            <th>Precipitation</th>
          </tr>
        </thead>
        <tbody>{dailyRowsJsx}</tbody>
      </Table>
    </>
  );
}
