import React, { useState } from "react";
import { formatDate } from "../utils";

const ForecastDetails = ({ forecastday, city = "" }) => {
  console.log(forecastday);
  const [dateIndex, setDateIndex] = useState(0);
  const selectedForecastday = forecastday[dateIndex];
  return (
    <>
      <h4 className="dateCardTitle">Expected Weather: {city}</h4>
      <div className="dateCardDescription">
        {forecastday.map((forecast, index) => {
          return (
            <button
              type="buton"
              className={dateIndex === index && "active"}
              onClick={() => setDateIndex(index)}
            >
              <h4>{formatDate(forecast?.date)}</h4>
              <img
                src={forecast?.day?.condition?.icon}
                alt={forecast?.day?.condition?.text}
              />
              <p>
                {forecast?.day?.maxtemp_c}°C {forecast?.day?.mintemp_c}°C
              </p>
            </button>
          );
        })}
      </div>
      <div className="selectedWeather">
        <div className="selectedWeatherBlock-1">
          <h4>{formatDate(selectedForecastday?.date)}</h4>
          <div className="tempDescription">
            <div>
              <img
                src={selectedForecastday?.day?.condition?.icon}
                alt={selectedForecastday?.day?.condition?.text}
              />
              <p>{selectedForecastday?.day?.condition?.text}</p>
            </div>
            <p className="averageTemp">
              {selectedForecastday?.day?.avgtemp_c}°C
            </p>
          </div>
          <p>Min Temp: {selectedForecastday?.day?.mintemp_c}°C</p>
          <p>Max Temp: {selectedForecastday?.day?.maxtemp_c}°C</p>
          <p>Humidity: {selectedForecastday?.day?.avghumidity}%</p>
        </div>
        <div className="selectedWeatherBlock-2">
          <h4>Hours</h4>
          <div className="hourBlock">
            {selectedForecastday?.hour?.map((t) => {
              const date = new Date(t.time);
              const options = { hour: "numeric", hour12: true };
              const hour = date.toLocaleString("en-US", options).toLowerCase();
              return (
                <div>
                  <h4>{hour}</h4>
                  <img src={t?.condition?.icon} alt={t?.condition?.text} />
                  <p>{t?.condition?.text}</p>
                  <p>{t.temp_c}°C</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ForecastDetails;
