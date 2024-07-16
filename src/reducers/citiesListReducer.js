import {
  FETCH_CITIES_REQUEST,
  FETCH_CITIES_SUCCESS,
  FETCH_CITIES_FAILURE,
  FETCH_CITIES_WEATHER_REQUEST,
  FETCH_CITIES_WEATHER_SUCCESS,
  FETCH_CITIES_WEATHER_FAILURE,
} from "../constants";

const initialState = {
  loading: false,
  cities: [],
  weather: [],
  error: "",
};

const citiesListReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CITIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CITIES_SUCCESS:
      return {
        loading: true,
        cities: action.payload,
        weather: [],
        error: "",
      };
    case FETCH_CITIES_FAILURE:
      return {
        loading: false,
        cities: [],
        weather: [],
        error: action.payload,
      };
    case FETCH_CITIES_WEATHER_REQUEST:
      return {
        ...state,
        weather: [],
        loading: true,
      };
    case FETCH_CITIES_WEATHER_SUCCESS:
      return {
        loading: false,
        cities: [],
        weather: action.payload,
        error: "",
      };
    case FETCH_CITIES_WEATHER_FAILURE:
      return {
        loading: false,
        cities: [],
        weather: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default citiesListReducer;
