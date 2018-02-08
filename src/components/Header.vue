<template>
  <div class="navWrapper">
    <div class="navContainer">
      <router-link to="/" >Home</router-link>
      <router-link :to="{ name: 'beers', params: {}, query: {limit: 2, order: 'desc'} }">All Beers</router-link>
      <router-link :to="{ name: 'beers', query: {status: 'active', order: 'desc'} }">On Tap</router-link>
      <router-link :to="{ name: 'beers', query: {status: 'brewing', order: 'desc', limit: 1} }">Now Brewing</router-link>
      <router-link :to="{ name: 'beers', query: {status: 'empty', order: 'desc'} }">Off Tap</router-link>
      <router-link :to="{ name: 'createBeer', query: {} }">Create Beer</router-link>
      <router-link :to="{ name: 'imageupload', query: {} }">Upload Image</router-link>
      <router-link :to="{ name: 'authTest', query: {} }">AuthTest</router-link>
    </div>
  </div>
</template>

<script>
export default {
}
</script>
<style lang="scss">
  .navWrapper {
    @include flexRowC;
    height: 71px;
    background: white;
    border-bottom: 2px solid;

    .navContainer {
      @include flexRowSp;
      width: 60%;

      a {
        color: $textColor;
        text-decoration: none;
        font-family: 'PoppinsSemiBold', sans-serif;
        font-size: 14px;
        text-transform: uppercase;
      }
    }
  }
</style>
