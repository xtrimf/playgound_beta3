import emptyList from '../../data/herbsList.js';
import emptyChart from '../../data/tempDistribution.js';
import {router} from '../../main.js'
var _ = require('lodash');

const state = {
  herbs:[],
  prevHerbs:[],
  props:[],
  chart:[],
  link:'',
  revision:1,
  loading: false
};

const mutations = {
  'INIT_HERBS' (state) {
    state.herbs = emptyList.map(item => {return {...item}}); // "deep" copy
    state.prevHerbs = emptyList.map(item => {return {...item}}); // "deep" copy
    state.chart = emptyChart.map(item => {return {...item}}); // "deep" copy
  },
  'ADD_HERB_ROW' (state, herbs) {
    state.herbs.push({ id: state.herbs.length+1, name:'', quantity:0, unit:'', comment:'', key: _.maxBy(state.herbs, 'key').key+1})
  },
  'SET_LOAD_STATUS' (state, bool) {
    state.loading = bool ;
  },
  'ASSIGN_PROPS' (state, props, herb) {
    state.props.push(props);
  },
  'ASSIGN_LINK' (state, link) {
    state.link = link;
    state.revision = link===''? 1 : state.revision;
  },
  'ADD_REVISION' (state) {
    ++state.revision
  },
  'LOAD_HERBS' (state,herbs) {
    state.herbs = herbs.map(item => {return {...item}}); // "deep" copy
    state.prevHerbs = herbs.map(item => {return {...item}}); // "deep" copy
  },
  'SET_REVISION' (state,revision) {
    state.revision = revision;
  },
  'SAVE_TO_PRV' (state) {
    state.prevHerbs = state.herbs.map(item => {return {...item}}); // "deep" copy
  },
  'DELETE_ROW' (state,herbID) {
    state.herbs.splice(herbID-1,1); // remove the line
    _.each(state.herbs, function(herb, index) { // and re-assign the IDs
            herb.id = index+1;
        });
  },
  'SET_CHART' (state) {
    state.chart = emptyChart.map(item => {return {...item}}); // "deep" copy
    state.chart.map(item => {
          var arr = _.filter(state.props, ['Temp', item.temp]); // get herbs with relevant temp from "props"
          //console.log(item.temp + '->' + JSON.stringify(arr));
          if (arr.length>0) {
          arr.map(herb => {
            var arr2 = _.filter(state.herbs, ['name', herb.Name]); // get the herbs that are in "arr"
            //console.log(arr2);
            item.quan += (_.sumBy(arr2,'quantity') - 0)  // the "-0" is to parse string to number

          })
        }
    });
  },
  'SET_CHART2' (state) {
    // empty chart
    state.chart = emptyChart.map(item => {return {...item}}); // "deep" copy

    for ( var i = 0 ; i < state.herbs.length ; i++) { // loop through all herbs
      if (state.herbs[i].quantity > 0 ) {   // use only herbs with quantity > 0
        var t = getTemp(state.herbs[i].name); // get the temp for that herb
          if( t != undefined) { // make sure its fully loaded
            for (var j=0 ; j < 10 ; j++) {  // find the temp in chart and add to its quantity
              state.chart[j].quan += state.chart[j].temp == t ? state.herbs[i].quantity : 0 ;
            }
          }
      }
    }
     // function to return herb temperature
     function getTemp(herb) {
       for (var i = 0 ; i < state.props.length ; i++) {
         if (herb == state.props[i].Name) {
           return state.props[i].Temp
         }
       }
     }
  }
};

const actions = {
  addHerbRow: ({commit}) => {
    commit('ADD_HERB_ROW');
  },
  initHerbs: ({commit}) => {
    commit ('INIT_HERBS');
  },
  assignLink: ({commit}, link) => {
    commit ('ASSIGN_LINK', link);
  },
  addRevision: ({commit}) => {
    commit ('ADD_REVISION');
  },
  saveToPrv: ({commit}) => {
    commit ('SAVE_TO_PRV');
  },
  deleteRow: ({commit},herbID) => {
    commit ('DELETE_ROW',herbID);
    if(state.herbs.length < emptyList.length) { // a minimum rows should be there
      commit('ADD_HERB_ROW',state.herbs)
    }
  },
  setChartParams: ({commit}) => {
    commit('SET_CHART2');
  }
};

const getters = {
  herbs: state => {
    return state.herbs;
  },
  maxHerbs: state => {
    return state.herbs.length;
  },
  lastHerbPosition: state=> {
    for (var i=state.herbs.length-1 ; i > 0 ; i--) {
      if (state.herbs[i].name!='') {
        //i = 0;
        return i;
      }
    }
  },
  link: state => {
     return state.link;
   },
  url: (state, getters, rootState) => {
    var pathArray = location.href.split( '/' );
    var protocol = pathArray[0];
    var host = pathArray[2];
    var url = protocol + '//' + host;
    return url+rootState.route.path;
   },
  loadStatus: state => {
     return state.loading;
   },
  revision: state => {
     return state.revision;
   },
  props: (state,herb) => {
     return state.props;
   },
  checkIfEmpty: state => {
    return _.find(state.herbs, 'name')==undefined;
  },
  enableSave: state => {
            // list is NOT empty && changes where made to the current list
    //return  _.find(state.herbs, 'name')!=undefined && !_.isEqual(state.herbs, state.prevHerbs);
    return  _.find(state.herbs, 'name')!=undefined && JSON.stringify(state.herbs)!=JSON.stringify(state.prevHerbs);
  },
  getChartData: state => {
    return state.chart;
  },
  getTotalQunatity: state => {
    let tq = 0;
    for (var i = 0 ; i< state.herbs.length-1; i++){
      tq += state.herbs[i].quantity
    }
    return tq;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
