import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchWeather } from "../actions/weatherActions";
import WeatherDisplay from "./WeatherDisplay";

const WeatherForm = () => {
  const [city, setCity] = useState("");
  const [isChangeRequested, setChangeRequested] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setCity(e.target.value);
    if (city.trim() !== "") {
      setError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() === "") {
      setError("This field cannot be empty");
    } else {
      setError("");
      dispatch(fetchWeather(city));
    }
  };

  return (
    <>
      {isChangeRequested && (
        <form className="mainForm" onSubmit={handleSubmit}>
          <h2 className="formLabel" for="cityInput">
            Enter the City here...
          </h2>
          <input
            type="text"
            id="cityInput"
            className="formInput"
            value={city}
            onChange={handleChange}
            placeholder="Enter city"
          />
          <button className="formBtn" type="submit">
            Get Weather
          </button>
          {error && <span className="formError">{error}</span>}
        </form>
      )}
      <WeatherDisplay setChangeRequested={setChangeRequested} />
    </>
  );
};

export default WeatherForm;
