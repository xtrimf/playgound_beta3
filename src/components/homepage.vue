<template >
  <div >
    <!-- <b-container fluid> -->
      <!-- <b-row align-h="center"> -->
        <!-- <b-col align-h="center"> -->
          <app-herbs-table></app-herbs-table>
        <!-- </b-col> -->
    <!-- </b-row> -->
    <!-- <b-row align-h="center"> -->
        <!-- <b-col align-h="center"> -->
          <app-chart v-if="this.$store.getters.getTotalQunatity > 0"></app-chart>
        <!-- </b-col> -->
    <!-- </b-row> -->
    <!-- </b-container> -->
  </div>

</template>

<script>
import HerbsTable from './Herbs/herbsTable.vue';
import ChartComp from './chart.vue';

export default {
  date(){
    return {
    //  tq:
    }
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
  components: {
    appHerbsTable: HerbsTable,
    appChart: ChartComp
  }
}
</script>
<style>
</style>
