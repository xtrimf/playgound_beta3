<template lang="html">
  <!-- <div class="form-inline row"> -->
    <tr>
      <td :id="'td' + herb.key" scope="row" class="align-middle">
        <div class="form-control-static" :class="{grayedOut: herb.name==''}">{{herb.id}}</div>
        <b-tooltip target="td1" title="Enter herb name or abreviation (like LDC = Long Dao Cao)" placement="left" triggers="click"></b-tooltip>
      </td>
      <td class="align-middle" style="max-width: 130px !important;">
        <input  :id="'herb#' + herb.key"
                v-model.lazy="herb.name"
                placeholder=""
                @blur="addRow"
                @focus="$event.target.select();onEnter()">
      </td>
      <td class="align-middle" style='padding: 0; color:rgb(139,139,139) ; white-space:nowrap; font-size:14px;'>
        <b-container><b-row>
          <b-col>
            <div v-show="temp != ''">
              <div v-show="prop == 'Other'" class="form-control-static">
                      {{herbProps(selectedProp)}}
              </div>
              <div v-show="prop == 'Comments'">
                <b-form-input type="text" style='font-size:14px; color:rgb(139,139,139)'
                       v-model="herb.comment"
                       >
                  </b-form-input>
              </div>
            </div>
          </b-col>
          <b-col class="commentSymbol" :class="{hasComment: herb.comment}">
            <div v-show="prop != 'Comments' && herb.name != ''"
                  v-b-tooltip.hover.auto title="add/show comment"
                  @click="showComment"
                  >+</div>
          </b-col>

        </b-row></b-container>
      </td>
      <td class="align-middle">
        <b-form-input
               :id="'quan#' + herb.key"
               v-show="herb.name"
               size="sm"
               type="number"
               style="-moz-appearance: textfield"
               v-model.number="herb.quantity"
               @focus.native="$event.target.select()"
               @change="checkQuan"
               :disabled="herb.name == ''">
          </b-form-input>
      </td>
      <!-- <td class="align-middle">
        <multiselect v-show="!herb.name==''" v-model="herb.unit" :show-labels="false" :show-no-results="false" :options="unitOptions" :searchable="false" :allow-empty="false"></multiselect>
      </td> -->
      <td class="align-middle">
      <div v-show="temp != ''" class="TempContainer temp"
            :class="[herbProps('Temp').replace(/ /g, '')]"
            v-b-tooltip.hover.auto :title="temp"
            >
      </div>
    </td>
    <td class="align-middle">
      <div class="img-container centered img" v-b-tooltip.hover.auto :title="toxic == 'No' ? 'Not Toxic':toxic">
        <img v-show="toxicIMG" :src="toxicIMG" :alt="toxic" :title="toxic" width="25px" height="25px">
      </div>
    </td>
    <td class="align-middle">
      <div class="img-container centered img" v-b-tooltip :title="pregnancy == 'Y' ? 'Safe':'Not Safe'">
        <img v-show="pregIMG" :src="pregIMG" :alt="pregnancy" width="25px" height="25px">
      </div>
    </td>
      <td class="align-middle" width="10px">
        <div v-show="!herb.name=='' || herb.id < $store.getters.lastHerbPosition || (herb.id < $store.getters.maxHerbs && $store.getters.maxHerbs > 9)"
             @click="deleteRow"
             style="cursor: pointer;"
           ><font color="red">x</font>
        </div>
      </td>
</tr>
<!-- </div> -->
</template>


<script>
// import VueAwesomplete from 'vue-awesomplete'
// import AwesompleteCss from 'awesomplete/awesomplete.css'
import {mapActions} from 'vuex';
import _ from 'lodash';

let highlightedVal = null;
let highlightedText = null;

export default {
  props: ['herb','selectedProp'],
  data() {
    return {
      settings: { list: JSON.parse(localStorage.herbsDropdown),
                  autoFirst: true,
                  minChars: 2,
                  maxItems: 200
                },
      //list: JSON.parse(localStorage.herbsDropdown),
      temp:'',
      toxic:'',
      pregnancy:'',
      //selectedUnit:'Raw',
      unitOptions:['Raw','Powder','%','cc']
      //uniqueID: Math.floor((Math.random() * 999999999) + 1)
    }
  },
  components:{
    Multiselect: window.VueMultiselect.default
  },
  methods: {
    ...mapActions({
      getProperties : 'GetHerbProps'
    }),
    onEnter(){
      this.$root.$emit('bv::hide::tooltip');
    },
    addRow() {
      if (this.herb.id === this.$store.getters.maxHerbs) {
        if(this.herb.name) {
          this.$store.dispatch('addHerbRow');
        }
      }
      // now check if name is valid from the highlighted values
      if(this.herb.name == highlightedText) {
        this.herb.name = highlightedVal
      }
    },
    deleteRow(){
      this.herb.name = '';
      this.$store.dispatch('deleteRow',this.herb.id);
    },
    herbProps(prop){
       let val =  _.find(this.$store.getters.props, ['Name', this.herb.name]);
       this.temp = val != undefined ? val.Temp : '';
       this.toxic = val != undefined ? val.isToxic : '';
       this.pregnancy = val != undefined ? val.PregnancySafe : '';
       if ((val != undefined) && (prop=="Meridians")) { // for returning shorter meridian string
         return (val.Meridians.split(",").length-1) == 13 ? 'All Meridians': val.Meridians;
       } else {
       return val != undefined ? val[prop] : '';
     }
   },
   showComment(){
     this.$parent.showComments();
   },
   setHerbName(name){
     this.herb.name = name;
   },
   checkQuan(){
     if(this.herb.quantity<0){
       alert('Quantity cannot be negative', 'Hmmmm...')
       this.herb.quantity = 0
     }
   },

   assignDropdown(id){
     let herb = this.herb;

     var input = document.getElementById('herb#' +id);
     // Show label but insert value into the input:
     new Awesomplete(input, this.settings);


     // when list closed change css
     document.getElementById('herb#'+id).addEventListener('awesomplete-close',function(evt){
      //console.log(evt.target.value);
      $('.table-responsive').css( "overflow", "auto" );
      //console.log(highlightedText);
      });

      // when list open change css
     document.getElementById('herb#'+id).addEventListener('awesomplete-open',function(evt){
      //console.log("list open");
      $('.table-responsive').css( "overflow", "inherit" );
      });

      // save highlighted value in var
      document.getElementById('herb#'+id).addEventListener('awesomplete-highlight',function(evt){
       highlightedVal = evt.text.value;
       highlightedText = evt.target.value;
       });

     // when selecting values
     document.getElementById('herb#'+id).addEventListener('awesomplete-selectcomplete',function(evt){
       //console.log(evt.text.value + ' ' + evt.target.value);
       herb.name = evt.text.value; // assign herb name
       //console.log(herb.id);
       document.getElementById('herb#'+id).blur(); // unfocus
       var elmnt = document.getElementById('quan#'+id); // get next element

       // goto qty field
       function nextElement() {
          if(document.querySelector(':focus') != elmnt) {
              elmnt.focus();
              //console.log(document.querySelector(':focus') != elmnt);
              // Continue the loop in 0.5s
              setTimeout(nextElement, 500);
          }
        }
        // Start the loop
        setTimeout(nextElement, 0);
     });
   }
  },
  computed: {
    nameWatch(){
      return this.herb.name;  // for watcher
    },
    prop(){
      switch(this.selectedProp) {
          case "Temp":
              return ('Temp')
              break;
          case "isToxic":
                return ('Toxic')
              break;
          case "PregnancySafe":
              return ('PS')
              break;
          case "Comments":
              return ('Comments')
              break;
          default:
              return ('Other')
      }
    },
    toxicIMG(){
      switch(this.toxic) {
          case "Yes":
              return require('../../assets/toxic-45x45.png')
              break;
          case "No":
                return require('../../assets/ok-45x45.png')
              break;
          case "Slightly":
              return require('../../assets/toxic-slightly-45x45.png')
              break;
          case "Very":
              return require('../../assets/toxic-very-45x45.png')
              break;
      }
    },
    pregIMG(){
      switch(this.pregnancy) {
          case "Y":
              return require('../../assets/pregnant-ok-45x45.png')
              break;
          case "N":
              return require('../../assets/pregnant-not-ok-45x45.png')
              break;
      }
    }
  },
  watch:{

    nameWatch() {
      if( !this.$store.getters.loadStatus) {
        this.getProperties(this.nameWatch);
      }
    }
  },
  updated(){
  },
  mounted() {
    this.assignDropdown(this.herb.key);

    // light on the tooltip
    let self = this;
    process.nextTick(() => {
      if(self.herb.id == 1 && self.$store.getters.checkIfEmpty) {
        //console.log('mounted');
        $('#td1').trigger('click')
      }
    });

    //}
  }
}
</script>

<style scoped>

input{
       background-color:transparent !important;
       /*padding: 3px 2px;*/
       color: rgb(99,99,99);
       /*margin: 5px 1px 3px 0px;*/
       border: 1px solid transparent !important;
       /*box-shadow: none !important;*/
       /*border:none !important;*/
       /*-webkit-transition: all 0.30s ease-in-out;
        -moz-transition: all 0.30s ease-in-out;
        -ms-transition: all 0.30s ease-in-out;
        -o-transition: all 0.30s ease-in-out;*/
        /*@include transition-duration(250ms);*/ /* fixes resizing issues */
        /*@include transition-timing-function(ease-in-out); */ /* fixes resizing issues */
        /*outline: none;
        input[type=number].input-number–noSpinners { -moz-appearance: textfield; }
        input[type=number].input-number–noSpinners::-webkit-inner-spin-button
        input[type=number].input-number–noSpinners::-webkit-outer-spin-button {
        -webkit-appearance: none;*/
        /*margin: 0;*/
        /*}*/
}

.text{
       color: rgb(99,99,99);
}

input:hover:not([disabledCustom]){
  box-shadow: 0 0 5px rgba(81, 203, 238, 1) !important;
  border: 1px solid rgba(66, 170, 255, 100) !important;
}

/*tr{
  border: 1px solid rgb(232,234,235);
}*/

.danger {
  border: 1px solid red;
}

/*.TempContainer {
  width: 135px ;
}*/

.temp {
    /*position: absolute;*/
    /*display: inline-block;*/
    margin: 6px 0;
    /*width: 30px;*/
    border: 1px solid #a1a1a1;
    /*padding: 10px 10px;*/
    /*background: #dddddd;*/
    width: 25px;
    height: 25px;
    border-radius: 25px;
    transform: scale(0.5, 0.5);
}
.VeryCold { background: rgb(14, 10, 200);margin-left:calc(-5%);}
.Cold { background: rgb(0, 0, 254); margin-left:calc(5%);}
.SlightlyCold { background: rgb(14, 100, 254); margin-left:calc(20%);}
.Cool { background: rgb(66, 170, 255); margin-left:calc(30%);}
.SlightlyCool { background: rgb(71, 191, 168); margin-left:calc(40%);}
.Neutral { background: rgb(118, 191, 104); margin-left:calc(50%);}
.SlightlyWarm { background: rgb(249, 224, 14); margin-left:calc(60%);}
.Warm { background: rgb(233, 90, 13); margin-left:calc(70%);}
.VeryWarm { background: rgb(231, 61, 11); margin-left:calc(80%);}
.Hot { background: rgb(230, 10, 10); margin-left:calc(85%);}

.grayedOut {color: rgb(242,242,242);}

.centered {
  float: right;
  margin: 0px 0 0 0;
}
/*.easy-autocomplete input{
  padding: 3px 2px;
}*/
.awesomplete > input {
    max-width: 166px;
}

.col {
  padding: 0px !important;
}

.commentSymbol.col {
  font-size: 12px;
  color: lightblue;
  float: right;
  max-width: 5px;
}

.hasComment {
  color: rgb(255,170,170) !important;
}

/* Overriding styles */

::-webkit-input-placeholder {
   font-size: 10px!important;
   color: lightgrey;
}

:-moz-placeholder { /* Firefox 18- */
      font-size: 10px!important;
}
::-moz-placeholder {  /* Firefox 19+ */
      font-size: 10px!important;
}
</style>
