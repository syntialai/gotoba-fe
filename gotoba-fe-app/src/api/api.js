import axios from 'axios';

const AUTH_TOKEN = '';

axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
axios.defaults.timeout = 10000;
axios.defaults.headers.common.Authorization = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

export function fetchPost(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then((response) => {
        resolve(response.data);
      }, (err) => {
        reject(err);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function fetchGet(url, param) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: param,
    })
      .then((response) => {
        resolve(response.data);
      }, (err) => {
        reject(err);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export default {
  Login(params) {
    return fetchPost('/auth/login', params);
  },
  Signup(params) {
    return fetchPost('/auth/signup', params);
  },
  UpdateProfile(params) {
    return fetchPost('/user', params);
  },
  getGalleryPhotos(params) {
    return fetchGet('/gallery', params);
  },
};
