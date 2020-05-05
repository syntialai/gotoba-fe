const LOGIN = () => import('../views/User/Login.vue');
const SIGN_UP = () => import('../views/User/SignUp.vue');

const ITINERARY = () => import('../views/User/');
const MY_TICKETS = () => import('../views/User/Ticket/MyTickets.vue');
const CART = () => import('../views/User/Payment/Cart.vue');
const PROFILE = () => import('../views/User/Profile/Profile.vue');

const NOTIFICATION = () => import('../views/User/Notification/Notification.vue');
const NOTIFICATION_DETAIL = () => import('../views/User/Notification/NotificationDetail.vue');
const SEARCH = () => import('../views/User/Search/Search.vue');
const RESTAURANT_PROFILE = () => import('../views/User/Home/RestaurantProfile.vue');
const RESTAURANT_REVIEW = () => import('../views/User/Home/RestaurantReview.vue');
const JOURNEY_PROFILE = () => import('../views/User/Home/JourneyProfile.vue');
const JOURNEY_REVIEW = () => import('../views/User/Home/JourneyReview.vue');
const PROMOTION_DETAIL = () => import('../views/User/Home/PromotionDetail.vue');
const ITINERARY_ADD = () => import('../views/User/');
const SHOW_QR_CODE = () => import('../views/User/Ticket/ShowQRCode.vue');
const PAYMENT = () => import('../views/User/Payment/Payment.vue');
const PAYMENT_ORDER = () => import('../views/User/Payment/PaymentOrder.vue');
const EDIT_PROFILE = () => import('../views/User/Profile/EditProfile.vue');
const HISTORY = () => import('../views/User/History/History.vue');
const TERMS_AND_CONDITION = () => import('../views/User/TermsAndCondition.vue');
const PRIVACY_POLICY = () => import('../views/User/PrivacyPolicy.vue');
const PAYMENT_GUIDE = () => import('../views/User/Payment/PaymentGuide.vue');

const HISTORY_PENDING = () => import('../components/User/History/HistoryPending.vue');
const HISTORY_CANCELLED = () => import('../components/User/History/HistoryCancelled.vue');
const TICKET_EXPIRED = () => import('../components/User/Ticket/ExpiredTicket.vue');

const USER_DATA = () => import('../views/Admin/UserData.vue');

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
  PROMOTION_DETAIL,
  ITINERARY_ADD,
  SHOW_QR_CODE,
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
  TICKET_EXPIRED,
};

export const Admin = {
  USER_DATA,
};
