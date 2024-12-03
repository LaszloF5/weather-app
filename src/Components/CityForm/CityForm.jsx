import React, { useState } from "react";

export default function CityForm({ updateCity }) {
  const [varos, setVaros] = useState("");
  const [temp, setTemp] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setVaros(temp);
    setTemp('');
    updateCity(temp);
  };

  const handleVarosChange = (e) => {
    setTemp(e.target.value);
  };
  return (
    <div>
      <form className="form" action="#" method="get" onSubmit={handleSubmit}>
        <label>
          City:
          <input
            type="text"
            name="city"
            value={temp}
            onChange={handleVarosChange}
            className="m-2"
          />
        </label>
        <button className="btn btn-primary" type="submit">
          Check
        </button>
      </form>
    </div>
  );
}
