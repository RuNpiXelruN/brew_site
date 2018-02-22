<template>
  <div class="create-beer-wrapper">
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
      ></v-select>

      <h3>{{selectedStatus}}</h3>

      <v-checkbox v-bind:label="`Featured?`" v-model="featured" light></v-checkbox>

      <v-select
        class="testtttt"
        v-bind:items="brewers"
        multiple
        single-line
        auto
        append-icon=""
        hide-details
        label="Select"
        v-model="selectedBrewers">
      </v-select>

      <h3>{{selectedBrewers}}</h3>

      <input type="file" ref="file" name="file" v-on:change="handleFileUpload" value=""/>
      <br>
      Selected file: {{file && file.name}}
      <br>

      <button type="submit" name="button">Submit Me</button>

      <!-- <v-btn
        :disabled="!valid">
        Submit
      </v-btn> -->
      <v-btn v-on:click="clear">clear</v-btn>
    </v-form>
  </div>
</template>

<script>
  import AppService from '@/app.service.js'
  export default {
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
    methods: {
      getBrewerNames() {
        AppService.getBrewerNames()
        .then(data => {
          var brews = data.data
          var brewsNew = brews.map((brewer) => {
            return {
              value: brewer.id,
              text: `${brewer.first_name} ${brewer.last_name}`
            }
          })
          this.brewers = brewsNew
        })
      },
      handleFileUpload() {
        this.file = this.$refs.file.files[0]
      },
      handleSubmit() {
        var self = this
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
          .then(response => {
            if (response.Error) {
              console.log("Error -> ", response.Error)
            } else {
              console.log("Create Success!", response.Success)
            }
          })
        }
      },
      clear () {
        this.$refs.form.reset()
        this.file = null
        this.$refs.file.value = ''
      }
    }
  }
</script>
<style lang="scss">
</style>
