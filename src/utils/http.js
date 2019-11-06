import axios from 'axios';
import { USER_TOKEN } from './auth';

const Axios = axios.create({
  baseURL: 'https://sendbox-challenge.herokuapp.com',
  headers: {
    'Content-Type': 'application/json',
  }
});

if (USER_TOKEN) Axios.defaults.headers.common.Authorization = `Bearer ${USER_TOKEN}`;

export default Axios;
