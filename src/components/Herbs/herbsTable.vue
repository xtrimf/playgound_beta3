<template lang="html">
  <div>
      <table class="herbsTable">
        <thead class="thead">
          <tr>
            <th scope="row" width="39px"></th>
            <th width="170px">Herb</th>
            <th>
              <div style="display: inline-flex !important;">
                <multiselect  v-model="selectedProp"
                              label="name"
                              style="top: -2px; left: 5px; color: rgb(22,25,27)"
                              :options="optionList"
                              :searchable="false"
                              :allow-empty="false"
                              :show-no-results="false"
                              :show-labels="false">
                    </multiselect>
                </div>
            </th>
            <th width="65px">Quan'</th>
            <!-- <th width="50px">Unit</th> -->
            <th width="188px" class="noBorder">Temp'</th>
            <th id="Tx">Toxicity</th>
            <th id="PCI">PCI</th>
            <th width="70px">Remove</th>
          </tr>
        </thead>
        <tbody name="fade" is="transition-group" mode="out-in">
          <app-herb v-for="herb in herbs"  @event1="showComments" :herb="herb" :selectedProp="selectedProp.value" :key="herb.key"></app-herb>
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

<style src="../../assets/css/multiSelect.css"></style>
<style lang="css" >

.herbsTable {
  width: 100%;
  /* height: 100%; */
  opacity: 0.9;
  background-color: white;
  border-collapse:collapse;
  /* height: 450px; */
}
.herbsTable th {
  text-align: center;
  padding: 0.1rem !important;
  font-size: 18px;
  height: 40px;
  font-weight: 500;
}

.herbsTable td {
  /* padding: 0.1rem 0.3rem 0.1rem 0.3rem !important; */
  line-height: 41px;
  /* box-sizing: border-box; */
  border: solid 1px #D0D0D0 ;
  /* height: 1px;
  border: 1px
  solid #D0D0D0; */
}

/* mark{
    background-color:transparent !important;
    font-weight: bold;
    padding:0;
    margin:0;
} */
</style>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
