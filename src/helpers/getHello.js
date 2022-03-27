import axios from 'axios';
import { config } from '../Constants.js';

export const getHello = () => {
  return axios.get(`${config.url.API_URL}`)
    .then(res => res.data.message)
    .catch(err => console.log(err));
}