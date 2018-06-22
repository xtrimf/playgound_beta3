import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
// import BootstrapVue from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
//import VueFire from 'vuefire';
import App from './App.vue';
import { sync } from 'vuex-router-sync'
import {routes} from './routes.js';
import {store} from './store/store';
//import BootstrapVue from 'bootstrap-vue'
import { Modal } from 'bootstrap-vue/es/components';

import VueClipboard from 'vue-clipboard2';
import VTooltip from 'v-tooltip'

Vue.use(VueClipboard);
Vue.use(Modal);
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VTooltip);
// Vue.use(BootstrapVue);
//Vue.use(VueFire);
//Vue.component(Multiselect)


export const router = new VueRouter({
  routes, // with es6 no need to write routes: routes - its automatic
  mode: 'history' // canceling the hashtag in the address bar
});

Vue.http.options.root = 'https://herbalistplayground.firebaseio.com/'
Vue.http.headers.common['Access-Control-Allow-Origin'] = '*';
Vue.http.options.status = 200;

require('./assets/awesomplete/awesomplete.min.js');
require('./assets/awesomplete/awesomplete.css');

// get the dropdown list here so it will have time to load
$.getJSON('../static/Herbs.json').done(function(response) {
    var herbsDropdown=response;
    localStorage.setItem("herbsDropdown", JSON.stringify(herbsDropdown)); // assign it to local storage
}).fail(function(e) {
    console.log(e);
});

sync(store, router);

// start VUE
var vm = new Vue({

  el: '#app',
  router, // same as "router: router"
  store,
  render: h => h(App)
})
