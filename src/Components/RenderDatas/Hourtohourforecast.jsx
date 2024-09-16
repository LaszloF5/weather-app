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
          {hourlyDatas.cloud_cover[i]} {hourlyUnits.cloud_cover}
        </td>
        <td>
          {hourlyDatas.visibility[i]} {hourlyUnits.visibility}
        </td>
        <td>
          {hourlyDatas.wind_speed_10m[i]} {hourlyUnits.wind_speed_10m}
        </td>
        <td>
          <img
            src="arrow.png"
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
