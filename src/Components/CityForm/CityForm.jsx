import React, { useState } from "react";

export default function CityForm({ updateCity }) {
  const [varos, setVaros] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCity(varos);
  };

  const handleVarosChange = (e) => {
    setVaros(e.target.value);
  };
  return (
    <div>
      <form className="form" action="#" method="get" onSubmit={handleSubmit}>
        <label>
          City:
          <input
            type="text"
            name="city"
            value={varos}
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
