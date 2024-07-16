import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ForecastDetails from "./ForecastDetails";

const WeatherDisplay = ({ setChangeRequested }) => {
  const { loading, error, weather } = useSelector((state) => state.weather);

  useEffect(() => {
    if (weather) {
      setChangeRequested(false);
    }
  }, [weather, setChangeRequested]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {weather && (
        <div className="weatherDisplay">
          <h2>
            Today's Weather in {weather?.location?.name},{" "}
            {weather?.location?.country}
            <button
              className="formBtn"
              type="button"
              onClick={() => setChangeRequested(true)}
            >
              Change
            </button>
          </h2>
          <div className="todayWeather">
            <div className="weatherDescription">
              <div className="imageContent">
                <img
                  src={weather?.current?.condition?.icon}
                  alt={weather?.current?.condition?.text}
                />
                <p>{weather?.current?.condition?.text}</p>
              </div>
              <p className="tempInCelcius">{weather?.current?.temp_c}°C</p>
              <div>
                <p>
                  Min Temp: {weather?.forecast?.forecastday[0]?.day?.mintemp_c}
                  °C
                </p>
                <p>
                  Max Temp: {weather?.forecast?.forecastday[0]?.day?.maxtemp_c}
                  °C
                </p>
                <p>Humidity: {weather?.current?.humidity}%</p>
                <p>Wind: {weather?.current?.wind_kph} kph</p>
              </div>
            </div>
          </div>
          <ForecastDetails forecastday={weather?.forecast?.forecastday} />
          <h4>
            Planning a trip, wants to compare the weather for diffenent cities
            of the country, <a href="/plan-trip">click here </a>
          </h4>
        </div>
      )}
    </div>
  );
};

export default WeatherDisplay;
