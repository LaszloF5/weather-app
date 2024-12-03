import "./Diagrams.css";
import React, {useEffect} from "react";

import {
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryBar,
  VictoryArea,
  VictoryStack,
} from "victory";

export default function Diagrams({ idojarasInfo }) {
  useEffect(() => {
    document.title = "Weather forecast | Diagrams";
  }, []);
  if (idojarasInfo === null) {
    return (
      <>
        <p className="first">No data available.</p>
        <p>Please choose a city.</p>
      </>
    );
  }

  const hourlyDatas = idojarasInfo.idojaras.hourly;

  // Temperature diagram

  const toTheChartTemp = [];

  for (let i = 0; i <= 24; ++i) {
    toTheChartTemp.push({
      hour: i % 3 === 0 ? i + "h" : "",
      temperature: hourlyDatas.temperature_2m[i],
    });
  }

  const weatherChartTemp = () => {
    const minTemp = Math.min(...toTheChartTemp.map((d) => d.temperature)) - 2;
    const maxTemp = Math.max(...toTheChartTemp.map((d) => d.temperature)) + 2;
    return (
      <VictoryChart
        theme={VictoryTheme.material}
        width={900}
        height={450}
        domain={{ y: [minTemp, maxTemp] }}
      >
        <VictoryAxis dependentAxis tickFormat={(x) => `${x} °C`} />
        <VictoryAxis
          style={{
            axisLabel: { fontSize: 20, padding: 30 },
            ticks: { stroke: "grey", size: 5 },
            tickLabels: { fontSize: 20, padding: 5 },
            grid: {
              stroke: "rgba(0, 0, 0, 0.2)",
              strokeWidth: 1,
            },
          }}
          gridComponent={<line stroke="rgba(0, 0, 0, 0.2)" strokeWidth={1} />}
        />
        <VictoryArea
          data={toTheChartTemp}
          x="hour"
          y="temperature"
          style={{
            data: {
              fill: "rgba(196, 58, 49, 0.3)",
              stroke: "rgba(196, 58, 49, 0.3)",
              strokeWidth: 2,
            },
          }}
        />
      </VictoryChart>
    );
  };

  const displayWeatherChart = weatherChartTemp();

  // precipitation diagram

  const toTheChartPrecip = [];

  for (let i = 0; i <= 24; ++i) {
    toTheChartPrecip.push({
      hour: i % 1 === 0 ? i + "h" : "",
      precipitation: hourlyDatas.precipitation[i],
    });
  }
  const weatherChartPrecip = () => {
    return (
      <VictoryChart
        domainPadding={20}
        width={900}
        height={450}
        theme={VictoryTheme.material}
      >
        <VictoryAxis tickValues={toTheChartPrecip} />
        <VictoryAxis dependentAxis tickFormat={(x) => `${x} mm`} />
        <VictoryStack colorScale={["blue"]}>
          <VictoryBar data={toTheChartPrecip} x="hour" y="precipitation" />
        </VictoryStack>
      </VictoryChart>
    );
  };

  const displayWeatherChartPrecip = weatherChartPrecip();

  return (
    <>
      {" "}
      <section className="chart container">
        {" "}
        <h1 className="first">Daily temperature chart</h1> {displayWeatherChart}
      </section>
      <section className="chart container">
        {" "}
        <h1 className="first">Daily precipitation chart</h1>{" "}
        {displayWeatherChartPrecip}
      </section>
    </>
  );
}
