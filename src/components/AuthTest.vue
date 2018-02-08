<template>
  <div class="">
    <button type="button" name="button" v-on:click="testAuth">Login with Facebook</button>
  </div>
</template>

<script>
import AppService from '@/app.service.js'
export default {
  data() {
    return {}
  },
  methods: {
    testAuth() {
      AppService.testAuth()
    }
  },
  created() {}
}
</script>

<style lang="scss">
</style>
