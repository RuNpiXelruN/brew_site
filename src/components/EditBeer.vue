<template>
  <div class="edit-beer-wrapper">
    <v-layout justify-center>
      <v-flex xs12 sm10 md8 lg6 xl4>
        <v-card>
          <v-card-text>
            <v-form id="editBeerForm">
              <v-text-field
                ref="name"
                label="name"
                v-model="name"
              ></v-text-field>
              <v-text-field
                ref="description"
                label="Description"
                v-model="description"
                multi-line
              ></v-text-field>
              <v-text-field
                ref="alcohol_content"
                label="Alcohol Content"
                type="number"
                v-model="alcContent"
              ></v-text-field>
              <v-select
                :items="statuses"
                v-model="selectedStatus"
                label="Current Status:"
                append-icon="arrow_drop_down"
                item-value="text"
                hide-details
                id="statusSelect">
              </v-select>
              <v-select
                :items="brewers"
                v-model="selectedBrewers"
                label="Selected Brewers:"
                multiple
                append-icon="arrow_drop_down"
                hide-details
                id="brewSelect"
              ></v-select>
              <div class="">{{selectedBrewers}}</div>

              <v-checkbox class="featured-checkbox" label="Featured?" v-model="featured" light></v-checkbox>

              <div class="picWrapper">
                <picture-input
                  ref="editPicInput"
                  class="picUploader"
                  v-on:change="showPicChange"
                  height="400"
                  width="800"
                  size="10"
                  buttonClass="btn"
                  :customStrings="{
                    upload: `<h1>Bummer!</h1>`,
                    drag: `<p>Drag or click to<br>select a new image</p>`
                  }">
                </picture-input>

                <div class="picPreviewDiv">
                  <p>Current Image is:<br><strong>{{imageName}}</strong></p>
                  <p v-if="file">You are about to change it to:<br><strong>{{file.name}}</strong></p>
                </div>
              </div>

              <v-btn @click.prevent="handleSubmit" style="background-color: #F4812D; color: white;">Update</v-btn>

              <v-btn v-on:click="clear" style="color: #F4812D;">clear</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import PictureInput from 'vue-picture-input'
import AppService from '@/app.service.js'
export default {
  components: {
    PictureInput
  },
  data() {
    return {
      beer: {},
      brewers: [],
      selectedBrewers: [],
      statuses: [],
      selectedStatus: "",
      name: null,
      alcContent: null,
      description: null,
      file: null,
      picstyles: {
        background: null
      },
      imageName: null,
      featured: null,
    }
  },
  methods: {
    handleSubmit() {
      let editBeerData = new FormData()
      if (this.file) {
        editBeerData.append("image", this.file, this.file.name)
      }

      editBeerData.append("id", this.beer.id)
      editBeerData.append("name", this.name)
      editBeerData.append("description", this.description)
      editBeerData.append('alcohol_content', this.alcContent)
      editBeerData.append('featured', this.featured)
      editBeerData.append('brewer_ids', this.selectedBrewers)
      editBeerData.append('status', this.selectedStatus)

      AppService.updateBeer(editBeerData, this.beer.id)
      .then(result => {
        if (result.error) {
          console.log("Error updating beer -> ", result.error)
          return
        }
        if (result.success) {
          console.log("Updated successfully -> ", result.success.data)
          this.$router.push("/")
          return
        }
      })
    },
    clear() {

    },
    showPicChange(image) {
      if (image) {
        this.file = this.$refs.editPicInput.file
        console.log("image", this.$refs.editPicInput.file);
      }
    },
    getBeer(id) {
      AppService.getBeer(id)
      .then(result => {
        if (result.error) {
          return
        }
        if (result.success) {
          this.beer = result.success.data
          this.name = this.beer.name
          this.alcContent = this.beer.alcohol_content
          this.description = this.beer.description
          this.imageName = this.beer.image_url.split("/")[3]
          this.featured = this.beer.featured
          this.picstyles.background = `url(${this.beer.image_url})`
          this.setBrewers()
          this.setStatuses()
        }
      })
    },
    setBrewers() {
      AppService.getBrewerNames()
      .then(result => {
        let brs = result.success.data
        this.brewers = brs.map(brewer => {
          return {
            value: brewer.id,
            text: `${brewer.first_name} ${brewer.last_name}`
          }
        })
      })
      if (this.beer.brewers) {
        let currentBrewers = this.beer.brewers
        let mappedBrewersVals = []
        for (var i = 0; i < currentBrewers.length; i++) {
          mappedBrewersVals.push(currentBrewers[i].id)
        }
        this.selectedBrewers = mappedBrewersVals
      }
    },
    setStatuses() {
      let allStatuses = ["upcoming", "brewing", "active-full", "active-empty", "past"]
      let mappedStatuses = []
      for (var i = 0; i < allStatuses.length; i++) {
        mappedStatuses.push({
          text: allStatuses[i]
        })
      }
      this.statuses = mappedStatuses
      this.selectedStatus = this.beer.status
    }
  },
  watch: {},
  created() {
    this.getBeer(this.$route.params.id)
  }
}
</script>

<style lang="scss">
  .edit-beer-wrapper {
    @include flexRowC;
    min-height: calc(100% - 74px);

    .picWrapper {
      @include flexRowSp;

      .picUploader {
        height: 200px !important;
        margin-top: 20px;
        margin-bottom: 50px;
        padding-bottom: 20px;
        width: 50% !important;

        .preview-container {
          padding-bottom: 3px;
        }

        .picture-preview, .picture-inner {
          z-index: 1 !important;
        }
      }

      .picPreviewDiv {
        height: 200px !important;
        width: 40% !important;
        text-align: left;
        margin-top: 30px;
        background-position: center !important;
        background-size: contain !important;
        background-repeat: no-repeat !important;
      }
    }
  }
</style>
