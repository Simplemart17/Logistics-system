import { toast } from 'react-toastify';
import {
  REGISTER_SUCCESS,
  REQUEST_ACTION,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_USER_SUCCESS,
  LOG_USER_OUT
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

export const loginFailure = error => ({
  type: LOGIN_FAILURE,
  payload: error,
})

export const GetUsers = profile => ({
  type: GET_USER_SUCCESS,
  payload: profile,
})

export const logOutUser = () => ({
  type: LOG_USER_OUT
});

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
    setLocalStorage('token', jwt);
    setAxiosHeader(jwt);
    toast.success('Login successful!');
    return dispatch(loginUser(user));
  } catch ({ response }) {
    toast.error('An error has occured, please try again!');
    return dispatch(loginFailure(response.data));
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

export const logOutAction = () => dispatch => {
  try {
    localStorage.removeItem('token');
    dispatch(logOutUser());
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
    case LOGIN_FAILURE:
      return {
        ...state,
        data: action.payload,
        isLoading: false
      }
    case GET_USER_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false
      };
    case LOG_USER_OUT:
      return {
        ...state
      };
      default:
        return state
  }
};

export default reducer;
