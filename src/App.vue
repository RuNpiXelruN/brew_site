<template>
  <v-app class="bgMain">
    <div id="app">
      <Header :authed="authed" v-on:auth="setAuth" />
      <router-view :authed="authed" v-on:auth="setAuth" />
      <Footer />
    </div>
  </v-app>
</template>

<script>
import AppService from './app.service.js'
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
      authed: false
    }
  },
  methods: {
    checkSession() {
      let token = window.localStorage.getItem("brewToken")
      if (token) {
        AppService.checkSession(token)
        .then(result => {
          if (result.error) {
            this.authed = false
          } else if (result.success) {
            window.localStorage.setItem("brewToken", result.success.brewToken)
            this.authed = true
          } else {
            console.log("No active session");
          }
        })
      }
    },
    setAuth(authStatus) {
      this.authed = authStatus
    }
  },
  created() {
    this.checkSession()
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
  height: calc(100% - 74px);
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
