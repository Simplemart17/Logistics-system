import {
  REQUEST_ACTION,
  GET_COURIER_SUCCESS,
 } from './actionTypes';
import axios from 'utils/http';

export const requestAction = () => ({
  type: REQUEST_ACTION,
});

export const getCourier = payload => ({
  type: GET_COURIER_SUCCESS,
  payload,
});

export const getCourierAction = () => async dispatch => {
  dispatch(requestAction());
  try {
    const { data } = await axios.get('/couriers');
    dispatch(getCourier(data));
  } catch (error) {
    console.log(error.message);
  }
};

export const initialState = {
  data: [],
  isLoading: false
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case REQUEST_ACTION:
      return {
        ...state,
        isLoading: true
      };
    case GET_COURIER_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false
      };
      default:
        return state
  }
};

export default reducer;
