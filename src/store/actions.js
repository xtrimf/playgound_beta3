import Vue from 'vue';
import {router} from '../main.js'

import _ from 'lodash';

export const LoadData = ({dispatch,commit},params) => {
  //console.log('loading data...');
   commit('SET_LOAD_STATUS', true);
  //get herbs
    //console.log('getting herbs from server...');
    Vue.http.get('webdata/'+params.id+'/rev'+params.rev+'.json')
      .then(response => response.json())
      .then(data => {
        //commit('SET_LOAD_STATUS', false);
        if(data) {
          //console.log(data);
           //var start = new Date().getTime();  // simulate delay
           //while (new Date().getTime() < start + 2000);
          commit('LOAD_HERBS', data.herbs);
          commit('ASSIGN_LINK', params.id);
          _.each(data.herbs, function(herb, index) { // get the herbs properties
              dispatch('GetHerbProps',herb.name);
          });
          commit('SET_LOAD_STATUS', false);
        }
        else {
          //no data for this link
          commit('SET_LOAD_STATUS', false);
          commit('INIT_HERBS');
          router.push('/');
        }
      });

// get maxrevision
  Vue.http.get('webdata/'+params.id+'/maxrevision.json')
    .then(response => response.json())
    .then(data => {
      if(data) {
        //console.log(data);
        commit('SET_REVISION', data);
      }
    });
};

export const GetHerbProps = ({dispatch,commit,state},herb) => {
  if(herb != '' && _.find(state.herbs.props, ['Name', herb]) == undefined) { // make sure we don't have already
    Vue.http.get('HerbsTable/'+herb.replace(/ /g, "")+'.json')
      .then(response => response.json())
      .then(data => {
        if(data) {
          //console.log(data);
          //  var start = new Date().getTime();  // simulate delay
          //  while (new Date().getTime() < start + 5000);
          commit('ASSIGN_PROPS', data , herb);
          return(data);
        }
      });
  }
};
