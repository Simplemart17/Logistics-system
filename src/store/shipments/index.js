import {
  REQUEST_ACTION,
  GET_SHIPMENT_SUCCESS,
  CREATE_SHIPMENT_SUCCESS,
  EDIT_SHIPMENT_SUCCESS,
  DELETE_SHIPMENT_SUCCESS,
 } from './actionTypes';
import axios from '../../utils/http';

export const requestAction = () => ({
  type: REQUEST_ACTION,
});

export const getShipment = payload => ({
  type: GET_SHIPMENT_SUCCESS,
  payload,
});

export const createShipment = payload => ({
  type: CREATE_SHIPMENT_SUCCESS,
  payload,
});

export const editShipment = payload => ({
  type: EDIT_SHIPMENT_SUCCESS,
  payload,
});

export const deleteShipment = payload => ({
  type: DELETE_SHIPMENT_SUCCESS,
  payload,
});

export const getShipmentAction = id => async dispatch => {
  dispatch(requestAction());
  try {
    const { data } = await axios.get(`/shipments?user=${id}`);
    dispatch(getShipment(data));
  } catch (error) {
    console.log(error.message);
  }
};

export const createShipmentAction = payload => async dispatch => {
  dispatch(requestAction());
  try {
    const { data } = await axios.post('/shipments', payload);
    dispatch(createShipment(data));
  } catch (error) {
    console.log(error.message);
  }
};

export const editShipmentAction = payload => async dispatch => {
  dispatch(requestAction());
  try {
    const data = await axios.patch('/shipments', payload);
    dispatch(editShipment(data));
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteShipmentAction = () => async dispatch => {
  dispatch(requestAction());
  try {
    const data = await axios.delete('/shipments');
    dispatch(deleteShipment(data));
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
    case GET_SHIPMENT_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false
      };
    case CREATE_SHIPMENT_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false
      };
    case EDIT_SHIPMENT_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false
      };
    case DELETE_SHIPMENT_SUCCESS:
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
