import Vue from 'vue';
import Vuex from 'vuex';

import admin from './modules/admin';
import app from './modules/app';
import auth from './modules/auth';
import gallery from './modules/gallery';
import journey from './modules/journey';
import location from './modules/location';
import merchant from './modules/merchant';
import order from './modules/order';
import restaurant from './modules/restaurant';
import review from './modules/review';
import search from './modules/search';
import schedule from './modules/schedule';
import ticket from './modules/ticket';
import tourGuide from './modules/tourGuide';
import user from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    admin,
    app,
    auth,
    gallery,
    journey,
    location,
    merchant,
    order,
    restaurant,
    review,
    search,
    schedule,
    ticket,
    tourGuide,
    user,
  },
});
