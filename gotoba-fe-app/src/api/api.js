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

export async function fetchGet(url, param) {
  let data;

  try {
    const response = await axios.get(url, {
      params: param,
    });
    data = response.data;
  } catch (err) {
    console.log(err);
  }

  return data;
}

export async function fetchPost(url, params) {
  let data;

  try {
    const response = await axios.post(url, params);
    return response.data;
  } catch (err) {
    console.log(err);
  }

  return data;
}

export async function fetchPut(url, params) {
  let data;

  try {
    const response = await axios.put(url, params);
    data = response.data;
  } catch (err) {
    console.log(err);
  }

  return data;
}

export async function fetchDelete(url) {
  let data;

  try {
    const response = await axios.delete(url);
    return response.data;
  } catch (err) {
    console.log(err);
  }

  return data;
}

export default {
  Login(params) {
    return fetchPost('/auth/login', params);
  },
  Signup(params) {
    return fetchPost('/auth/signup', params);
  },
  CheckToken() {
    return fetchGet('/auth/validate');
  },
  Logout() {
    return fetchPost('/auth/logout');
  },
  imageUrl(url) {
    return `${axios.defaults.baseURL}image${url}`;
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
    return fetchGet(`/user/sku/${sku}`);
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
    return fetchGet('/merchant/');
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
  GetItineraryByMerchantSku(merchantSku) {
    return fetchGet(`/wisata/merchant/${merchantSku}`);
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
  GetBistroType() {
    return fetchGet('/restaurant/bistro/');
  },
  GetRestaurantBySku(sku) {
    return fetchGet(`/restaurant/${sku}`);
  },
  GetRestaurantByMerchantSku(merchantSku) {
    return fetchGet(`/restaurant/merchant/${merchantSku}`);
  },
  PostRestaurant(merchantSku, params) {
    return fetchPost(`/restaurant/add/${merchantSku}`, params);
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
  async GetSearchLocationResult(location) {
    const res = await axios
      .get(`http://nominatim.openstreetmap.org/search?format=json&limit=5&country=Indonesia&q=${location}`);
    return res.data;
  },
  async ReverseGeocoding(long, lat) {
    const res = await axios
      .get(`https://nominatim.openstreetmap.org/reverse?format=geojson&lat=${lat}&lon=${long}`);

    console.log(res);
    return res.data.features[0].properties;
  },

  /**
   * Ticket
   */
  GetTickets() {
    return fetchGet('/ticket/');
  },
  GetTicketByMerchant(merchantSku) {
    return fetchGet(`/ticket/merchant/${merchantSku}`);
  },
  GetRestaurantTicket() {
    return fetchGet('ticket/category/restaurant');
  },
  GetJourneyTicket() {
    return fetchGet('/ticket/category/journey');
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
  GetOrderDetailByUser(userSku, status) {
    return fetchGet(`/order/user/${userSku}/status/${status}`);
  },
  CheckoutOrder(sku) {
    return fetchPut(`/order/checkout/${sku}`);
  },
  ApproveOrder(sku) {
    return fetchPut(`/order/approve/${sku}`);
  },
  RejectOrder(sku) {
    return fetchPut(`/order/reject/${sku}`);
  },
  CancelOrder(sku) {
    return fetchPut(`/order/cancel/${sku}`);
  },
  PostOrderDetail(userSku, params) {
    return fetchPost(`/order/user/${userSku}/add`, params);
  },
  EditOrderDetail(sku, params) {
    return fetchPut(`/order/edit/${sku}`, params);
  },
  RemoveOrder(sku) {
    return fetchDelete(`/order/delete/${sku}`);
  },

  /**
   * Payment
   */
  GetPayment(sku) {
    return fetchGet(`/pay/sku/${sku}`);
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
