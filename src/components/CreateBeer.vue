<template>
  <div class="create-beer-wrapper">
    <v-layout justify-center>
      <v-flex xs12 sm10 md6 lg4 elevation-7>
        <v-card>
          <v-card-text>
            <v-form v-model="valid" ref="form" lazy-validation v-on:submit.prevent="handleSubmit">
              <v-text-field
                label="Name"
                v-model="fields.name"
                :rules="nameRules"
                :counter="10"
                required
              ></v-text-field>
              <v-text-field
                v-model="fields.description"
                name="input-7-1"
                label="Description"
                multi-line
              ></v-text-field>
              <v-text-field
                v-model="fields.alcohol_content"
                label="Alcohol Content"
                type="number"
              ></v-text-field>

              <v-select
                v-bind:items="statuses"
                single-line
                auto
                label="Choose beer status"
                v-model="fields.selectedStatus"
                append-icon="arrow_drop_down"
              ></v-select>

              <v-select
                :items="allBrewers"
                label="Select brewers"
                v-model="selectedBrewers"
                multiple
                hide-details
                max-height="400"
                append-icon="arrow_drop_down">
              </v-select>

              <v-checkbox class="featured-checkbox" v-bind:label="`Featured?`" v-model="featured" light></v-checkbox>

              <div class="picWrapper">
                  <h3>Upload Image</h3>
                  <div class="image-flex-wrapper">
                    <input ref="imageInput" type="file" @change="previewImage" accept="image/*">
                    <div class="image-preview" v-if="!!imageData.length">
                        <img class="preview" :src="imageData" alt="new beer image">
                    </div>
                  </div>
              </div>

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
  import { mapGetters, mapActions } from 'vuex'
  export default {
    data() {
      return {
        fields: {
            name: null,
            description: null,
            alcohol_content: null,
            selectedStatus: null,            
        },
        file: null,
        featured: false,
        brewers: [],
        selectedBrewers: [],
        statuses: ["upcoming", "brewing", "active-full", "active-empty", "past"],
        valid: true,
        nameRules: [
          (v) => !!v || 'Name is required',
          // (v) => v && v.length <= 10 || 'Name must be less than 10 characters'
        ],
        imageData: "",
      }
    },
    computed: {
        notNullFields() {
            let dbObject = {}
            Object.keys(this.fields).filter(key => {
                if (this.fields[key] !== null && this.fields[key].length > 0) {
                    dbObject[key] = this.fields[key]
                }
            })
            return dbObject
        },

        allBrewers() {
            return this.$store.getters.basicBrewers.map(brewer => {
                return {
                    value: brewer.id,
                    text: `${brewer.first_name} ${brewer.last_name}`,
                }
            })
        }
    },
    watch: {},
    methods: {
        previewImage(event) {
            let input = event.target
            if (input.files && input.files[0]) {
                let reader = new FileReader()
                reader.onload = (e) => {
                    this.imageData = e.target.result
                    this.file = input.files[0]
                }
                reader.readAsDataURL(input.files[0])
            }
        },

        async handleSubmit() {
            if (this.$refs.form.validate()) {
                var createBeerData = new FormData()
                
                if (this.file) {
                    createBeerData.append('image', this.file, this.file.name)
                }
                
                for (var key in this.notNullFields) {
                    if (key.hasOwnProperty) {
                        createBeerData.append(key, this.notNullFields[key])
                    }
                }                
                
                createBeerData.append('featured', this.featured)
                createBeerData.append('brewer_ids', this.selectedBrewers)

                let result = await this.$store.dispatch('createBeer', {params: createBeerData})                
                if (result = "OK") {
                    this.$store.dispatch('createPopup', {text: "Beer successfully created", state: true})
                    this.clear()
                } else {
                    console.log("Error occurred: ", result)
                }
            }
        },

      clear () {
        this.$refs.form.reset()
        this.file = null
        this.imageData = ""
        this.$refs.imageInput.value = ""
      }
    },
  }
</script>
<style lang="scss">
  .create-beer-wrapper {
    @include flexRowC;
    min-height: calc(100% - 74px);

    .featured-checkbox {
      margin-top: 20px;
    }

    .picWrapper {
        border-top: 1px solid rgba(0,0,0,0.3);

        h3 {
            text-align: left;
            margin-bottom: 10px;
            margin-top: 10px;
        }

        .image-flex-wrapper {
            display: flex;
            flex-flow: column nowrap;
            align-items: flex-start;
        }

        .image-preview {
            height: 200px;
            margin: 20px 0;
            
            img {
                height: inherit;
            }

        }
    }
  }
</style>
