<template>
  <div id="app">
    <Header/>
    <router-view/>
    <div class="hero-section">
      <h1 class="mf-fermented">Mentally Fermented</h1>
      <div class="hero-wrapper">
        <div class="hero-text">
          <h2>Drinking beer<br>
            shouldn't be hard
          </h2>

          <p>With Mentally Fermented, it's simple,<br>
            personal and fun for everyone.
          </p>
        </div>
        <div class="hero-image">
          <img src="http://via.placeholder.com/400x700">
        </div>
      </div>
    </div>
    <div class="about-fermented">
      <p>It all began in 7000BCE, when 3 yeast spontaneously fermented the sugars of Redfern.
        Since that very day, The Art of Brewing has been refined and passed down the Fiddler bloodline.
        Liam’s Funky Crumpet has truely revolutionised the way the world drinks beer.
      </p>
    </div>
    <on-tap></on-tap>
    <now-brewing></now-brewing>
    <past-beers></past-beers>
  </div>
</template>

<script>
import PastBeers from '@/components/Empty.vue'
import NowBrewing from '@/components/NowBrewing.vue'
import OnTap from '@/components/OnTap.vue'
import Header from '@/components/Header.vue'
export default {
  name: 'app',
  components: {
    Header,
    OnTap,
    NowBrewing,
    PastBeers
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body {
  width: 80%;
  margin-left: 10%;
  background-color: #FFF8E2;
}

.mf-fermented {
  text-align: left;
}

.hero-wrapper {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.hero-text {
  text-align: left;
}
</style>
