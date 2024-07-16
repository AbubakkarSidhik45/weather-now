import axios from "axios";
import {
  FETCH_WEATHER_FAILURE,
  FETCH_WEATHER_REQUEST,
  FETCH_WEATHER_SUCCESS,
} from "../constants";

export const fetchWeatherRequest = () => ({
  type: FETCH_WEATHER_REQUEST,
});

export const fetchWeatherSuccess = (weather) => ({
  type: FETCH_WEATHER_SUCCESS,
  payload: weather,
});

export const fetchWeatherFailure = (error) => ({
  type: FETCH_WEATHER_FAILURE,
  payload: error,
});

export const fetchWeather = (city) => {
  return async (dispatch) => {
    dispatch(fetchWeatherRequest());
    try {
      const weatherResponse = await axios.get(
        `http://api.weatherapi.com/v1/forecast.json?key=32284e167da84719833102209241207&q=${city}&days=10&aqi=yes&alerts=yes`
      );
      console.log("weatherResponse", weatherResponse.data);
      dispatch(fetchWeatherSuccess(weatherResponse.data));
    } catch (error) {
      dispatch(
        fetchWeatherFailure(
          "We are having some issue, sorry for the inconvience, Please try again later."
        )
      );
    }
  };
};
