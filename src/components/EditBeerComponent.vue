<template>
  <v-dialog v-model="dialog" max-width="500px">
   <v-card v-if="beer">
    <v-card-title>Editing {{beer.name}}</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            label="name"
            :value="beer.name"
          ></v-text-field>
          <v-text-field
            label="Description"
            :value="beer.description"
            multi-line
          ></v-text-field>
          <v-text-field
            label="Alcohol Content"
            type="number"
            :value="beer.alcohol_content"
          ></v-text-field>

          <v-select
            :items="brewers"
            v-model="setBrewers"
            label="Language:"
            multiple
            auto prepend-icon="map"
            item-value="text"
            hide-details
            id="langSelect"
          ></v-select>

          <v-select
            :items="statuses"
            v-model="setStatus"
            label="Language:"
            auto prepend-icon="map"
            item-value="text"
            hide-details
            id="langSelect"
          ></v-select>

          <v-checkbox class="checkbox" label="Featured?" v-model="featured" light></v-checkbox>

          <picture-input
            v-if="beer"
            ref="editPic"
            class="editPicUloader"
            @change="replaceFile"
            margin="16"
            height="400"
            width="800"
            accept="image/*"
            size="10"
            buttonClass="btn"
            :customStrings="{
              upload: '<h1>Bummer!</h1>',
              drag: `<p>Drag an image or<br>click to select a file</p>`
            }">
          </picture-input>

        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" flat @click.stop="dialog=false">Close</v-btn>
     </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import PictureInput from 'vue-picture-input'
import AppService from '@/api/app.service.js'
export default {
  props: ['beer'],
  components: {
    PictureInput
  },
  data() {
    return {
      dialog: false,
      statuses: [],
      fetchedStatus: "",
      setStatus: "",
      brewers: [],
      fetchedBrewers: [],
      setBrewers: [],
      featured: null,
      file: null,
    }
  },
  created() {},
  methods: {
    replaceFile() {
      console.log("File changed!!");
    },
    getBrewers() {
      AppService.getBrewerNames()
      .then(result => {
        let bs = result.success.data
        this.brewers = bs.map(brewer => {
          return {
            value: brewer.id,
            text: `${brewer.first_name} ${brewer.last_name}`
          }
        })
      })
    },
    getStatuses() {
      let allStatuses = ["upcoming", "brewing", "active-full", "active-empty", "past", "active"]
      let mappedStatuses = []
      for (var i = 0; i < allStatuses.length; i++) {
        mappedStatuses.push({
          text: allStatuses[i]
        })
      }
      this.statuses = mappedStatuses
      this.fetchedStatus = this.beer.status.name
      this.setStatus = this.fetchedStatus
    }
  },
  watch: {
    beer: function() {
      if (Object.keys(this.beer).length > 0) {
        // get all brewer names from db and set as 'brewers' property
        this.getBrewers()

        // get all statuses and set as 'statuses' property
        this.getStatuses()
        this.featured = this.beer.featured
        this.dialog = true
      } else {
        this.dialog = false
      }
    },

    brewers: function() {
      // once 'brewers' property has been set, store
      // current beer brewers as 'fetchedBrewers' property,
      // and then set the 'setBrewers' property as the current one(s)
      if (this.beer.brewers.length > 0) {
        let currentBrewers = []
        for (var i = 0; i < this.beer.brewers.length; i++) {
          currentBrewers.push({
            value: this.beer.brewers[i].id,
            text: `${this.beer.brewers[i].first_name} ${this.beer.brewers[i].last_name}`
          })
        }
        this.fetchedBrewers = currentBrewers
        this.setBrewers = this.fetchedBrewers
      }
    },

    dialog: function() {
      if (!this.dialog) {
        this.$emit("clearupdate", {})
        this.currentName = null
        this.setStatus = ""
        this.setBrewers = []
        this.featured = null
      }
    }
  }
}
</script>

<style lang="scss">
  .checkbox {
    margin-top: 20px;
  }
</style>
