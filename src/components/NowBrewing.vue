<template>
  <div class="">
    <status-beers status="brewing" limit="2" order="desc" v-on:data="setData"></status-beers>

    <h2>Now Brewing</h2>
    <div class="" v-for="beer in beers" v-bind:key="beers.id">
      <h3>{{beer.name}}</h3>
      <p>{{beer.description}}</p>
    </div>
  </div>
</template>

<script>
import StatusBeers from '@/components/StatusBeers.vue'
export default {
  components: {
    StatusBeers
  },
  data() {
    return {
      beers: []
    }
  },
  methods: {
    setData(data) {
      this.beers = data
    }
  }
}
</script>
