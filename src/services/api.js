import axios from 'axios';
import Cookies from 'js-cookie';

const JWT_TOKEN = 'JWT_TOKEN';
const baseURL = 'http://localhost:3000/api';
let jwtToken = '';
const apiHelper = axios.create({
  baseURL,
  headers: {
    authorization: jwtToken,
  },
});

export const getJWTToken = () => {
  return Cookies.get(JWT_TOKEN);
};

export const setToken = (token) => {
  Cookies.set(JWT_TOKEN, token);
  jwtToken = `Bearer ${token}`;
};

export const cleanToken = () => {
  Cookies.remove(JWT_TOKEN);
  jwtToken = '';
};

export const verifyToken = (token) => {
  return axios
    .get(`${baseURL}/auth`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then(({ data }) => {
      console.log('data:', data);
    })
    .catch((err) => {
      console.log('verifyToken error:', err);
      cleanToken();
      return Promise.reject();
    });
};

export const fetchLogin = (email, password) => {
  return axios
    .post(`${baseURL}/login`, {
      email,
      password,
      expiresIn: '20',
    })
    .then(({ data }) => {
      setToken(data.data.token);
      return data.data;
    })
    .catch((err) => console.log('axios error:', err.response.data.message));
};

export const fetchRecord = () => {
  return apiHelper
    .get('/records')
    .then(({ data }) => console.log('Record:', data))
    .catch((err) => console.log('fetchRecord error:', err));
};
