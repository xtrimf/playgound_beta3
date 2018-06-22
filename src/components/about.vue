<template lang="html">
  <div>
    <transition name="fade" mode="in-out">
    <div id="aboutModal" class="modal">
          <div class="modal-content" style="font-size: 1.5rem;">
            <div class="modal-header" style="font-size: 1.5rem;">

              <span class="close-button" @click="hide">&times;</span>
              <h1>About STORIA™</h1>
            </div>
            <div class="main_content">
          <div class="abouttext">

<b>STORIA™</b> is a service provider with the aim of empowering people to reach their full potential 
<b>STORIA™</b> provides fun interactive activities based on an interactive exhibition approach 
<b>STORIA™</b> activities incorporate: images, affirmations, stories, well-being techniques and educational games and products.
 <br><br>
Eliron Salomon, founder, managing and creative director of <b>STORIA™</b>, states: 
 <i class="quote">"I believe that everyone has the right to be happy and reach their full potential, no matter what  challenges they face in life.
As a mother to Arieldavid, who was born with a life threatening syndrome, I face daily challenges on many levels.
I needed to find a way cope and at the same time keep myself motivated to reach my goal of helping my son to heal and live a full life.
Throughout the years I have accumulated tools from well-being specialists including from my mentors: Patrizio Paoletti founder of the School of Self-Awareness, and Dr Jayant K. Bhadury and Hemant K. Bhadury, the leading authorities of Bhrigu Yoga, and Lama Ole Nydahl, founder of Diamond Way Buddhism which is derived from the Karma Kagyu Lineage.
In 2008, I developed my own method, called "STORIA", that uses a visual map of where and how to reach one's goals. I have been studying and practicing Yoga and Ayurveda since 2008, and am currently working towards my PhD in museum studies at the University of Leicester, UK.
I feel a calling to use my own experience in order help others to be empowered and to cope with their challenges, through a fun wellbeing experience.
In 2015 I founded OMSI- Online Museum for Self Awareness, which is STORIA's community outreach program."</i>
 <br><br>
<h2>About OMSI</h2> 
<b>OMSI – Online Museum for Self Improvement.</b><br>
<b>OMSI</b>'s unique approach is based on the utilization of interactive online exhibitions that incorporate stories, art, wellbeing methods and the act of sharing. It provides a personalized online platform that helps and empowers individuals who are facing stressful life circumstances and trying to cope with day-to-day challenges. OMSI strives to provide its users with a playful, interactive experience through which they can claim responsibility over their lives.     As a result, the individuals will become positive co-creators and co-curators of their own future and not victims of their lives' circumstances" (Salomon 2017).
<b>OMSI</b> represents a new concept for an interactive online museum that is comprised of: <br>
1. Wellbeing techniques <br>
2. Works of art chosen from digitalized museum collections and other art sources <br>
3. Activities in interactive exhibitions 
 <br><br>
<b>"Heroes of Today"</b> – An interactive exhibition in its pilot stage 
<b>"Heroes of Today"</b> Exhibition provides an interactive experience from wellbeing specialists that incorporates the use of Art.
"The aim is to create a personalized exhibition that reflects certain life goals and how to achieve them. An array of playful, engaging techniques will be adopted in order to guide the users through the session, including videos, sounds, words/sentences and images. The application provides a sufficient amount of time for the participants to make their own considered choices that truly reflect their thought processes: where to navigate within the application, what activity and which images to use for their own STORIA exhibition, etc." (Salomon 2018)
 <br><br>
This pilot project was developed over a twelve month period and is based on extensive operational experience in children's exhibition design conducted by Eliron Salomon in consultation with Liliana Reyes, children's exhibition designer from NYC. 
 <br><br>
The content of the pilot was based on the STORIA method (mentioned above) along side wellbeing specialists: Dr Jayant K. Bhadury and Hemant K. Bhadury of Bhrigu Yoga. 
  <br><br>
The art work for the exhibition was selected from the Wellcome digital collection: https://wellcomecollection.org/works. 
The art work used for the exhibition is also from Google Search Engine, Genigar School and Personal Albums. 
 
 <br><br> 

          </div>
          <div class="plyr__video-embed" id="player">
              <iframe src="https://www.youtube.com/embed/1SWocKhT73A?origin=https://plyr.io&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1" allowfullscreen allowtransparency></iframe>
          </div>
          <div>
            <h3>STORIA's & OMSI'S Collaborators </h3>
            <embed calss="pdf" src="static/Contributors.pdf" width="760" height="6430px" type='application/pdf'>
          </div>
        </div>
        </div>

    </div>
  </transition>
  </div>

</template>


<script>

export default {
  name: 'DemoModal',
  // mixins:[labelsMixin],

  data () {
    return {
      plyr: null
    }
  },
  methods:{
    hide(){
      this.plyr.stop();
      var modal = document.querySelector("#aboutModal");
      modal.classList.toggle("show-modal");
    }
  },
  mounted(){
    const player = new Plyr('#player', {
        blankUrl: 'https://cdn.plyr.io/static/blank.mp4',
        disableContextMenu: true
    });
    this.plyr  = player;

  }
}
</script>

<style>
.plyr__control {
    border: 0 !important;
    color: inherit !important;
}

.modal-content {
  max-height: 850px;
  /* overflow: scroll; */
}
.main_content{
  max-height: 720px;
  overflow: scroll;
}


.abouttext {
  font-size: 1rem;
  text-align: left;
}

.quote {
  font-weight: 550;
}

.pdf {
  overflow: hidden;
}
</style>
<style scoped lang="css">


</style>
