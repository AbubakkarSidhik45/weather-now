import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, format, isEqual } from "date-fns";
import ForecastDetails from "./ForecastDetails";

const SortWeatherDisplay = ({ setSortWeather, citiesState, sortWeather }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [sortOrder, setSortOrder] = useState("");

  const handleSortChange = (event) => {
    const order = event.target.value;
    setSortOrder(order);
    const sortedWeather = sortWeather.sort((a, b) => {
      const tempA =
        a?.forecast?.forecastday[0]?.day?.avgtemp_c ?? Number.MAX_VALUE;
      const tempB =
        b?.forecast?.forecastday[0]?.day?.avgtemp_c ?? Number.MAX_VALUE;
      return order === "ascending" ? tempA - tempB : tempB - tempA;
    });
    console.log(sortedWeather, "sortedWeather");
    setSortWeather(sortedWeather);
  };

  const handleDateSelection = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    setSelectedDate(date);
    const sortedWeather = citiesState?.weather.map((city) => ({
      ...city,
      forecast: {
        ...city.forecast,
        forecastday: city?.forecast?.forecastday?.filter((item) =>
          isEqual(formattedDate, item.date)
        ),
      },
    }));
    console.log(sortedWeather, "sortedWeather");
    setSortWeather(sortedWeather);
  };

  return (
    <>
      <div className="sortWeather">
        <div className="sortWeatherDate">
          <label htmlFor="datePicker">Select a date:</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => handleDateSelection(date)}
            minDate={new Date()}
            maxDate={addDays(new Date(), 10)}
            placeholderText="Select a date"
          />
        </div>
        <div>
          <label htmlFor="sortOrder">Sort Order:</label>
          <select id="sortOrder" value={sortOrder} onChange={handleSortChange}>
            <option value="">Sort By</option>
            <option value="descending">Hightest Temp</option>
            <option value="ascending">Lowest Temp</option>
          </select>
        </div>
      </div>
      {sortWeather.map((data) => {
        return (
          <ForecastDetails
            forecastday={data?.forecast?.forecastday}
            city={data?.location?.name}
          />
        );
      })}
    </>
  );
};

export default SortWeatherDisplay;
