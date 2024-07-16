import {
  FETCH_WEATHER_FAILURE,
  FETCH_WEATHER_REQUEST,
  FETCH_WEATHER_SUCCESS,
} from "../constants";

const initialState = {
  loading: false,
  weather: null,
  error: null,
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WEATHER_REQUEST:
      return {
        ...state,
        weather: null,
        error: null,
        loading: true,
      };
    case FETCH_WEATHER_SUCCESS:
      return {
        loading: false,
        weather: action.payload,
        error: null,
      };
    case FETCH_WEATHER_FAILURE:
      return {
        loading: false,
        weather: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default weatherReducer;
