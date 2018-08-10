<template>
</template>
<script>
import AppService from '@/api/app.service.js'
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
      AppService.getBeers(this.status, this.limit, this.order, this.offset)
      .then(result => {
          console.log("Res", result)
        // if (result.error) {
        //   console.log("There was an error fetching beers", result.error);
        //   return
        // }

        // if (result.success) {
        //   this.beers = result.success.data
          this.beers = result
          this.$emit('data', this.beers)
          return
        // }
      })
    }
  },
  watch: {},
  created() {
    this.getBeers()
  }
}
</script>
