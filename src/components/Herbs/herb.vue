<template lang="html">

  <!-- <div class="form-inline row"> -->
    <tr>
      <td style="min-width: 20px !important; max-width: 20px !important;" :id="'td' + herb.key" scope="row">
        <div class="centered" :class="{grayedOut: herb.name==''}"
        >{{herb.id}}</div>
        <!-- <b-tooltip target="td1" title="Enter herb name or abreviation (like 'LDC' or 'Long Dao Cao')" placement="left" triggers="click"></b-tooltip> -->
      </td>
      <td style="width: 153px; min-width: 153px !important; max-width: 153px !important;">
        <input  :id="'herb#' + herb.key"
                v-model.lazy="herb.name"
                placeholder=""
                @blur="addRow"
                @focus="$event.target.select();onEnter()"
                v-tooltip.left="{
                  content: 'Enter herb name <br> or abreviation <br>(like \'LDC\' or \'Long Dan Cao\')',
                  delay: {show: 500,hide: 100},
                  show: showTip == true && $store.getters.lastHerbPosition == undefined && !herb.name && herb.id == 1,
                  trigger: 'manual'
                }"
                >
      </td>
      <td style='min-width:200px; padding: 0; color:rgb(139,139,139) ; white-space:nowrap; font-size:16px;'>
        <div style="display: grid; grid-template-columns: repeat(60,1fr); font-size:14px">

            <div style="grid-column: 1/60" v-show="temp != ''">
              <div v-show="prop == 'Other'" style="padding-left: 5px">
                      {{herbProps(selectedProp)}}
              </div>
              <div style="grid-column: 1/-1;" v-show="prop == 'Comments'">
                <input type="text" style='font-size:14px; color:rgb(139,139,139); text-align:left; padding-left: 5px;'
                       v-model="herb.comment"
                       >
                  </input>
              </div>
            </div>

          <div style="grid-column: 60; text-align:center" v-show="prop != 'Comments' && herb.name != ''">
            <label class="commentSymbol" :class="{hasComment: herb.comment}"
                v-tooltip.bottom=
                                  "{
                                    content: (herb.comment ? 'Show' : 'Add') + ' comment',
                                    delay: {show: 200,hide: 100}
                                  }"
                @click="showComment"
                >+</label>
          </div>
        </div>
      </td>
      <td>
        <div  style="display: flex; align-items: center; justify-content: center; height: 100%; width: 100%;">
          <img v-show="herb.name"
              :src="'/static/plus.png'"
              alt="plus"
              style="width:30px; height:30px; padding: 0 2px"
              @mousedown="changeQuanTrigger('+')"
              @mouseup="stopQuan"
              @mousemove="stopQuan"
              >
          <input v-show="herb.name" type="text"
                :id="'quan#' + herb.key"
                style="-moz-appearance: textfield; width:30px; height:30px; text-align:center; line-height: 30px"
                v-model.number="herb.quantity"
                @focus="$event.target.select();onEnter()"
                @change="checkQuan"
                :disabled="herb.name == ''"
          >
          <img v-show="herb.name"
              :src="'/static/minus.png'"
              alt="plus"
              style="width:30px; height:30px; padding: 0 2px"
              @mousedown="changeQuanTrigger('-')"
              @mouseup="stopQuan"
              @mousemove="stopQuan"
>
        </div>
        <!-- <div style="border: 1px solid ;display: inline-flex; align-items: center; justify-content: center;width: 100%; height:30px"> -->
          <!-- <img src="static/plus.png" alt="plus" style="width:30px; height:30px;"> -->
        <!-- </div> -->
        <!-- <b-form-input
               :id="'quan#' + herb.key"
               v-show="herb.name"
               size="sm"
               type="number"
               style="-moz-appearance: textfield"
               v-model.number="herb.quantity"
               @focus.native="$event.target.select()"
               @change="checkQuan"
               :disabled="herb.name == ''">
          </b-form-input> -->
      </td>
      <!-- <td class="align-middle">
        <multiselect v-show="!herb.name==''" v-model="herb.unit" :show-labels="false" :show-no-results="false" :options="unitOptions" :searchable="false" :allow-empty="false"></multiselect>
      </td> -->
      <td >
      <transition name="fade" mode="out-in">
      <div v-show="temp != ''" class="temp"
            :class="[herbProps('Temp').replace(/ /g, '')]"
            v-tooltip.bottom="{
              content: temp,
              delay: {show: 200,hide: 100}
            }"
            >
      </div>
    </transition>
    </td>
    <!-- <td>
      <div class="img-container centeredImg img" v-b-tooltip.hover.auto :title="toxic == 'No' ? 'Not Toxic':toxic">
        <img v-show="toxicIMG" :src="toxicIMG" :alt="toxic" :title="toxic" width="25px" height="25px">
      </div>
    </td> -->
    <td class="dynamicTD">
      <transition name="fade" mode="out-in">
      <div v-show="toxicIMG" style="display: flex; min-width:50px; max-width: 140px;justify-content: space-around; align-items:center ; padding:0 10px;">
          <img v-show="toxicIMG" :src="toxicIMG" :alt="toxic" width="25px" height="25px"
          v-tooltip.bottom="{
            content: toxicText,
            delay: {show: 200,hide: 100}
          }"
          >
          <div style="width: 90px; padding-left: 10px" height="25px" class="screenSize">{{toxicText}}</div>
      </div>
    </transition>
    </td>
    <td class="dynamicTD">
      <transition name="fade" mode="out-in">
        <div v-show="pregIMG" style="display: flex; min-width:50px; max-width: 140px;justify-content: space-around; align-items:center ; padding:0 10px;">
          <img v-show="pregIMG" :src="pregIMG" :alt="pregnancy" width="25px" height="25px"
            v-tooltip.bottom="{
              content: (pregnancy == 'Y' ? 'Safe' : 'Not Safe') +' in Pregnancy',
              delay: {show: 200,hide: 100}
            }"
          >
          <div style="width: 65px; padding-left: 10px" height="25px" class="screenSize">{{pregnancy == 'Y' ? ' Safe' : ' Not Safe'}}</div>
        </div>
      </transition>
    </td>
      <td>
        <div v-show="!herb.name=='' || herb.id <= $store.getters.lastHerbPosition || (herb.id < $store.getters.maxHerbs && $store.getters.maxHerbs > 9)"
            style="display: flex; width:100%; justify-content: center">
          <div
             class="remove"
             @click="deleteRow"
             style="cursor: pointer;"
           >
         </div>
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
var quanAction = null;

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
      unitOptions:['Raw','Powder','%','cc'],
      showTip: true
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
      //this.$root.$emit('bv::hide::tooltip');
      this.showTip = false;
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
       return val != undefined ? val[prop]/*.replace(/(.{20})/g, "$1/n/r")*/ : '';
     }
   },
   showComment(){
     this.$emit('event1', '')
   },
   setHerbName(name){
     this.herb.name = name;
   },
   stopQuan(){
     //console.log('mouseup');
     clearInterval(quanAction);
   },
   changeQuanTrigger(type){
     this.changeQuan(type)
     var that = this
     quanAction = setInterval(function(){
       that.changeQuan(type)
     }, 350);
   },
   changeQuan(type){
     if(type=='+') {
       this.herb.quantity++
     } else {
       this.herb.quantity --
     }
     this.checkQuan();
   },
   checkQuan(){
     if(this.herb.quantity<0){
       clearInterval(quanAction);
       quanAction = null;
       //if(quanAction) console.log('quanAction');
       if(this.herb.quantity < 0) alert('Quantity cannot be negative', 'Hmmmm...');
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
              return require('../../../static/icons/Toxic.png')
              break;
          case "No":
                return require('../../../static/icons/NotToxic.png')
              break;
          case "Slightly":
              return require('../../../static/icons/SlightlyToxic.png')
              break;
          case "Very":
              return require('../../../static/icons/VeryToxic.png')
              break;
      }
    },
    toxicText() {
      return this.toxic == 'No' ? 'Not Toxic': this.toxic.replace("Yes", "Toxic")
    },
    pregIMG(){
      switch(this.pregnancy) {
          case "Y":
              return require('../../../static/icons/Safe.png')
              break;
          case "N":
              return require('../../../static/icons/NotSafe.png')
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
       font-family: inherit;
       font-size: inherit;
       color: inherit;
       text-align: center;
       border: none;
       /* border-style: collapse; */
       line-height: 41px;
       width: 100%;

}

.text{
       color: rgb(99,99,99);
}

input:hover:not([disabledCustom]){
  /* box-shadow: 0 0 5px rgba(81, 203, 238, 1) !important; */
  /* border: 1px solid rgba(66, 170, 255, 100) !important; */
}



.danger {
  border: 1px solid red;
}



.temp {
    height: 10px;
    width: 188px;
}

.VeryCold {background: url("~/static/temperature/Very Cold.png") center no-repeat}
.Cold {background: url("~/static/temperature/Cold.png") center no-repeat}
.SlightlyCold {background: url("~/static/temperature/Slightly Cold.png") center no-repeat}
.Cool {background: url("~/static/temperature/Cool.png") center no-repeat}
.SlightlyCool {background: url("~/static/temperature/Slightly Cool.png") center no-repeat}
.Neutral {background: url("~/static/temperature/Neutral.png") center no-repeat}
.SlightlyWarm {background: url("~/static/temperature/Slightly Warm.png") center no-repeat}
.Warm {background: url("~/static/temperature/Warm.png") center no-repeat}
.VeryWarm {background: url("~/static/temperature/Very Warm.png") center no-repeat}
.Hot {background: url("~/static/temperature/Hot.png") center no-repeat}

.Safe {background: url("~/static/icons/Safe.png") center no-repeat; background-size: contain;}
.NotSafe {background: url("~/static/icons/NotSafe.png") center no-repeat; background-size: contain;height: 24px;}

.remove {
    background: url("~/static/icons/remove.png") center no-repeat;
    background-size: contain;
    height: 24px;
    width: 24px;
}

.grayedOut {color: rgb(242,242,242);}

.centeredImg {
  float: right;
  margin: 0px 0 0 0;
}
.centered {
  text-align: center;
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

@media screen and (max-width : 1440px)
{
  .screenSize {
    display: none
  }
  .dynamicTD{
    width: 50px;
  }
}
@media screen and (min-width : 1440px)
{
  .screenSize {
    /* display: none */
  }
  .dynamicTD{
    width: 140px;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
