import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { HashRouter, Link, Route, Routes, useLocation } from "react-router-dom";
import Forecast from "./Components/Forecast/Forecast";
import CityForm from "./Components/CityForm/CityForm";
import Hourtohourforecast from "./Components/RenderDatas/Hourtohourforecast";
import Diagrams from "./Components/RenderDatas/Diagrams";

// TODO: Amelyik td-ben kép van, összehangolni a méretet a többi cellával.
export default function App() {
  const [idojarasInfo, setIdojarasInfo] = useState(null);

  const currentCity = (varos) => {
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${varos.latitude}&longitude=${varos.longitude}&current=temperature_2m,relative_humidity_2m,is_day,precipitation,cloud_cover,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,precipitation_probability,precipitation,cloud_cover,visibility,wind_speed_10m,wind_direction_10m,wind_gusts_10m,soil_temperature_0cm,soil_moisture_0_to_1cm&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum&timezone=Europe%2FBerlin`
    )
      .then((x) => x.json())
      .then((response) => {
        setIdojarasInfo({
          varos,
          idojaras: response,
        });
      });
  };

  const updateCity = (varos) => {
    fetch("https://geocoding-api.open-meteo.com/v1/search?name=" + varos)
      .then((x) => x.json())
      .then((response) => {
        if (Array.isArray(response.results) && response.results.length > 0) {
          currentCity(response.results[0]);
        } else {
          alert("Hibás város!");
        }
      });
  };

  return (
    <div className="App">
      <HashRouter>
        <AppContent idojarasInfo={idojarasInfo} updateCity={updateCity} />
      </HashRouter>
    </div>
  );
}

function AppContent({ idojarasInfo, updateCity }) {
  const location = useLocation();
  const timeZone = idojarasInfo?.idojaras?.timezone;

  return (
    <>
      <div className="menu">
        <p className="timeZone">
          Time zone:{" "}
          {timeZone === undefined ? "Choose first a city." : timeZone}
        </p>
        <Link className="links" to="/">
          Home
        </Link>
        <Link className="links" to="/Hourtohourforecast">
          Hour to hour forecast
        </Link>
        <Link className="links" to="/Diagrams">
          Diagrams
        </Link>
      </div>

      <Routes>
        <Route
          path="/Hourtohourforecast"
          element={<Hourtohourforecast idojarasInfo={idojarasInfo} />}
        />
        <Route
          path="/Diagrams"
          element={<Diagrams idojarasInfo={idojarasInfo} />}
        />
      </Routes>

      {location.pathname === "/" && (
        <>
          <h1 className="first-heading">Prepare for today</h1>
          <h2>Check the weather in your city!</h2>
          <CityForm updateCity={updateCity} />
          <p>{idojarasInfo?.varos.name}</p>
          <Forecast idojarasInfo={idojarasInfo} />
        </>
      )}
    </>
  );
}

// victory, reactstrap
