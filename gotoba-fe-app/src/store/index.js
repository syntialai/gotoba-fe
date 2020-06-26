import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app';
import gallery from './modules/gallery';
import journey from './modules/journey';
import order from './modules/order';
import restaurant from './modules/restaurant';
import review from './modules/review';
import search from './modules/search';
import ticket from './modules/ticket';
import tourGuide from './modules/tourGuide';
import user from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    gallery,
    journey,
    order,
    restaurant,
    review,
    search,
    ticket,
    tourGuide,
    user,
  },
});
