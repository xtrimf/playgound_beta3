import Homepage from './components/homepage.vue';

export const routes = [
  { path : '/', name: 'homePage', components:{
    default: Homepage
  }},
  // { path : '/protfolio', name: 'protfolio', components:{
  //   default: Protfolio
  // }},
  // { path : '/stocks', name: 'stock', components:{
  //   default: Stocks
  // }},
  { path : '/:id/:rev', name: 'LoadData', components:{
    default: Homepage
  }},
  {path: '*', redirect: '/'} // a generic catch-All
];
