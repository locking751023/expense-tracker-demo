import axios from 'axios';
import Cookies from 'js-cookie';

const JWT_TOKEN = 'JWT_TOKEN';
const baseURL = 'http://localhost:3000/api';
const apiHelper = axios.create({
  baseURL,
});

export const getJWTToken = () => {
  return Cookies.get(JWT_TOKEN);
};

export const setToken = (token) => {
  Cookies.set(JWT_TOKEN, token);
  apiHelper.defaults.headers.authorization = `Bearer ${token}`;
};

export const cleanToken = () => {
  Cookies.remove(JWT_TOKEN);
  delete apiHelper.defaults.headers.authorization;
};

export const verifyToken = (token) => {
  return axios
    .get(`${baseURL}/auth`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then(({ data }) => {
      apiHelper.defaults.headers.authorization = `Bearer ${token}`;
      return data;
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
      expiresIn: '1d',
    })
    .then(({ data }) => {
      setToken(data.data.token);
      return data;
    })
    .catch((err) => {
      return err;
    });
};

export const fetchRegister = (userData) => {
  return axios
    .post(`${baseURL}/register`, {
      ...userData,
    })
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

export const fetchGetRecords = () => {
  return apiHelper
    .get('/records')
    .then(({ data }) => {
      return data;
    })
    .catch((err) => console.log('axios error:', err));
};

export const fetchGetRecord = (rid) => {
  return apiHelper
    .get(`/record/${rid}`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

export const fetchGetProducts = () => {
  return apiHelper
    .get('/products')
    .then(({ data }) => {
      return data;
    })
    .catch((err) => console.log('axios error:', err));
};

export const fetchGetLocations = () => {
  return apiHelper
    .get('/locations')
    .then(({ data }) => {
      return data;
    })
    .catch((err) => console.log('axios error:', err));
};

export const fetchPostNewRecord = (data) => {
  return apiHelper
    .post('/record/new', { data })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const fetchDeleteRecord = (rid) => {
  return apiHelper
    .delete(`/record/${rid}`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

export const fetchPutRecord = (rid, data) => {
  return apiHelper
    .put(`/record/${rid}/edit`, { data })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};
