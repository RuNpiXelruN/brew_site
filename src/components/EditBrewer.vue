<template>
    <div class="edit-brewer-wrapper">
        <v-layout justify-center>
            <v-flex xs12 sm6 class="edit-brewer-flex">
                <v-form ref="selectForm" v-model="valid" lazy-validation>
                    <v-container>
                        <v-select
                            label="Select brewer to edit"
                            :items="brewerOption"
                            v-model="selectedBrewerId">
                        </v-select>
                    </v-container>
                </v-form>
            </v-flex>            
        </v-layout>

        <v-layout justify-center>
            <v-flex xs12 sm6 class="edit-brewer-flex">
                <v-form ref="editBrewerForm" v-model="valid" lazy-validation>
                    <v-container>
                        <v-text-field
                            label="Username"
                            v-model="username">                            
                        </v-text-field>
                        <v-text-field
                            label="First Name"
                            v-model="first_name">                            
                        </v-text-field>
                        <v-text-field
                            label="Last Name"
                            v-model="last_name">                            
                        </v-text-field>
                        <v-select
                            label="Selected Rank"
                            :items="allRanks"
                            v-model="selectedRank">                            
                        </v-select>
                        <v-select
                            label="Selected Beers"
                            :items="allBeers"
                            v-model="selectedBeers"
                            multiple>                            
                        </v-select>
                        <v-checkbox
                            label="Featured?"
                            v-model="featured">                            
                        </v-checkbox>

                        <div class="buttons-flex-wrapper">
                            <div class="buttons-left-wrapper">
                                <v-btn :disabled="!valid" @click.prevent="handleSubmit" style="background-color: #F4812D; color: white;">Update</v-btn>
                                <v-btn v-on:click="reset" style="color: #F4812D;">Reset</v-btn>
                            </div>
                            <v-btn :disabled="!selectedBrewerId" color="error" dark @click.stop="dialog = true">Delete</v-btn>
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
                                        @click="deleteBrewer">
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
            username: null,            
            first_name: null,
            last_name: null,
            selectedRank: null,
            selectedBeers: null,
            featured: null,

            selectedBrewer: null,
            selectedBrewerId: null,
            valid: true, 
            dialog: false,
        }
    },
    computed: {
        brewers() {
            return this.$store.getters.brewers
        },
        brewerOption() {
            return this.$store.getters.brewers.map(brewer => {
                return {
                    value: brewer.id,
                    text: `${brewer.first_name} ${brewer.last_name}`
                }
            })
        },
        allRanks() {
            return this.$store.getters.brewerRanks.map(rank => {
                return {
                    value: rank.level,
                    text: rank.name
                }
            })
        },
        allBeers() {
            return this.$store.getters.basicBeers.map(beer => {
                return {
                    value: beer.id,
                    text: beer.name,
                }
            })
        }
    },    
    watch: {
        selectedBrewer(newVal, oldVal) {
            this.username = newVal.username            
            this.first_name = newVal.first_name
            this.last_name = newVal.last_name
            if (newVal.rank) {
                this.selectedRank = newVal.rank.level
            }            
            if (newVal.beers) {
                this.selectedBeers = newVal.beers.map(beer => {
                    return beer.id                
                })
            }            
            this.featured = newVal.featured
        },

        selectedBrewerId(newVal, oldVal) {
            if (newVal != null) {
                this.selectedBrewer = this.brewers.find(element => element.id == parseInt(this.selectedBrewerId))
            }            
        },
    },
    methods: {
        async handleSubmit() {
            let data = new FormData()

            data.append('username', this.username)
            data.append('first_name', this.first_name)
            data.append('last_name', this.last_name)
            data.append('rank', this.selectedRank)
            data.append('beer_ids', this.selectedBeers)
            data.append('featured', this.featured)

            let result = await this.$store.dispatch('updateBrewer', {id: this.selectedBrewerId, data: data})
            if (result == "OK") {
                this.$store.dispatch('createPopup', {text: "Successfully updated brewer", state: true})
                this.reset()    
            } else {
                console.log("something went wrong :(")
            }
        },

        async deleteBrewer() {
              let result = await this.$store.dispatch('deleteBrewer', {id: this.selectedBrewerId})
              if (result == "OK") {
                  this.$store.dispatch('createPopup', {text: "Successfully deleted beer", state: true})
                  this.dialog = false
                  this.reset()
              }              
        },

        reset() {
            this.$refs.selectForm.reset()
            this.$refs.editBrewerForm.reset()
        }
    }
}
</script>
<style lang="scss">
    .edit-brewer-wrapper {
        .edit-brewer-flex {
            background: white;
            box-shadow: 0vw 1vw 2vw 0vw rgba(0,0,0,0.2);
            margin: 20px 0;
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