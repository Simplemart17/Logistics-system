import { REGISTER_SUCCESS, REQUEST_ACTION } from './actionTypes';
import axios from '../../utils/http';
import { setLocalStorage } from '../../utils/auth';

export const registerUser = userPayload => ({
  type: REGISTER_SUCCESS,
  payload: userPayload,
});

export const requestAction = () => ({
  type: REQUEST_ACTION,
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
    console.log(error);
  }
};

export const initialState = {
  data: {},
  isLoading: false
}

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
      default:
        return state
  }
}

export default reducer;
