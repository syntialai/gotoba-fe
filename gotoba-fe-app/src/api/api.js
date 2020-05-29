import axios from 'axios';

const AUTH_TOKEN = '';

axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
axios.defaults.timeout = 10000;
axios.defaults.headers.common.Authorization = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

axios.interceptors.request.use(
  (config) => config,
  (err) => Promise.reject(err),
);

axios.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err),
);

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

export function fetchPut(url, params) {
  return new Promise((resolve, reject) => {
    axios.put(url, params)
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

export function fetchDelete(url) {
  return new Promise((resolve, reject) => {
    axios.delete(url)
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

  /**
   * Gallery
   */
  GetGalleryPhotos() {
    return fetchGet('/gallery/');
  },
  GetGalleryPhotosBySku(sku) {
    return fetchGet(`/gallery/${sku}`);
  },
  PostGalleryPhoto(params) {
    return fetchPost('/gallery/add', params);
  },
  EditGalleryPhoto(sku, params) {
    return fetchPut(`/gallery/update/${sku}`, params);
  },
  RemoveGalleryPhoto(sku) {
    return fetchDelete(`/gallery/delete/${sku}`);
  },

  /**
   * Itinerary / Spot
   */
  GetItineraries() {
    return fetchGet('/wisata/');
  },
  GetItineraryBySku(sku) {
    return fetchGet(`/wisata/${sku}`);
  },
  PostItinerary(params) {
    return fetchPost('/wisata/add', params);
  },
  EditItinerary(sku, params) {
    return fetchPut(`/wisata/edit/${sku}`, params);
  },
  RemoveItinerary(sku) {
    return fetchDelete(`/wisata/delete/${sku}`);
  },
};
