const LOGIN = () => import('../views/Login.vue');
const SIGN_UP = () => import('../views/SignUp.vue');
const TERMS_AND_CONDITION = () => import('../views/TermsAndCondition.vue');
const PRIVACY_POLICY = () => import('../views/PrivacyPolicy.vue');
const EDIT_PROFILE = () => import('../views/EditProfile.vue');
const HISTORY = () => import('../views/History.vue');

const HISTORY_PENDING = () => import('../components/HistoryPending.vue');
const HISTORY_CANCELLED = () => import('../components/HistoryCancelled.vue');

const Pages = {
  LOGIN,
  SIGN_UP,
  TERMS_AND_CONDITION,
  PRIVACY_POLICY,
  EDIT_PROFILE,
  HISTORY,
};

const Components = {
  HISTORY_PENDING,
  HISTORY_CANCELLED,
}

export { Components, Pages };
export default Pages;

// verified user
// const ITINERARY = () => import('');
// const PROFILE = () => import('');
// const MY_TICKET = () => import('');
// const CART = () => import('');
