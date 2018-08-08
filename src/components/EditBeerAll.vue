<template>
    <div class="edit-beers-wrapper">
        <v-layout justify-center>
            <v-flex xs12 sm6 class="edit-beer-flex">
                <v-form ref="selectForm" v-model="valid" lazy-validation>
                    <v-container>
                        <v-select
                            label="Select beer to edit"
                            :items="beerOptions"
                            v-model="selectedBeerId">
                        </v-select>
                    </v-container>
                </v-form>
            </v-flex>            
        </v-layout>

        <v-layout justify-center>
            <v-flex xs12 sm6 class="edit-beer-flex">
                <v-form ref="editBeerForm" v-model="valid" lazy-validation>
                    <v-container>
                        <v-text-field
                            label="Name"
                            v-model="name">                            
                        </v-text-field>
                        <v-text-field
                            label="Description"
                            v-model="description">                            
                        </v-text-field>
                        <v-text-field
                            ref="alcohol_content"
                            label="Alcohol Content"
                            type="number"
                            v-model="alcohol_content">
                        </v-text-field>
                        <v-select
                            label="Selected Status"
                            :items="allStatuses"
                            v-model="selectedStatus">                            
                        </v-select>
                        <v-select
                            label="Selected Brewers"
                            :items="basicBrewers"
                            v-model="selectedBrewers"
                            multiple>                            
                        </v-select>
                        <v-checkbox
                            label="Featured?"
                            v-model="featured">                            
                        </v-checkbox>

                        <div class="picWrapper">
                            <h3>Update Image</h3>
                            <div class="image-flex-wrapper">
                                <input type="file" @change="previewImage" accept="image/*" ref="imgInput">
                                <div class="image-preview" v-if="imageData.length > 0">
                                    <img class="preview" :src="imageData" alt="">
                                </div>
                                <div class="image-preview" v-else>
                                    <img class="preview" :src="selectedImageURL" alt="">
                                </div>
                            </div>
                        </div>

                        <div class="buttons-flex-wrapper">
                            <div class="buttons-left-wrapper">
                                <v-btn :disabled="!valid" @click.prevent="handleSubmit" style="background-color: #F4812D; color: white;">Update</v-btn>
                                <v-btn v-on:click="reset" style="color: #F4812D;">Reset</v-btn>
                            </div>
                            <v-btn :disabled="!selectedBeerId" color="error" dark @click.stop="dialog = true">Delete</v-btn>
                        </div>

                        <v-dialog
                            v-model="dialog"
                            max-width="290">

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
                    </v-container>
                </v-form>
            </v-flex>            
        </v-layout>
    </div>    
</template>
<script>
export default {
    data() {
        return {
            name: null,
            description: null,
            alcohol_content: null,
            allStatuses: ["upcoming", "brewing", "active-full", "active-empty", "past"],
            featured: false,
            imageData: "",
            file: null,
            selectedImageURL: null,
            selectedBeerId: null,
            selectedBeer: null,
            selectedStatus: null,
            selectedBrewers: null,
            valid: true,
            dialog: false,
        }
    },
    computed: {
        beers() {
            return this.$store.getters.beers
        },
        beerOptions() {
            return this.$store.getters.beers.map(beer => {
                return {
                    value: beer.id,
                    text: beer.name
                }
            })
        },
        basicBrewers() {
            return this.$store.getters.basicBrewers.map(brewer => {
                return {
                    value: brewer.id,
                    text: `${brewer.first_name} ${brewer.last_name}`,
                }
            })
        }
    },
    watch: {
        selectedBeerId(newVal, oldVal) {
            if (newVal != null) {
                this.selectedBeer = this.beers.find(element => element.id == parseInt(this.selectedBeerId))
            }            
        },
        selectedBeer(newVal, oldVal) {
            this.name = newVal.name
            this.description = newVal.description
            this.alcohol_content = newVal.alcohol_content
            this.selectedStatus = newVal.status
            if (newVal.brewers) {
                this.selectedBrewers = newVal.brewers.map(brewer => {
                    return brewer.id
                })
            }            
            this.featured = newVal.featured
            this.selectedImageURL = newVal.image_url
        }
    },
    methods: {
        async handleSubmit() {
            let data = new FormData()

            if (this.file) {
                data.append('image', this.file, this.file.name)
            }

            data.append('name', this.name)
            data.append('description', this.description)
            data.append('alcohol_content', this.alcohol_content)            
            data.append('featured', this.featured)
            data.append('brewer_ids', this.selectedBrewers)
            data.append('status', this.selectedStatus)

            let result = await this.$store.dispatch('updateBeer', {id: this.selectedBeer.id, data: data})
            if (result == "OK") {
                this.$store.dispatch('createPopup', {text: "Beer successfully updated", state: true})
                this.reset()
            }
        },

        async deleteBeer() {
            let result = await this.$store.dispatch('deleteBeer', {id: this.selectedBeerId})
            if (result == "OK") {
                this.$store.dispatch('createPopup', {text: "Beer successfully deleted", state: true})
                this.dialog = false
                this.reset()
            }
            
        },

        reset() {
            this.$refs.selectForm.reset()
            this.$refs.editBeerForm.reset()
            this.imageData = ""
            this.selectedImageURL = null            
            this.file = null
            this.$refs.imgInput.value = ""                                
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
    }
}
</script>
<style lang="scss">
    .edit-beers-wrapper {
        .edit-beer-flex {
            background: white;
            box-shadow: 0vw 1vw 2vw 0vw rgba(0,0,0,0.2);
            margin: 20px 0;
        }

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
                max-height: 200px;
            }
            img.preview {
                max-height: 200px;            
                height: inherit;
                background-color: white;
                border: none;
                padding: 5px;
            }
        }

        .buttons-flex-wrapper {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            justify-content: space-between;
            margin-top: 30px;
        }
    }
</style>



