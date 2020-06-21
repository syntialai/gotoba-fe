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
    return fetchPut(`/gallery/edit/${sku}`, params);
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

  /**
   * Restaurant
   */
  GetRestaurants() {
    return fetchGet('/restaurant');
  },
  GetRestaurantBySku(sku) {
    return fetchGet(`/restaurant/${sku}`);
  },
  PostRestaurant(params) {
    return fetchPost('/restaurant/add', params);
  },
  EditRestaurant(sku, params) {
    return fetchPut(`/restaurant/edit/${sku}`, params);
  },
  GetRestaurantMenus(sku) {
    return fetchGet(`/restaurant/${sku}/menu/`);
  },
  GetRestaurantMenuById(id) {
    return fetchGet(`/restaurant/menu/${id}`);
  },
  AddRestaurantMenu(sku, params) {
    return fetchPost(`/restaurant/${sku}/menu/add`, params);
  },
  EditRestaurantMenu(sku, id, params) {
    return fetchPut(`/restaurant/${sku}/menu/edit/${id}`, params);
  },
  RemoveRestaurantMenu(sku, id) {
    return fetchDelete(`/restaurant/${sku}/menu/delete/${id}`);
  },

  /**
   * Tour Guide
   */
  GetTourGuides() {
    return fetchGet('/tour-guide');
  },
  GetTourGuideBySku(sku) {
    return fetchGet(`/tour-guide/${sku}`);
  },
  PostTourGuide(params) {
    return fetchPost('/tour-guide/add', params);
  },
  EditTourGuide(sku, params) {
    return fetchPut(`/tour-guide/edit/${sku}`, params);
  },
  RemoveTourGuide(sku) {
    return fetchDelete(`/tour-guide/delete/${sku}`);
  },

  /**
   * Review
   */
  GetReviewBySku(sku) {
    return fetchGet(`/review/${sku}`);
  },
  GetReviewBySkuAndRating(sku, rate) {
    return fetchGet(`/review/${sku}/${rate}`);
  },
  GetReviewById(id) {
    return fetchGet(`/review/${id}`);
  },
  PostReview(sku, params) {
    return fetchPost(`/review/${sku}/add`, params);
  },

  /**
   * Travelling Schedule
   */
  GetTravellingSchedule(sku) {
    return fetchGet(`/schedule/${sku}`);
  },
  GetTravellingScheduleById(id) {
    return fetchGet(`/schedule/detail/${id}`);
  },
  PostTravellingSchedule(sku, params) {
    return fetchPost(`/schedule/${sku}/add/`, params);
  },
  EditTravellingSchedule(id, params) {
    return fetchPut(`/schedule/edit/${id}`, params);
  },
  RemoveTravellingSchedule(id) {
    return fetchPut(`/schedule/delete/${id}`);
  },

  /**
   * Ticket
   */
  GetTicketByMerchant(merchantSku) {
    return fetchGet(`/ticket/merchant/${merchantSku}`);
  },
  GetRestaurantTicket() {
    return fetchGet('ticket/category/restaurant');
  },
  GetJourneyTicket() {
    return fetchGet('/ticket/category/journey');
  },
  GetHotelTicket() {
    return fetchGet('/ticket/category/hotel');
  },
  GetTicketBySku(sku) {
    return fetchGet(`/ticket/${sku}`);
  },
  GetTicketByUser(userSku) {
    return fetchGet(`/ticket/user/${userSku}`);
  },
  PostTicket(merchantSku, params) {
    return fetchPost(`/ticket/merchant/${merchantSku}/add`, params);
  },
  EditTicket(sku, params) {
    return fetchPut(`/ticket/edit/${sku}`, params);
  },
  RemoveTicket(sku) {
    return fetchDelete(`/ticket/delete/${sku}`);
  },

  /**
   * Order Detail
   */
  GetOrderDetail(sku) {
    return fetchGet(`/order/${sku}`);
  },
  GetOrderDetailByMerchant(merchantSku) {
    return fetchGet(`/order/merchant/${merchantSku}`);
  },
  GetOrderDetailByUser(userSku) {
    return fetchGet(`/order/user/${userSku}`);
  },
  PostOrderDetail(userSku, params) {
    return fetchPost(`/order/user/${userSku}/add`, params);
  },
  EditOrderDetail(sku, params) {
    return fetchPut(`/order/edit/${sku}`, params);
  },

  /**
   * Payment
   */
  GetPayment(sku) {
    return fetchGet(`/pay/${sku}`);
  },
  GetPaymentByMerchant(merchantSku) {
    return fetchGet(`/pay/merchant/${merchantSku}`);
  },
  GetRestaurantPaymentByMerchant(merchantSku) {
    return fetchGet(`/pay/merchant/${merchantSku}/category/restaurant`);
  },
  GetJourneyPaymentByMerchant(merchantSku) {
    return fetchGet(`/pay/merchant/${merchantSku}/category/journey`);
  },
  GetHotelPaymentByMerchant(merchantSku) {
    return fetchGet(`/pay/merchant/${merchantSku}/category/hotel`);
  },
  GetAcceptedPaymentByUser(userSku) {
    return fetchGet(`/pay/user/${userSku}/status/ACCEPTED`);
  },
  GetWaitingPaymentByUser(userSku) {
    return fetchGet(`/pay/user/${userSku}/status/WAITING`);
  },
  GetCancelledPaymentByUser(userSku) {
    return fetchGet(`/pay/user/${userSku}/status/CANCELLED`);
  },
  PostPayment(userSku, params) {
    return fetchPost(`/pay/add/${userSku}`, params);
  },
  EditPayment(sku, params) {
    return fetchPut(`/pay/edit/${sku}`, params);
  },
};
