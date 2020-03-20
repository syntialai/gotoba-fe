import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

/*
require('webpack-icons-installer');   //load ALL icons
 
//OR:
 
require('webpack-icons-installer/font-awesome'); //load only font-awesome icons
require('webpack-icons-installer/google');  //load only google material-design-icons
require('webpack-icons-installer/bootstrap');  //load only bootstrap glyphicons
*/

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
