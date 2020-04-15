import Vue from 'vue';
import Vuex from 'vuex';

import restaurant from './modules/restaurant';
import review from './modules/review';
import search from './modules/search';
import user from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    restaurant,
    review,
    search,
    user,
  },
});
