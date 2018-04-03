<template lang="html">
  <div>
      <table class="table table-sm table-condensed table-responsive table-hover table-bordered" style="background-color: white;">
        <thead class="thead">
          <tr>
            <th class="noBorder" scope="row">#</th>
            <th class="noBorder" width="170px">Herb</th>
            <th class="noBorder">
                <multiselect  v-model="selectedProp"
                              label="name"
                              style="top: -2px; left: 5px; color: rgb(22,25,27)"
                              :options="optionList"
                              :searchable="false"
                              :allow-empty="false"
                              :show-no-results="false"
                              :show-labels="false">
                    </multiselect>
            </th>
            <th width="65px">Quan'</th>
            <!-- <th width="50px">Unit</th> -->
            <th width="135px" class="noBorder">Temp'</th>
            <th id="Tx" width="30px" class="noBorder" v-b-tooltip title="Toxicity">Tx</th>
            <th width="30px" class="noBorder" v-b-tooltip title="Pregnancy Contra-Indication">PCI</th>
            <th width="10px" class="noBorder"></th>
          </tr>
        </thead>
        <tbody>
          <app-herb v-for="herb in herbs" :herb="herb" :selectedProp="selectedProp.value" :key="herb.key"></app-herb>
        </tbody>
      </table>
  </div>
</template>


<script>
import Herb from './herb.vue';
//import herbsDropdown from '/static/Herbs.json';



export default {
  data () {
    return {
      loading: false,
      selectedProp: {name: 'Category', value: 'Group'},
      optionList: [
      //  {name: 'Temperature', value: 'Temp'},
        {name: 'Meridian', value: 'Meridians'},
        {name: 'Taste', value: 'Taste'},
        {name: 'Category', value: 'Group'},
        {name: 'Subcategory', value: 'SubGroup'},
        {name: 'Chinese Name', value: 'ChineseName'},
        {name: 'PinYin', value: 'PinYin'},
        {name: 'Pharma Name', value: 'PharmName'},
      //  {name: 'Toxicity', value: 'isToxic'},
      //  {name: 'Pregnancy Safe', value: 'PregnancySafe'},
        {name: 'Comments', value: 'Comments'}
      ]
    }
  },
  components: {
    appHerb: Herb,
    Multiselect: window.VueMultiselect.default
  },
  computed: {
    herbs() {
      this.$store.dispatch('setChartParams');
      return this.$store.getters.herbs;
    }
  },
  created() {
    this.selectedProp = JSON.parse(localStorage.selected) || this.selectedProp; // get from localstorage
    this.fetchData();
  },
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData',
    selectedProp: function(){ // assign selected value to local storage for re-use
      localStorage.setItem("selected", JSON.stringify(this.selectedProp));
    }
  },
  methods: {
    fetchData() {

    },
    showComments() {
      this.selectedProp = {name: 'Comments', value: 'Comments'};
    }
  },
  updated() {
    
  }
};
</script>

<style lang="css">
th {
  text-align: center;
  padding: 0.1rem !important;
}

td {
  padding: 0.1rem 0.3rem 0.1rem 0.3rem !important;
}
.multiselect__tags {
  border: none;
  background: transparent;
  min-height: 30px !important;
  max-height: 30px !important;

}
.multiselect {
  font-size: inherit !important;
  min-height: 30px !important;
  max-height: 30px !important;
  /*top: 8px;*/
}
.multiselect__content.multiselect__option{
  min-height: 30px !important;
  max-height: 30px !important;

}
.multiselect__element {
  font-size: 14px !important;
  min-height: 30px !important;
  max-height: 30px !important;
}
.multiselect__select{
  min-height: 30px !important;
  max-height: 30px !important;
}

.multiselect__single{
  background: transparent;
  font-size: inherit !important;
}
.multiselect__option.multiselect__option--highlight{
  background: rgb(221,221,221);
  color: rgb(50,50,50);
  font-size: 14px !important;
  min-height: 30px !important;
  max-height: 30px !important;

}

.noBorder{
  border-left: transparent !important;
  border-right: transparent !important;
}

/*.table-responsive {
  overflow: inherit !important;
}*/
/* this is for the awesomelete*/
mark{
    background-color:transparent !important;
    font-weight: bold;
    padding:0;
    margin:0;
}
</style>
