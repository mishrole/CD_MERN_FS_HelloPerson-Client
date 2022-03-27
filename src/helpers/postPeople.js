import axios from 'axios';
import { config } from '../Constants.js';

// export const postPeople = ({ firstName, lastName }) => {
//   return axios.post(`${config.url.API_URL}/people`, {
//     firstName,
//     lastName 
//   })
//   .then(res => res)
//   .catch(err => console.log(err));
// }

export const postPeople = (data) => {
  return axios.post(`${config.url.API_URL}/people`, data)
  .then(res => res)
  // .catch(err => {
  //   console.log(err.response.data);
  //   throw err;
  // });
  .catch(err => { throw err.response.data });
}
