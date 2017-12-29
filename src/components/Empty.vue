<template>
  <div class="">
    <status-beers status="empty" order="desc" v-on:data="setData"></status-beers>

    <h2>Past Beers</h2>
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
      // limit: this.$route.query.limit ? this.$route.query.limit : '',
      // order: this.$route.query.order ? this.$route.query.order : '',
      // offset: this.$route.query.offset ? this.$route.query.offset : '',
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

<style lang="css">
</style>
