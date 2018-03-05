<template>
  <div class="create-beer-wrapper">
    <v-layout justify-center>
      <v-flex xs12 sm10 md6 lg4 elevation-7>
        <v-card>
          <v-card-text>
            <v-form v-model="valid" ref="form" lazy-validation v-on:submit.prevent="handleSubmit">
              <v-text-field
                label="Name"
                v-model="name"
                :rules="nameRules"
                :counter="10"
                required
              ></v-text-field>
              <v-text-field
                v-model="description"
                name="input-7-1"
                label="Description"
                multi-line
              ></v-text-field>
              <v-text-field
                v-model="alcohol_content"
                label="Alcohol Content"
                type="number"
              ></v-text-field>

              <v-select
                v-bind:items="statuses"
                single-line
                auto
                label="Choose beer status"
                v-model="selectedStatus"
                append-icon="arrow_drop_down"
              ></v-select>

              <h3>{{selectedStatus}}</h3>

              <v-checkbox v-bind:label="`Featured?`" v-model="featured" light></v-checkbox>

              <v-select
                class="testtttt"
                style="background: white;"
                v-bind:items="brewers"
                label="Select brewers"
                multiple
                single-line
                auto
                append-icon=""
                hide-details
                append-icon="arrow_drop_down"
                v-model="selectedBrewers">
              </v-select>

              <picture-input
                ref="pictureInput"
                class="picUploader"
                @change="showPicChange"
                margin="16"
                height="400"
                width="800"
                accept="image/*"
                size="10"
                buttonClass="btn"
                :customStrings="{
                  upload: '<h1>Bummer!</h1>',
                  drag: 'Drag Image Here'
                }">
              </picture-input>

              <v-btn :disabled="!valid" @click.prevent="handleSubmit" style="background-color: #F4812D; color: white;">Create</v-btn>

              <v-btn v-on:click="clear" style="color: #F4812D;">clear</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import AppService from '@/app.service.js'
  import PictureInput from 'vue-picture-input'
  export default {
    components: {
      PictureInput
    },
    data() {
      return {
        file: null,
        featured: false,
        alcohol_content: null,
        description: null,
        brewers: [],
        selectedBrewers: [],
        statuses: ["upcoming", "brewing", "active-full", "active-empty", "past"],
        selectedStatus: null,
        valid: true,
        name: null,
        nameRules: [
          (v) => !!v || 'Name is required',
          // (v) => v && v.length <= 10 || 'Name must be less than 10 characters'
        ],
      }
    },
    created() {
      this.getBrewerNames()
    },
    watcher: {},
    methods: {
      showPicChange(image) {
        if (image) {
          this.file = this.$refs.pictureInput.file
        }
      },
      getBrewerNames() {
        AppService.getBrewerNames()
        .then(result => {
          if (result.error) {
            console.log("Error fetching brewer names: ", result.error.status_text);
          } else if (result.success) {
            var brews = result.success.data
            var brewsNew = brews.map((brewer) => {
              return {
                value: brewer.id,
                text: `${brewer.first_name} ${brewer.last_name}`
              }
            })
            this.brewers = brewsNew
          } else {
            console.log("Something went wrong setting brewer names :(");
          }
        })
      },
      handleSubmit() {
        if (this.$refs.form.validate()) {
          var createBeerData = new FormData()
          if (this.file) {
            createBeerData.append('image', this.file, this.file.name)
          }
          createBeerData.append('name', this.name)
          createBeerData.append('name', this.name)
          createBeerData.append('description', this.description)
          createBeerData.append('alcohol_content', this.alcohol_content)
          createBeerData.append('featured', this.featured)
          createBeerData.append('brewer_ids', this.selectedBrewers)
          createBeerData.append('status', this.selectedStatus)

          AppService.createBeer(createBeerData)
          .then(result => {
            if (result.error) {
              console.log("Error -> ", result.error)
            } else if (result.success){
              this.$refs.form.reset()
              console.log("Create Success!", result.success.data)
            } else {
              console.log("Something went wrong :(");
            }
          })
        }
      },
      clear () {
        this.$refs.form.reset()
        this.file = null
        this.$refs.pictureInput.removeImage()
      }
    },
  }
</script>
<style lang="scss">
  .create-beer-wrapper {
    @include flexRowC;
    min-height: calc(100% - 74px);

    #picture-input {
      margin-top: 50px;
      margin-bottom: 30px;

      .picture-preview, .picture-inner {
        z-index: 1 !important;
      }
    }
  }
</style>
