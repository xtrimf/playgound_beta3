<template>
  <div class="wrapper">
    <!-- <div class="header">Header</div> -->
    <appHeader class="header"></appHeader>
    <div class="herbTable">herbTable</div>
    <div class="chart">chart</div>
    <div class="footer">footer</div>
  </div>
    <!-- <div>
      <b-container>
      <b-row align-h="center" align-v="start">
		      <b-col cols="*">
            <appHeader></appHeader>
          </b-col>
      </b-row>
      <br>

        <div v-if="loading == true">
          <b-row align-v="center" align-h="center">
            <div class="sk-folding-cube">
              <div class="sk-cube1 sk-cube"></div>
              <div class="sk-cube2 sk-cube"></div>
              <div class="sk-cube4 sk-cube"></div>
              <div class="sk-cube3 sk-cube"></div>
            </div>
          </b-row>
        </div>

      <b-row v-else class="justify-content-center">
        <b-col cols="*">
          <Homepage></Homepage>
        </b-col>
      </b-row > -->
    <!-- <transition name="slide" mode="out-in">
      <router-view></router-view>
    </transition> -->
  <!-- </b-container>
    </div> -->
</template>

<script async src="//unpkg.com/babel-polyfill@latest/dist/polyfill.min.js"></script>
<script src="//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.js"></script>
<script>

  import Header from './components/header.vue';
  import Homepage from './components/homepage.vue';

  export default {
    data() {
      return {
      }
    },
      components: {
        appHeader: Header,
        Homepage
      },
      created() {
        this.$store.dispatch('initHerbs');
      },
      computed:{
        loading(){
          if(this.$route.params.rev != undefined) {
            return this.$store.getters.loadStatus
          } else {
          return false
          }
        }
    },

    }
</script>

<style>
.wrapper {
  background-repeat: no-repeat;
  background-position: top center;
  height: 1024px;
  width: 768px;
  display: grid;
  grid-template-columns: 0.1fr 1fr 0.1fr;
  grid-gap: 10px;
  grid-template-rows: 100px auto auto 100px;
  /*grid-auto-rows: minmax(100px, auto);*/
  /*border: 1px solid;*/
}
.wrapper > div {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  border: solid 1px;
}

.header {
  grid-column: 1 / -1 ;
}
.herbTable {
  grid-column: 2 ;
}
.chart {
  grid-column: 2 ;
}
.footer {
  grid-column: 1 / -1 ;
  grid-row: 4;
}

 @media screen and (min-width : 1024px) /*and (max-width : 1439px) */
{
  .wrapper {
    background-image: url("~/static/bg1024px.jpg");
    background-size: 1024px;
    width: 1024px;
  }
}

@media screen and (min-width : 1440px)
{
  .wrapper {
    background-image: url("~/static/bg1440px.jpg");
    background-size: 1440px 1024px;
    height: 1024px;
    width: 1440px;
  }
}

@media screen and (max-width : 1023px)
{
  .wrapper {
    background-image: url("~/static/bg768px.jpg");
    background-size: 768px 1024px;
  }
}


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
<style src="./assets/css/foldingCube.css"></style>
