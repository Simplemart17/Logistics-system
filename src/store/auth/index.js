import {
  REGISTER_SUCCESS,
  REQUEST_ACTION,
  LOGIN_SUCCESS,
  GET_USER_SUCCESS,
 } from './actionTypes';
import axios from '../../utils/http';
import { setLocalStorage } from '../../utils/auth';

export const registerUser = register => ({
  type: REGISTER_SUCCESS,
  payload: register,
});

export const requestAction = () => ({
  type: REQUEST_ACTION,
});

export const loginUser = login => ({
  type: LOGIN_SUCCESS,
  payload: login,
});

export const GetUsers = profile => ({
  type: GET_USER_SUCCESS,
  payload: profile,
})

const setAxiosHeader = token => { axios.defaults.headers.common.Authorization = `Bearer ${token}`; };

export const registerAction = userPayload => async dispatch => {
  dispatch(requestAction());
  try {
    const { data } = await axios.post('/auth/local/register', userPayload);
    const { jwt, user } = data;
    dispatch(registerUser(user));
    setLocalStorage('token', jwt);
    setAxiosHeader(jwt);
  } catch (error) {
    console.log(error.message);
  }
};

export const loginAction = payload => async dispatch => {
  dispatch(requestAction());
  try {
    const { data } = await axios.post('/auth/local', payload);
    const { jwt, user } = data;
    dispatch(loginUser(user));
    setLocalStorage('token', jwt);
    setAxiosHeader(jwt);
  } catch (error) {
    console.log(error.response);
  }
};

export const getUserProfile = () => async dispatch => {
  dispatch(requestAction());
  try {
    const { data } = await axios.get('/users/me');
    dispatch(GetUsers(data));
  } catch (error) {
    console.log(error);
  }
};

export const initialState = {
  data: {},
  isLoading: false
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case REQUEST_ACTION:
      return {
        ...state,
        isLoading: true
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false
      };
    case GET_USER_SUCCESS:
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
