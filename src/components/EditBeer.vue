<template>
  <div class="edit-beer-wrapper" v-if="!!currentBeer">
    <v-layout justify-center>
      <v-flex xs12 sm10 md8 lg6 xl4>
        <v-card>
          <v-card-text>
            <v-form id="editBeerForm" ref="form">
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
                v-model="alcoholContent"
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
                :items="allBrewers"
                v-model="selectedBrewers"
                label="Selected Brewers:"
                multiple
                max-height="400"
                append-icon="arrow_drop_down"
                hide-details
                id="brewSelect"
              ></v-select>

              <p>{{ selectedBrewers }}</p>

              <v-checkbox class="featured-checkbox" label="Featured?" v-model="featured" light></v-checkbox>

                <div class="picWrapper">
                    <h3>Update Image</h3>
                    <div class="image-flex-wrapper">
                        <input type="file" @change="previewImage" accept="image/*">
                        <div class="image-preview" v-if="!!imageData.length">
                            <img class="preview" :src="imageData" alt="">
                        </div>
                        <div class="image-preview" v-else>
                            <img class="preview" :src="selectedImageURL" alt="">
                        </div>
                    </div>
                </div>

              <v-btn @click.prevent="handleSubmit" style="background-color: #F4812D; color: white;">Update</v-btn>

              <v-btn v-on:click="clear" style="color: #F4812D;">clear</v-btn>
              
              <v-btn color="primary" dark @click.stop="dialog = true">Delete</v-btn>
            <v-dialog
                v-model="dialog"
                max-width="290"
            >
                <v-card>
                    <v-card-title class="headline">Are you sure?</v-card-title>
                    <v-spacer></v-spacer>
                    <v-card-actions>
                        <v-btn
                            color="green darken-1"
                            flat="flat"
                            @click="dialog = false">
                            Cancel
                        </v-btn>
                        
                        <v-btn
                            color="green darken-1"
                            flat="flat"
                            @click="deleteBeer">
                            Confirm
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    data() {
        return {
            beer: {},
            statuses: ["upcoming", "brewing", "active-full", "active-empty", "past"],
            selectedStatus: null,
            selectedBrewers: [],
            name: "",
            alcoholContent: null,      
            description: null,
            startingBrewers: {},
            file: null,
            imageData: "",
            selectedImageURL: null,
            featured: null,
            dialog: false,
        }
    },
  
    computed: {
        ...mapGetters([
            'currentBeer',
        ]),
        allBrewers() {
            return this.$store.getters.basicBrewers.map(brewer => {
                return {
                    value: brewer.id,
                    text: `${brewer.first_name} ${brewer.last_name}`
                }                        
            })
        },                
    },

    watch: {
        '$route'(to, from) {
            if (from.params.id !== to.params.id) {
                this.fetchCurrentBeer({id: to.params.id})
                this.selectedBrewers = []
            }
        },

        currentBeer(newVal, oldVal) {        
            this.name = newVal.name
            this.description = newVal.description
            this.alcoholContent = newVal.alcohol_content
            this.featured = newVal.featured
            if (newVal.brewers) {
                newVal.brewers.map(brewer => {
                    this.selectedBrewers.push(brewer.id)
                })
            }            
            this.startingBrewers = this.selectedBrewers
            this.selectedStatus = newVal.status
            this.selectedImageURL = newVal.image_url
        },
    },

    created() {
        this.fetchCurrentBeer({id: this.$route.params.id})        
    },

    methods: {
        ...mapActions({
            fetchCurrentBeer: 'fetchCurrentBeer',
            updateBeer: 'updateBeer',
            deleteBeerFromDB: 'deleteBeer'
        }),

        async deleteBeer() {
            this.dialog = false
            let result = await this.deleteBeerFromDB({id: this.$route.params.id})
            if (result == "OK") {
                this.$router.push("/")
            } else {
                console.log("Error occurred")
            }
        },

        previewImage(event) {
            let input = event.target
            if (input.files && input.files[0]) {
                let reader = new FileReader()
                reader.onload = (e) => {
                    this.imageData = e.target.result
                }
                reader.readAsDataURL(input.files[0])
                this.file = input.files[0]
            }
        },

        handleSubmit() {
            let data = new FormData()            
            if (this.file) {
                data.append("image", this.file, this.file.name)
            }
    
            data.append("name", this.name)
            data.append("description", this.description)
            data.append('alcohol_content', this.alcoholContent)
            data.append('featured', this.featured)
            data.append('brewer_ids', this.selectedBrewers)
            data.append('status', this.selectedStatus)
            
            let statusText = this.updateBeer({id: this.currentBeer.id, data: data})
            if (statusText = "OK") {
                this.$router.push('/')
            } else {
                console.log("Error occurred: ", statusText)
            }
            
        },
        clear() {
            this.showStartingData()
            this.selectedBrewers = this.startingBrewers
            this.imageData = ""
        },
        showStartingData() {
            this.name = this.currentBeer.name
            this.description = this.currentBeer.description
            this.alcoholContent = this.currentBeer.alcohol_content
            this.featured = this.currentBeer.featured
            this.selectedStatus = this.currentBeer.status
        },
    },
}
</script>

<style lang="scss">
  .edit-beer-wrapper {
    @include flexRowC;
    min-height: calc(100% - 74px);

    .picWrapper {
        border-top: 1px solid rgba(0,0,0,0.3);

        h3 {
            text-align: left;
            margin-top: 10px;
            margin-bottom: 10px;
        }
        .image-flex-wrapper {
            display: flex;
            flex-flow: column nowrap;
            align-items: flex-start;

            input {
                margin-bottom: 20px;
            }
        }

       .image-preview {
            font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
            height: 200px;
        }
        img.preview {
            max-height: 200px;            
            height: inherit;
            background-color: white;
            border: 1px solid #DDD;
            padding: 5px;
        }
    }
  }
</style>
