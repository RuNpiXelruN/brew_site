<template>
</template>
<script>
import AppService from '@/app.service.js'
export default {
  components: {},
  props: [
    'status',
    'limit',
    'order',
    'offset'
  ],
  data() {
    return {
      beers: []
    }
  },
  methods: {
    getBeers() {
      AppService.getBeersWithStatus(this.status, this.limit, this.order, this.offset)
      .then(data => {
        this.beers = data
        this.$emit('data', this.beers)
      }).catch(err => { console.log("AppService Err: ", err) })
    }
  },
  watch: {},
  created() {
    this.getBeers()
  }
}
</script>
