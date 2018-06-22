<template lang="html">
  <div class="">
    <b-container fluid>
    <b-navbar fluid fixed toggleable toggle-breakpoint="sm" type="light" variant="light">
      <b-nav-toggle target="nav_text_collapse" position="right"></b-nav-toggle>
      <b-navbar-brand><img src="../assets/icon.png" alt="logo" width="38px"></b-navbar-brand>
      <b-navbar-brand>HerbaList Playground<sup>beta</sup></b-navbar-brand>
      <b-collapse is-nav id="nav_text_collapse">
            <b-nav b-navbar-nav>
                <b-nav-item @click="newList" :disabled="!enableNew">New</b-nav-item>
                <!-- <b-nav-item @click="saveData" :disabled="!canSave" style="padding-right: 0px">Save <b-badge v-show="this.$store.getters.revision>1" variant="secondary">{{this.$store.getters.revision}}</b-badge></b-nav-item> -->
                <b-nav-item @click="saveData" :disabled="!canSave" style="padding-right: 0px">Save</b-nav-item>
                <b-nav-item @click="saveData" :disabled="!enableNew" v-b-modal.shareModal>Share</b-nav-item>


            </b-nav>
        </b-collapse>
  </b-navbar>
  <div>
    <!-- <b-btn v-b-modal.shareModal>Launch demo modal</b-btn> -->

    <!-- Modal Component -->
    <b-modal id="shareModal" ok-only title="Sharing options">
      <div class="container">
    <input type="text" v-model="message">
    <button type="button"
      v-clipboard:copy="message"
      v-clipboard:success="onCopy"
      v-clipboard:error="onError">Copy!</button>
  </div>
      <p>{{this.$store.getters.url}}

      </p>
      <p class="my-4"></p>
      <!-- @focus="$event.target.select()" -->
      <!-- AddToAny BEGIN -->
      <div class="a2a_kit a2a_kit_size_32 a2a_default_style">
      <!-- Your share button code -->
      <div
           data-href="http://www.tcmherbalist.com"
           data-layout="button"
           data-size="large"
           data-mobile-iframe="false">
          <a class="fb-xfbml-parse-ignore"
             target="_blank"
             :href="['https://www.facebook.com/sharer/sharer.php?u='+this.$store.getters.url+'&amp;src=sdkpreparse']"
             rel="nofollow noopener">
             <span class="a2a_svg a2a_s__default a2a_s_facebook" style="background-color: rgb(59, 89, 152);">
               <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                 <path fill="#FFF" d="M17.78 27.5V17.008h3.522l.527-4.09h-4.05v-2.61c0-1.182.33-1.99 2.023-1.99h2.166V4.66c-.375-.05-1.66-.16-3.155-.16-3.123 0-5.26 1.905-5.26 5.405v3.016h-3.53v4.09h3.53V27.5h4.223z"></path>
               </svg>
             </span>
             <span class="a2a_label">Facebook</span>
           </a>
      </div>
      <!-- <a class="a2a_dd" href="https://www.addtoany.com/share"></a> -->
      <!-- <a class="a2a_button_email"></a> -->
      <a class="a2a_button_google_gmail"></a>
      <a v-if="isMobile" class="a2a_button_whatsapp"></a>
      <a v-if="isMobile" class="a2a_button_wechat"></a>
      </div>
<!-- AddToAny END -->
    </b-modal>
  </div>
  </b-container>


</div>
</template>

<script>
//import VueGoodshare from 'vue-goodshare';
import {mapActions} from 'vuex';
import _ from 'underscore';

export default {
  data() {
    return{
      isMobile: false,
      message: 'Copy These Text'
    }
  },
  // components:{
  //   VueGoodshare
  // },
  computed:{
    canSave() {
      return this.$store.getters.enableSave
    },
    enableNew() {
      return !this.$store.getters.checkIfEmpty
    }
  },
  watch: {
    // call again the method if the route changes
    '$route': 'loadData'
  },
  methods: {
    ...mapActions({
      fetchData : 'LoadData'
    }),
    onCopy: function (e) {
      alert('You just copied: ' + e.text)
    },
    onError: function (e) {
      alert('Failed to copy texts')
    },
    endDay() {
      this.randomizeStocks();
    },
    newList() {
      if(this.enableNew) {
        this.$store.dispatch('initHerbs');
        this.$store.dispatch('assignLink','');
        this.$router.replace('/');
      }
    },
    saveData() {
        if(this.canSave) {
        if(this.$store.getters.link==='') {  // generate new link if not exists
          var stringLength = 9;
          var stringArray = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
          var rndString = "";

          // build a string with random characters - for uniqueID & link
          for (var i = 1; i <= stringLength; i++) {
            var rndNum = Math.ceil(Math.random() * stringArray.length) - 1;
            rndString = rndString + stringArray[rndNum];
          }
          this.$store.dispatch('assignLink', rndString).then(saveData(this));  // assign to "link"
        } else {  // if links exists we just need to ++revision
            this.$store.dispatch('addRevision').then(saveData(this));
        }

        function saveData(thiss){
          // prepare the data payload
          const data = {
            maxrevision: thiss.$store.getters.revision,
            ['rev'+thiss.$store.getters.revision]: {
                revision: thiss.$store.getters.revision,
                timestamp: new Date().toLocaleString(),
                herbs: thiss.$store.getters.herbs
              }
            };
          // save the data
          thiss.$http.patch('webdata/'+thiss.$store.getters.link+'.json', data) //patch is create or update
          .then(res =>{
            if(res.ok) {
              thiss.$store.dispatch('saveToPrv');
              // console.log(this.$store.getters.link+'/'+this.$store.getters.revision);
              thiss.$router.replace('/'+thiss.$store.getters.link+'/'+thiss.$store.getters.revision);
            }
          });
        }
      }
    },

    loadData(){
        if(this.$route.params.rev!=undefined) {
          this.fetchData(this.$route.params);
        } else {
          this.newList();
        }
      },

  setIsMobile(){
    let testExp = new RegExp('Android|webOS|iPhone|iPad|' +
      		       'BlackBerry|Windows Phone|'  +
      		       'Opera Mini|IEMobile|Mobile' ,
      		      'i');
    this.isMobile = testExp.test(navigator.userAgent)
    }
  },
  created() {
    this.setIsMobile();
    if(this.$route.params.rev) {this.loadData()};
  },
  beforeRouteUpdate (to, from, next) {
    //console.log('beforeRouteUpdate');
    next();
  }
}
</script>

<style lang="css">
.badge{
  opacity: 0.60;
   position:relative;
   top: -2px;
   /*left: -10px;*/
}
.disabled {
  /* And disable the pointer events */
  /* pointer-events: none; */
}

.nav-link.disabled {
    color: rgba(155,155,155,0.4) !important;
}

.nav-link {
  padding-right: 20px !important;
}
.modal { display: block; }
</style>
