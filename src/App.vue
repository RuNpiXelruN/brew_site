<template>
  <v-app class="bgMain">
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
<style lang="scss">

#app {
  color: $textColor;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

body {
  background-color: $bgColor;
  margin: 0;
  padding: 0;
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
