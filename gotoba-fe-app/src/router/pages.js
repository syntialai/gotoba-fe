const LOGIN = () => import('../views/Auth/Login.vue');
const SIGN_UP = () => import('../views/Auth/SignUp.vue');

const ITINERARY = () => import('../views/User/Itinerary/Itinerary.vue');
const MY_TICKETS = () => import('../views/User/Ticket/MyTickets.vue');
const CART = () => import('../views/User/Payment/Cart.vue');
const PROFILE = () => import('../views/User/Profile/Profile.vue');

const SEARCH = () => import('../views/User/Search/Search.vue');
const ABOUT = () => import('../views/User/Home/About.vue');
const HOME_MORE = () => import('../views/User/Home/HomeMore.vue');
const RESTAURANT = () => import('../views/User/Restaurant/Restaurant.vue');
const RESTAURANT_PROFILE = () => import('../views/User/Restaurant/RestaurantProfile.vue');
const JOURNEY = () => import('../views/User/Journey/Journey.vue');
const JOURNEY_PROFILE = () => import('../views/User/Journey/JourneyProfile.vue');
const TOUR_GUIDE = () => import('../views/User/TourGuide/TourGuide.vue');
const TOUR_GUIDE_PROFILE = () => import('../views/User/TourGuide/TourGuideProfile.vue');
const PROMOTION = () => import('../views/User/Home/Promotion.vue');
const TICKET_DETAIL = () => import('../views/User/Home/TicketDetail.vue');
const GALLERY = () => import('../views/User/Gallery/Gallery.vue');
const ITINERARY_ADD = () => import('../views/User/Itinerary/AddItinerary.vue');
const ADD_DESTINATION = () => import('../views/User/Itinerary/AddDestination.vue');
const SHOW_QR_CODE = () => import('../views/User/Ticket/ShowQRCode.vue');
const TICKET_VALID = () => import('../views/User/Ticket/ValidTicket.vue');
const TICKET_EXPIRED = () => import('../views/User/Ticket/ExpiredTicket.vue');
const PAYMENT = () => import('../views/User/Payment/Payment.vue');
const PAYMENT_ORDER = () => import('../views/User/Payment/PaymentOrder.vue');
const EDIT_PROFILE = () => import('../views/User/Profile/EditProfile.vue');
const HISTORY = () => import('../views/User/History/History.vue');
const TERMS_AND_CONDITION = () => import('../views/User/TermsAndCondition.vue');
const PRIVACY_POLICY = () => import('../views/User/PrivacyPolicy.vue');
const HISTORY_SUCCESS = () => import('../views/User/History/HistorySuccess.vue');
const HISTORY_PENDING = () => import('../views/User/History/HistoryPending.vue');
const HISTORY_CANCELLED = () => import('../views/User/History/HistoryCancelled.vue');
const HISTORY_DETAILS = () => import('../views/User/History/HistoryDetails.vue');

const ADMIN_VIEW = () => import('../views/Admin/Admin.vue');
const USER_DATA = () => import('../views/Admin/UserData.vue');
const MERCHANT_DATA = () => import('../views/Admin/MerchantData.vue');
const GALLERY_DATA = () => import('../views/Admin/GalleryData.vue');
const GALLERY_DETAIL = () => import('../views/Admin/GalleryDetail.vue');
const ITINERARY_DATA = () => import('../views/Admin/ItineraryData.vue');
const ITINERARY_DETAIL = () => import('../views/Admin/ItineraryDetail.vue');
const RESTAURANT_DATA = () => import('../views/Admin/RestaurantData.vue');
const RESTAURANT_DETAIL = () => import('../views/Admin/RestaurantDetail.vue');
const TOUR_GUIDE_DATA = () => import('../views/Admin/TourGuideData.vue');
const TOUR_GUIDE_DETAIL = () => import('../views/Admin/TourGuideDetail.vue');

const MERCHANT_VIEW = () => import('../views/Merchant/Merchant.vue');
const MERCHANT_ORDER_LIST = () => import('../views/Merchant/Order/OrderList.vue');
const MERCHANT_ORDER_NEW = () => import('../views/Merchant/Order/NewOrder.vue');
const MERCHANT_ORDER_RECENT = () => import('../views/Merchant/Order/RecentOrder.vue');
const MERCHANT_ADD_LOCATION = () => import('../views/Merchant/Location/AddDestination.vue');
const MERCHANT_PROFILE = () => import('../views/Merchant/Profile/Profile.vue');
const MERCHANT_SPOT = () => import('../views/Merchant/Spot/Spot.vue');
const MERCHANT_SPOT_DETAIL = () => import('../views/Merchant/Spot/SpotDetail.vue');
const MERCHANT_SPOT_EDIT = () => import('../views/Merchant/Spot/EditSpot.vue');
const MERCHANT_BISTRO = () => import('../views/Merchant/Bistro/Bistro.vue');
const MERCHANT_BISTRO_EDIT = () => import('../views/Merchant/Bistro/EditBistro.vue');
const MERCHANT_SCANNER = () => import('../views/Merchant/Scanner/QrScanner.vue');
const MERCHANT_SCAN_RESULT = () => import('../views/Merchant/Scanner/ScanResult.vue');
const MERCHANT_EDIT_PROFILE = () => import('../views/Merchant/Profile/EditProfile.vue');

export const NOT_FOUND = () => import('../views/Error/NotFound.vue');

export const Pages = {
  LOGIN,
  SIGN_UP,
  ITINERARY,
  MY_TICKETS,
  CART,
  PROFILE,
  ABOUT,
  SEARCH,
  HOME_MORE,
  RESTAURANT,
  RESTAURANT_PROFILE,
  JOURNEY,
  JOURNEY_PROFILE,
  TOUR_GUIDE,
  TOUR_GUIDE_PROFILE,
  PROMOTION,
  TICKET_DETAIL,
  GALLERY,
  ITINERARY_ADD,
  ADD_DESTINATION,
  SHOW_QR_CODE,
  TICKET_VALID,
  TICKET_EXPIRED,
  PAYMENT,
  PAYMENT_ORDER,
  EDIT_PROFILE,
  HISTORY,
  TERMS_AND_CONDITION,
  PRIVACY_POLICY,
  HISTORY_SUCCESS,
  HISTORY_PENDING,
  HISTORY_CANCELLED,
  HISTORY_DETAILS,
};

export const Admin = {
  ADMIN_VIEW,
  USER_DATA,
  MERCHANT_DATA,
  GALLERY_DATA,
  GALLERY_DETAIL,
  ITINERARY_DATA,
  ITINERARY_DETAIL,
  RESTAURANT_DATA,
  RESTAURANT_DETAIL,
  TOUR_GUIDE_DATA,
  TOUR_GUIDE_DETAIL,
};

export const Merchant = {
  MERCHANT_VIEW,
  MERCHANT_ORDER_LIST,
  MERCHANT_ORDER_NEW,
  MERCHANT_ORDER_RECENT,
  MERCHANT_ADD_LOCATION,
  MERCHANT_PROFILE,
  MERCHANT_SPOT,
  MERCHANT_SPOT_DETAIL,
  MERCHANT_SPOT_EDIT,
  MERCHANT_BISTRO,
  MERCHANT_BISTRO_EDIT,
  MERCHANT_SCANNER,
  MERCHANT_SCAN_RESULT,
  MERCHANT_EDIT_PROFILE,
};
