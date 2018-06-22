<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header
          class="modal-header"
          id="modalTitle"
        >
          <slot name="header">
            {{title}}

            <button
              type="button"
              class="btn-close"
              @click="close"
              aria-label="Close modal"
            >
              x
            </button>
          </slot>
        </header>

        <section
          class="modal-body"
          id="modalDescription"
        >
          <!-- <transition name="bounceInDown"> -->
            <slot name="body">
              <div class="layer1">{{url}}</div>
              <transition name="fadeOutTop">
                <div v-if="copied" class="layer2 cssanimation fadeOutTop">{{url}}</div>
              </transition>
            </slot>
          <!-- </transition> -->
          <button type="button" class="btn-green"
            v-clipboard:copy="url"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError">Copy!</button>
        </section>

        <footer class="modal-footer">
          <slot name="footer">
            <div class="a2a_kit a2a_kit_size_32 a2a_default_style" style="width: 100%">
            <!-- Your share button code -->
            <div
                 data-href="http://www.tcmherbalist.com"
                 data-layout="button"
                 data-size="large"
                 data-mobile-iframe="false">
                <a class="fb-xfbml-parse-ignore"
                   target="_blank"
                   :href="['https://www.facebook.com/sharer/sharer.php?u='+url+'&amp;src=sdkpreparse']"
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
            <a class="a2a_button_whatsapp"></a>
            <a class="a2a_button_wechat"></a>
            </div>
          </slot>
        </footer>

      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'modal',
    props: ['title'],
    data() {
      return{
        isMobile: true,
        copied: false      }
    },
    methods: {

      close() {
        this.$emit('close');
      },
      onCopy: function (e) {
        //alert('You just copied: ' + e.text)
        this.copied = !this.copied;
        var that = this;
        setTimeout(function(){ that.copied = !that.copied }, 500);

      },
      onError: function (e) {
        // alert('You just copied: ' + e.text)
      }
    },
    computed:{
      url(){
        return this.$store.getters.url
      }
    }

  };
</script>

<style scoped>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9998;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    width: 33%;
    min-width: 500px;

    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: center;
    align-items: center;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
    display: flex;
    justify-content: flex-start;
  }

  .btn-close {
    border: none;
    font-size: 20px;
    position: relative;
    top: -15px;
    right: -15px;
    /* padding: 20px; */
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .btn-green {
    color: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
    margin-left: 10px;
    background: transparent;
  }

  .btn-green:hover {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    /* border-radius: 2px; */
  }

  /* animation duration and fill mode */
  .cssanimation {
    animation-duration: 1s;
    animation-fill-mode: both;
    display: flex;
  }

  /* fadeOutTop animation declaration & iteration counting */
  .fadeOutTop { animation-name: fadeOutTop }

  /* fadeOutTop animation keyframes */
  @keyframes fadeOutTop {
      from { opacity: 1 }
      to {
          opacity: 0;
          transform: translateY(-100%);
      }
  }
  .layer1 {
      position: relative;
      z-index: 1;
      left: 0;
      top: 0;
  }
  .layer2 {
      position: absolute;
      z-index: 2;
      left: 10px;
      top: 10px;
  }

</style>

<style>
 .modal-fade-enter,
  .modal-fade-leave-active {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease
  }
</style>
