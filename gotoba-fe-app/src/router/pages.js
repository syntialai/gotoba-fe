const LOGIN = () => import('../views/User/Login.vue');
const SIGN_UP = () => import('../views/User/SignUp.vue');
const TERMS_AND_CONDITION = () => import('../views/User/TermsAndCondition.vue');
const PRIVACY_POLICY = () => import('../views/User/PrivacyPolicy.vue');
const EDIT_PROFILE = () => import('../views/User/EditProfile.vue');
const HISTORY = () => import('../views/User/History.vue');
const NOTIFICATION = () => import('../views/User/Notification.vue');
const NOTIFICATION_DETAIL = () => import('../views/User/NotificationDetail.vue');
const PAYMENT_GUIDE = () => import('../views/User/PaymentGuide.vue');
const SEARCH = () => import('../views/User/Search.vue');
const MY_TICKETS = () => import('../views/User/MyTickets.vue');

const HISTORY_PENDING = () => import('../components/User/History/HistoryPending.vue');
const HISTORY_CANCELLED = () => import('../components/User/History/HistoryCancelled.vue');
const TICKET_EXPIRED = () => import('../components/User/Ticket/ExpiredTicket.vue');
const GALLERY = () => import('../components/User/Home/Gallery.vue');

const Pages = {
  LOGIN,
  SIGN_UP,
  TERMS_AND_CONDITION,
  PRIVACY_POLICY,
  EDIT_PROFILE,
  HISTORY,
  NOTIFICATION,
  NOTIFICATION_DETAIL,
  PAYMENT_GUIDE,
  SEARCH,
  MY_TICKETS,
};

const Components = {
  HISTORY_PENDING,
  HISTORY_CANCELLED,
  TICKET_EXPIRED,
  GALLERY,
};

export { Components, Pages };
export default Pages;

// verified user
// const ITINERARY = () => import('');
// const PROFILE = () => import('');
// const MY_TICKET = () => import('');
// const CART = () => import('');
