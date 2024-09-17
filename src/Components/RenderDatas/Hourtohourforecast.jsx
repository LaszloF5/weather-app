import React from "react";
import { Table } from "reactstrap";
import "./Hourtohourforecast.css";

export default function Hourtohourforecast({ idojarasInfo }) {
  if (idojarasInfo === null) {
    return (
      <>
        <p className="first-p">No data available.</p>
        <p>Please choose a city.</p>
      </>
    );
  }
  const hourlyRowsJsx = [];
  const hourlyUnits = idojarasInfo.idojaras.hourly_units;
  const hourlyDatas = idojarasInfo.idojaras.hourly;

  for (let i = 0; i <= 24; ++i) {
    let currentIcon = () => {
      if (hourlyDatas.precipitation[i] >= 5) {
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
        hourlyDatas.precipitation[i] >= 1 &&
        hourlyDatas.precipitation[i] < 5
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
        hourlyDatas.precipitation[i] < 1 &&
        hourlyDatas.cloud_cover[i] >= 0 &&
        hourlyDatas.cloud_cover[i] <= 20
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
        hourlyDatas.precipitation[i] < 1 &&
        hourlyDatas.cloud_cover[i] >= 21 &&
        hourlyDatas.cloud_cover[i] <= 40
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
        hourlyDatas.precipitation[i] < 1 &&
        hourlyDatas.cloud_cover[i] >= 41 &&
        hourlyDatas.cloud_cover[i] <= 60
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
        hourlyDatas.precipitation[i] < 1 &&
        hourlyDatas.cloud_cover[i] >= 61 &&
        hourlyDatas.cloud_cover[i] <= 80
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

    hourlyRowsJsx.push(
      <tr key={hourlyDatas.time[i] + i}>
        <th scope="row">{hourlyDatas.time[i].replace("T", " ")}</th>
        <td>
          {hourlyDatas.temperature_2m[i]} {hourlyUnits.temperature_2m}
        </td>
        <td>
          {hourlyDatas.relative_humidity_2m[i]}{" "}
          {hourlyUnits.relative_humidity_2m}
        </td>
        <td>
          {hourlyDatas.dew_point_2m[i]} {hourlyUnits.dew_point_2m}
        </td>
        <td>
          {hourlyDatas.precipitation_probability[i]}{" "}
          {hourlyUnits.precipitation_probability}
        </td>
        <td>
          {hourlyDatas.precipitation[i]} {hourlyUnits.precipitation}
        </td>
        <td>
          {hourlyDatas.cloud_cover[i]} {hourlyUnits.cloud_cover} {currentIcon()}
        </td>
        <td>
          {hourlyDatas.visibility[i]} {hourlyUnits.visibility}
        </td>
        <td>
          {hourlyDatas.wind_speed_10m[i]} {hourlyUnits.wind_speed_10m}
        </td>
        <td>
          <img
            src={process.env.PUBLIC_URL + "/arrow.png"}
            alt="arrow"
            style={{
              transform: `rotate(${hourlyDatas.wind_direction_10m[i]}deg)`,
              width: "20px",
              height: "20px",
              filter: "invert(100%)",
            }}
          />{" "}
          {hourlyDatas.wind_direction_10m[i]} {hourlyUnits.wind_direction_10m}
        </td>
      </tr>
    );
  }

  return (
    <>
      {" "}
      <h3 className="h-tags">Hour to hour forecast</h3>
      <Table borderless dark hover responsive className="last-table">
        <thead>
          <tr>
            <th>Date & time</th>
            <th>Temperature</th>
            <th>Relative humidity</th>
            <th>Dew point</th>
            <th>Precipitation probability</th>
            <th>Precipitation</th>
            <th>Cloud cover</th>
            <th>Visibility</th>
            <th>Wind speed</th>
            <th>Wind direction</th>
          </tr>
        </thead>
        <tbody>{hourlyRowsJsx}</tbody>
      </Table>
    </>
  );
}
