import axios from "axios";
import {
  FETCH_CITIES_REQUEST,
  FETCH_CITIES_SUCCESS,
  FETCH_CITIES_FAILURE,
  FETCH_CITIES_WEATHER_REQUEST,
  FETCH_CITIES_WEATHER_SUCCESS,
  FETCH_CITIES_WEATHER_FAILURE,
} from "../constants";

export const fetchCitiesRequest = () => ({
  type: FETCH_CITIES_REQUEST,
});

export const fetchCitiesSuccess = (cities) => ({
  type: FETCH_CITIES_SUCCESS,
  payload: cities,
});

export const fetchCitiesFailure = (error) => ({
  type: FETCH_CITIES_FAILURE,
  payload: error,
});

export const fetchCitiesWeatherRequest = () => ({
  type: FETCH_CITIES_WEATHER_REQUEST,
});

export const fetchCitiesWeatherSuccess = (weatherData) => ({
  type: FETCH_CITIES_WEATHER_SUCCESS,
  payload: weatherData,
});

export const fetchCitiesWeatherFailure = (error) => ({
  type: FETCH_CITIES_WEATHER_FAILURE,
  payload: error,
});

export const fetchCitiesWeather = (cities) => {
  return async (dispatch) => {
    dispatch(fetchCitiesWeatherRequest());

    try {
      const weatherPromises = cities.map((city) =>
        axios.get(
          `http://api.weatherapi.com/v1/forecast.json?key=32284e167da84719833102209241207&q=${city.name}&days=10&aqi=yes&alerts=yes`
        )
      );

      const weatherResponses = await Promise.allSettled(weatherPromises);
      const response = weatherResponses?.filter(
        (res) => res.status === "fulfilled"
      );
      dispatch(
        fetchCitiesWeatherSuccess(response?.map((res) => res?.value?.data))
      );
    } catch (error) {
      dispatch(
        fetchCitiesWeatherFailure(
          "We are having some issue, sorry for the inconvience, Please try again later."
        )
      );
    }
  };
};

export const fetchCities = (countryName) => {
  return async (dispatch) => {
    dispatch(fetchCitiesRequest());
    try {
      const country = await axios.get(
        `http://api.geonames.org/searchJSON?q=${countryName}&featureClass=A&featureCode=PCLI&maxRows=1&username=AbubakkarSidhik`
      );
      if (country.data.geonames.length === 0) {
        throw new Error(
          "We are having some issue, sorry for the inconvience, Please try again later."
        );
      }
      const countryCode = country.data.geonames[0].countryCode;
      //We need to convert country to country code Becuase geoname api only take countrycode to as parameter
      const response = await axios.get(
        `http://api.geonames.org/searchJSON?country=${countryCode}&featureClass=P&maxRows=15&username=AbubakkarSidhik`
      );
      if (response.data.geonames.length === 0) {
        throw new Error(
          "We are having some issue, sorry for the inconvience, Please try again later."
        );
      }
      dispatch(fetchCitiesWeather(response.data.geonames));
    } catch (error) {
      dispatch(
        fetchCitiesFailure(
          "We are having some issue, sorry for the inconvience, Please try again later."
        )
      );
    }
  };
};
