<template>
  <v-app>
    <div id="app">
      <Header/>
      <router-view/>
    </div>
  </v-app>
</template>

<script>

import Header from '@/components/Header.vue'
export default {
  name: 'app',
  components: {
    Header
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
