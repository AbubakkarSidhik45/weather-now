import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCities } from "../actions/citiesListAction.js";
import SortWeatherDisplay from "./SortWeatherDisplay.js";

const CitiesList = () => {
  const dispatch = useDispatch();
  const citiesState = useSelector((state) => state.citiesList);
  const [sortWeather, setSortWeather] = useState(citiesState?.weather);
  const [countryName, setCountryName] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (citiesState?.weather) {
      setSortWeather(citiesState?.weather);
    }
  }, [citiesState, setSortWeather]);

  const handleChange = (e) => {
    setCountryName(e.target.value);
    if (countryName.trim() !== "") {
      setFormError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (countryName.trim() === "") {
      setFormError("This field cannot be empty");
    } else {
      setFormError("");
      dispatch(fetchCities(countryName));
    }
  };

  return (
    <div className="citiesList">
      <form className="mainForm" onSubmit={handleSubmit}>
        <label className="formLabel" for="cityInput">
          Enter the Country Name:
        </label>
        <input
          type="text"
          className="formInput"
          value={countryName}
          onChange={handleChange}
          placeholder="Enter country name"
        />
        <button className="formBtn" type="submit">
          Fetch Cities
        </button>
        {formError && (
          <span className="formError">This field cannot be empty</span>
        )}
      </form>
      {citiesState.loading && <p>Loading...</p>}
      {citiesState.error && <p>{citiesState.error}</p>}
      {citiesState.weather.length > 0 && (
        <div>
          <SortWeatherDisplay
            setSortWeather={setSortWeather}
            citiesState={citiesState}
            sortWeather={sortWeather}
          />
        </div>
      )}
    </div>
  );
};

export default CitiesList;
