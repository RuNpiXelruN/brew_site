<template>
  <v-app class="bgMain">
    <div id="app">      
      <Header/>
      <router-view/>
      <Footer/>
    </div>

    <v-snackbar
        v-model="popup.state"
        :top="y === 'top'"
        :right="x === 'right'"
        :bottom="y === 'bottom'"
        :left="x === 'left'"
        :timeout="popup.timeout">
        {{ popup.text  }}
        
        <v-btn
            color="blue lighten-3"
            flat
            @click="popup.state = false">
            Close
      </v-btn>           
    </v-snackbar>
  </v-app>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'app',
  components: {
    Header,
    Footer
  },
  data() {
    return {
        snackbar: false,
        x: "right",
        y: "top",
    }
  },
  computed: {
      popup() {
          return this.$store.getters.popup
      }
  },
  created() {
      this.$store.dispatch('initBeers')
      this.$store.dispatch('initBasicBeers')
      this.$store.dispatch('initBrewers')
      this.$store.dispatch('initBasicBrewers')
      this.$store.dispatch('initBrewerRanks')
      
    this.$store.dispatch('tryAutoLogin')
  },
  watch: {}
}
</script>
<style lang="scss">

#app {
  color: $textColor;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
}

body {
  background-color: $bgColor;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
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
