<template>
  <div class="">
    <status-beers status="active" limit="3" order="desc" v-on:data="setData"></status-beers>

    <h2>On-Tap</h2>
    <p>We maintain 1-3 beers on tap, which are constantly changing to satisfy the never-ending thirst of our cicerones.</p>
    <div class="active-beers-section" v-for="beer in beers" v-bind:key="beers.id">
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
