<template>
  <div class="create-brewer-wrapper">
    <v-layout justify-center>
      <v-flex xs12 sm10 md6 lg4 elevation-7>
        <v-card>
          <v-card-text>
            <v-form v-model="valid" ref="createBrewerForm">
              <v-text-field
                label="Username"
                v-model="username"
                :rules="usernameRules"
                required
              ></v-text-field>
              <v-text-field
                label="First Name"
                v-model="firstname"
                :rules="firstnameRules"
                required
              ></v-text-field>
              <v-text-field
                label="Last Name"
                v-model="nullFields.lastname"
              ></v-text-field>
              <v-checkbox label="Featured?" v-model="featured"></v-checkbox>
              <v-select
                class=""
                :items="beers"
                v-model="selectedBeers"
                multiple
                auto
                append-icon="arrow_drop_down"
                hide-details
                label="Any brews he/she was a part of?">
              </v-select>
              <v-select
                class="someclass"
                label="Brewer Rank"
                auto
                hide-details
                append-icon="arrow_drop_down"
                :items="allRanks"
                v-model="nullFields.selectedRank"
              ></v-select>

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
import { mapActions, mapGetters } from 'vuex';
export default {
    data() {
        return {
            nullFields: {
                last_name: null,
                selectedRank: null,
            },    
            username: null,
            firstname: null,
            featured: false,
            selectedBeers: [],

            firstnameRules: [
            (v) => !!v || 'First Name is required'
            ],
            usernameRules: [
            (v) => !!v || 'Username is required'
            ],
            valid: false,
        }
    },
    computed: {
        notNullFields() {
            let dbObject = {}
            Object.keys(this.nullFields).filter(key => {
                if (this.nullFields[key] !== null && this.nullFields[key].length > 0) {
                    dbObject[key] = this.nullFields[key]
                }
            })
            return dbObject
        },
        allRanks() {
            return this.$store.getters.brewerRanks.map(rank => {
                return {
                    value: rank.level,
                    text: rank.name,
                }
            })
        },
        beers() {
            return this.$store.getters.basicBeers.map(beer => {
                return {
                    value: beer.id,
                    text: beer.name,
                }
            })
        }
    },
    watch: {},
    created() {},
    methods: {
    async handleSubmit() {
        var data = new FormData()

        for (var key in this.notNullFields) {
            if (key.hasOwnProperty) {
                data.append(key, this.notNullFields[key])          
            }
        }

        data.append("username", this.username)
        data.append("first_name", this.firstname)
        data.append("featured", this.featured)
        data.append("beer_ids", this.selectedBeers)

        let result = await this.$store.dispatch('createBrewer', data)
        if (result == "OK") {
            this.$store.dispatch('createPopup', {text: "Successfully created brewer", state: true})
            this.clear()
        } else {
            console.log("Something went wrong :(", result)
        }
    },
    clear() {
        this.$refs.createBrewerForm.reset()
    },
  },
}
</script>

<style lang="scss">
  .create-brewer-wrapper {
    @include flexRowC;
    min-height: calc(100% - 74px);
  }
</style>
