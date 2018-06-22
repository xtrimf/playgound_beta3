<template>
  <div class="wrapper" :class="{ overflowOn: ofOn}">
      <appHeader class="header"></appHeader>
      <loading v-if="gridSupported" :active.sync="isLoading" :can-cancel="false"></loading>
      <notSupported class="notSupported" v-if="!gridSupported"></notSupported>
      <appHerbsTable v-if="!isLoading && gridSupported" class="herbTable"></appHerbsTable>
      <appChart v-if="!isLoading && gridSupported" class="chart">chart</appChart>
      <div v-if="gridSupported" class="footer">
        <div>
          We would love to have your &nbsp<a href="mailto:feedback@tcmherbalist.com">feedback</a>
        </div>
      <div>
        &nbsp | © All rights reserved to ETI | Herbalist Playground Beta 2018
      </div>
    </div>
  </div>
</template>

<script async src="//unpkg.com/babel-polyfill@latest/dist/polyfill.min.js"></script>
<!-- <script src="//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.js"></script> -->
<script>
// Import component
  import notSupported from './components/notSupported.vue';

  import Loading from 'vue-loading-overlay';
  // Import stylesheet
  import 'vue-loading-overlay/dist/vue-loading.min.css';

  import Header from './components/header.vue';
  import HerbsTable from './components/Herbs/herbsTable.vue';
  import ChartComp from './components/chart.vue';
  // import Homepage from './components/homepage.vue';

  export default {
    data() {
      return {
        msg: 'This is a button.'

      }
    },
      components: {
        notSupported,
        Loading,
        appHeader: Header,
        appHerbsTable: HerbsTable,
        appChart: ChartComp
      },
      created() {
        this.$store.dispatch('initHerbs');
        // if(!this.gridSupported) {
        //   alert('You seem to use and old browser, thus the look, feel & functionality might not be as expected...')
        // }
      },
      computed:{
        isLoading(){
          if(this.$route.params.rev != undefined) {
            return this.$store.getters.loadStatus
          } else {
          return false
          }
        },
        ofOn() {  // to add overflow
          return this.$store.getters.maxHerbs > 9
        },
        gridSupported(){
          return CSS.supports("display", "grid");
        }
    },

    }
</script>

<style>
.wrapper {
  background-repeat: no-repeat;
  background-position: top center;
  height: 1024px;
  min-width: 1055px;
  display: grid;
  grid-template-columns: 0.1fr 2.8fr 0.1fr;
  grid-gap: 10px;
  grid-template-rows: 100px auto auto 20px;
  font-family: 'roboto',sans-serif;
  /*grid-auto-rows: minmax(100px, auto);*/
  /*border: 1px solid;*/
}

.overflowOn {
  overflow:auto;
}

.wrapper > div {
  display: flex;
  justify-content: center;
  /* align-items: center; */
  font-size: 16px;
  font-weight: 400;
  /* border: solid 1px; */
  color: #39393ac7 /*#39393A*/;
}

.header {
  grid-column: 2 ;
}
.herbTable  {
  grid-column: 2 ;
}
.chart {
  grid-column: 2 ;
}
.footer {
  grid-column: 2 ;
  grid-row: 4;
  display: flex !important;
}

.footer > div {
  color: white !important;
  font-size: 14px;
  letter-spacing: 0.12px;
  font-family: 'roboto';
  /* position: relative !important; */
  justify-content:flex-start !important;
  /* left: 60px !important; */
  font-weight: 100 !important;
}

 @media screen and (max-width : 1439px) /*and (max-width : 1439px) */
{
  .wrapper {
    background-image: url("~/static/bg1440px.jpg");
    background-size: cover;
    /* background-size: 1024px; */
    /* width: 1024px; */
  }
}

@media screen and (min-width : 1440px)
{
  .wrapper {
    background-image: url("~/static/bg1440px.jpg");
    background-size: 1440px auto;
    /* height: 1024px; */
    width: 1440px;
  }
}

/* @media screen and (max-width : 1023px)
{
  .wrapper {
    background-image: url("~/static/bg768px.jpg");
    background-size: 768px 1024px;
  }
} */


  .slide-enter-active {
    animation: slide-in 200ms ease-out forwards;
  }
  .slide-leave-active {
    animation: slide-out 200ms ease-out forwards;
  }

  @keyframes slide-in {
    from {
      transform: translateY(-30px);
      opacity: 0;
    }

    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slide-out {
    from {
      transform: translateY(0);
      opacity: 1;
    }

    to {
      transform: translateY(30px);
      opacity: 0;
    }
  }

</style>
<!-- <style src="./assets/css/foldingCube.css"></style> -->
<style src="./assets/css/tooltip.css"></style>
