import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8800/';
axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

axios.interceptors.request.use(
  (config) => config,
  (err) => Promise.reject(err),
);

axios.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err),
);

export function fetchGet(url, param) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: param,
    })
      .then((response) => {
        resolve(response.data.data);
      }, (err) => {
        reject(err);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function fetchPost(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then((response) => {
        resolve(response.data.data);
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
        resolve(response.data.data);
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
        resolve(response.data.data);
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
  Logout() {
    return fetchPost('/logout');
  },
  GetImage(imageName) {
    return fetchGet(`/image/${imageName}`);
  },

  /**
   * User
   */
  GetUsers() {
    return fetchGet('/user/');
  },
  GetActiveUsers() {
    return fetchGet('/user/active');
  },
  GetBlockedUsers() {
    return fetchGet('/user/blocked');
  },
  GetUserBySku(sku) {
    return fetchGet(`/user/${sku}`);
  },
  GetUserByUsername(username) {
    return fetchGet(`/user/username/${username}`);
  },
  EditUser(sku, params) {
    return fetchPut(`/user/edit/${sku}`, params);
  },

  /**
   * Merchant
   */
  GetMerchants() {
    return fetchGet('/merchant');
  },
  GetMerchantBySku(sku) {
    return fetchGet(`/merchant/${sku}`);
  },
  EditMerchant(sku, params) {
    return fetchPut(`/merchant/edit/${sku}`, params);
  },

  /**
   * Admin
   */
  GetAdmin(sku) {
    return fetchGet(`/admin/${sku}`);
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
  GetRestaurantByMerchantSku(merchantSku) {
    return fetchGet(`/restaurant/${merchantSku}`);
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
  GetTourGuideByName(name) {
    return fetchGet(`/tour-guide/name/${name}`);
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
  GetReviewBySkuAndId(sku, id) {
    return fetchGet(`/review/${sku}/id/${id}`);
  },
  PostItineraryReview(sku, userSku, params) {
    return fetchPost(`/review/${sku}/user/${userSku}/add/wisata`, params);
  },
  PostRestaurantReview(sku, userSku, params) {
    return fetchPost(`/review/${sku}/user/${userSku}/add/restaurant`, params);
  },

  /**
   * Travelling Schedule
   */
  GetTravellingSchedule(userSku) {
    return fetchGet(`/schedule/${userSku}`);
  },
  GetTravellingScheduleById(id) {
    return fetchGet(`/schedule/detail/${id}`);
  },
  PostTravellingSchedule(userSku, params) {
    return fetchPost(`/schedule/${userSku}/add/`, params);
  },
  EditTravellingSchedule(id, params) {
    return fetchPut(`/schedule/edit/${id}`, params);
  },
  RemoveTravellingSchedule(id) {
    return fetchPut(`/schedule/delete/${id}`);
  },

  /**
   * Location
   */
  GetNearByLocation(long, lat) {
    return fetchGet(`/nearBy/${long}/${lat}`);
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
