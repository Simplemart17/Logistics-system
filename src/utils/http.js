import axios from 'axios';

const Axios = axios.create({
  baseURL: 'https://sendbox-challenge.herokuapp.com',
});

export default Axios;
