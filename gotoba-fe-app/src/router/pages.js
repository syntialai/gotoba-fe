const LOGIN = () => import('../views/Auth/Login.vue');
const SIGN_UP = () => import('../views/Auth/SignUp.vue');

const ITINERARY = () => import('../views/User/Itinerary/Itinerary.vue');
const MY_TICKETS = () => import('../views/User/Ticket/MyTickets.vue');
const CART = () => import('../views/User/Payment/Cart.vue');
const PROFILE = () => import('../views/User/Profile/Profile.vue');

const NOTIFICATION = () => import('../views/User/Notification/Notification.vue');
const NOTIFICATION_DETAIL = () => import('../views/User/Notification/NotificationDetail.vue');
const SEARCH = () => import('../views/User/Search/Search.vue');
const RESTAURANT_PROFILE = () => import('../views/User/Restaurant/RestaurantProfile.vue');
const RESTAURANT_REVIEW = () => import('../views/User/Restaurant/RestaurantReview.vue');
const JOURNEY_PROFILE = () => import('../views/User/Journey/JourneyProfile.vue');
const JOURNEY_REVIEW = () => import('../views/User/Journey/JourneyReview.vue');
const TOUR_GUIDE_PROFILE = () => import('../views/User/TourGuide/TourGuideProfile.vue');
const TOUR_GUIDE_REVIEW = () => import('../views/User/TourGuide/TourGuideReview.vue');
const PROMOTION_DETAIL = () => import('../views/User/Home/PromotionDetail.vue');
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
const PAYMENT_GUIDE = () => import('../views/User/Payment/PaymentGuide.vue');

const HISTORY_PENDING = () => import('../components/User/History/HistoryPending.vue');
const HISTORY_CANCELLED = () => import('../components/User/History/HistoryCancelled.vue');

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
const MERCHANT_PROFILE = () => import('../views/Merchant/Profile/Profile.vue');
const MERCHANT_SPOT = () => import('../views/Merchant/Spot/Spot.vue');
const MERCHANT_SPOT_PROMOTION = () => import('../views/Merchant/Spot/SpotPromotion.vue');
const MERCHANT_BISTRO = () => import('../views/Merchant/Bistro/Bistro.vue');
const MERCHANT_BISTRO_EDIT = () => import('../views/Merchant/Bistro/EditBistro.vue');
const MERCHANT_BISTRO_REVIEW = () => import('../views/Merchant/Bistro/BistroReview.vue');
const MERCHANT_BISTRO_PROMOTION = () => import('../views/Merchant/Bistro/BistroPromotion.vue');
const MERCHANT_SCANNER = () => import('../views/Merchant/Scanner/QrScanner.vue');

export const Pages = {
  LOGIN,
  SIGN_UP,
  ITINERARY,
  MY_TICKETS,
  CART,
  PROFILE,
  NOTIFICATION,
  NOTIFICATION_DETAIL,
  SEARCH,
  RESTAURANT_PROFILE,
  RESTAURANT_REVIEW,
  JOURNEY_PROFILE,
  JOURNEY_REVIEW,
  TOUR_GUIDE_PROFILE,
  TOUR_GUIDE_REVIEW,
  PROMOTION_DETAIL,
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
  PAYMENT_GUIDE,
};

export const Components = {
  HISTORY_PENDING,
  HISTORY_CANCELLED,
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
  MERCHANT_PROFILE,
  MERCHANT_SPOT,
  MERCHANT_SPOT_PROMOTION,
  MERCHANT_BISTRO,
  MERCHANT_BISTRO_EDIT,
  MERCHANT_BISTRO_REVIEW,
  MERCHANT_BISTRO_PROMOTION,
  MERCHANT_SCANNER,
};
