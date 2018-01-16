<template>
  <div class="navlinks">
    <router-link to="/" >Home</router-link>
    <router-link :to="{ name: 'beers', params: {}, query: {limit: 2, order: 'desc'} }">All Beers</router-link>
    <router-link :to="{ name: 'beers', query: {status: 'active', order: 'desc'} }">On Tap</router-link>
    <router-link :to="{ name: 'beers', query: {status: 'brewing', order: 'desc', limit: 1} }">Now Brewing</router-link>
    <router-link :to="{ name: 'beers', query: {status: 'empty', order: 'desc'} }">Off Tap</router-link>
    <router-link :to="{ name: 'createBeer', query: {} }">Create Beer</router-link>
  </div>
</template>

<script>
export default {
}
</script>
<style lang="css">
  .navlinks {
    background: white;
  }

  .navlinks a {
    color: #F37F2B;
    text-decoration: none;
  }
</style>
