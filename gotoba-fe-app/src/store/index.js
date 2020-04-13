import Vue from 'vue';
import Vuex from 'vuex';

import search from './modules/search';
import user from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    search,
    user,
  },
});
