<template>
  <div class="">
    <h1>Beersssssss here :)</h1>
    <div class="beers-wrapper" v-for="beer in beers" v-bind:key="beers.id">
      <h2>{{beer.name}}</h2>
      <p>{{beer.description}}</p>
      <p>{{beer.alcohol_content}}</p>
      <!-- <app-post :link="post.link">
        <h3 slot="title">{{ post.title }}</h3>
        <p slot="description">{{ post.description }}</p>
      </app-post> -->
    </div>
  </div>
</template>

<script>
import AppService from '@/app.service.js'
export default {
  data() {
    return {
      status: this.$route.query.status,
      limit: this.$route.query.limit ? this.$route.query.limit : '',
      order: this.$route.query.order ? this.$route.query.order : '',
      offset: this.$route.query.offset ? this.$route.query.offset : '',
      beers: []
    }
  },
  methods: {
    getBeers() {
      if (this.status) {
        AppService.getBeersWithStatus(this.status, this.limit, this.order, this.offset)
        .then(data => {
          this.beers = data
        })
      } else {
        AppService.getBeers(this.limit, this.order, this.offset)
        .then(data => {
          this.beers = data
        })
      }
    }
  },
  watch: {
    '$route'(to, from) {
      this.status = to.query.status
      this.getBeers()
    }
  },
  created() {
    this.getBeers()
  }
}
</script>
