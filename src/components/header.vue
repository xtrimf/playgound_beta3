
<template lang="html">
  <div class="header">
    <div class="logo"><img :src="'/static/LogoBig.png'" alt="logo"></div>
    <div class="new" @click="newList" :disabled="!enableNew"><label :class="{disabled: !enableNew, isActive: enableNew}">NEW</label></div>
    <div class="save" @click="save(false)" :disabled="!canSave"><label :class="{disabled: !canSave, isActive: canSave}">SAVE</label></div>
    <div class="share"
         @click="save(true)"
         :disabled="!enableNew"
         ><label :class="{disabled: !enableNew, isActive: enableNew}">SHARE</label>
    </div>
    <modal
      v-show="showShareModal"
      @close="showShareModal = false"
      :title = "saveORshare == 0 ? 'Formula saved!' : 'Sharing Options'"
    />
  </div>
</template>

<script>
import Vue from 'vue';
import modal from './modal';
import {mapActions} from 'vuex';
import _ from 'underscore';

export default {
  data() {
    return{
      message: 'Copy These Text',
      showShareModal: false,
      saveORshare: 0
    }
  },
  components:{
    modal
  },
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
    //'$route': 'loadData'
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
    save(share) {
        this.saveORshare = 0;
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
          Vue.http.get('webdata/'+thiss.$store.getters.link+'/maxrevision.json') // get the latest version from firebase db
            .then(response => response.json())
            .then(res => {
              console.log('res = '+res);
              const maxRev = res+1;
              const data = {
                maxrevision: maxRev,
                ['rev'+maxRev]: {
                    revision: maxRev,
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
                thiss.$router.replace('/'+thiss.$store.getters.link+'/'+maxRev);
                thiss.share(share)
              }
            });
          }
        )
      }
    } else
      { this.share(share)}

    },
    share(share){
      this.saveORshare = share == true ? 1 : 0;
      this.showShareModal = true
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
.header {
  grid-template-columns: repeat(16,1fr);
  grid-column-gap: 5px;
  display: grid !important;
}

.header > div {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 500;
  /* border: solid 1px; */
}

.logo{
  grid-column: 1;
}

.new{
  grid-column: 12

}
.save{
  grid-column: 14

}
.share{
  grid-column: 16
}
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
.isActive {
  cursor: pointer;
}
.disabled {
    color: rgba(155,155,155,0.4) !important;
}

/* .nav-link {
  padding-right: 20px !important;
} */
/* .modal { display: block; } */
</style>
