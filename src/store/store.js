import Vue from 'vue';
import Vuex from 'vuex';
import herbs from './modules/herbs.js';

import * as actions from './actions.js';

Vue.use(Vuex);

export const store = new Vuex.Store ({
  actions,
  modules: {
    herbs
      }
});
