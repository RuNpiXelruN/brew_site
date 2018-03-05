<template>
  <div class="create-brewer-wrapper">
    <v-layout justify-center>
      <v-flex xs12 sm10 md6 lg4 elevation-7>
        <v-card>
          <v-card-text>
            <v-form v-model="valid" ref="createBrewerForm">
              <v-text-field
                label="First Name"
                v-model="firstname"
                :rules="firstnameRules"
                required
              ></v-text-field>
              <v-text-field
                label="Last Name"
                v-model="lastname"
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
                :items="ranks"
                v-model="selectedRank"
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
import AppService from '@/app.service.js'
export default {
  data() {
    return {
      beers: [],
      selectedBeers: [],
      firstname: null,
      firstnameRules: [
        (v) => !!v || 'First Name is required'
      ],
      lastname: null,
      featured: false,
      ranks: [],
      selectedRank: null,
      valid: false,
    }
  },
  created() {
    this.getBrewerRanks()
    this.getAllBeers()
  },
  methods: {
    // TODO check that first name AND last name brewer doesn't
    // already exist and alert. Alert for confirm if does.
    // Give additional option to edit.
    handleSubmit() {
      var createBrewerData = new FormData()
      createBrewerData.append("first_name", this.firstname)
      createBrewerData.append("last_name", this.lastname)
      createBrewerData.append("featured", this.featured)
      createBrewerData.append("rank", this.selectedRank)
      createBrewerData.append("beer_ids", this.selectedBeers)

      AppService.createBrewer(createBrewerData)
    },
    clear() {
      this.$refs.createBrewerForm.reset()
    },
    getBrewerRanks() {
      AppService.getBrewerRanks()
      .then(result => {
        if (result.error) {
          console.log("There was an error fetching ranks, ", err);
        } else if (result.success) {
          var ranks = result.success.data
          var ranksNew = ranks.map(rank => {
            return {
              value: rank.id,
              text: rank.name
            }
          })
          this.ranks = ranksNew
        } else {
          console.log("Something went wrong :(");
        }
      })
    },
    getAllBeers() {
      AppService.getBasicBeers()
      .then(result => {
        if (result.error) {
          console.log("There was an error fetching beers");
        } else if (result.success) {
          var beers = result.success.data
          var newBeers = beers.map(beer => {
            return {
              value: beer.id,
              text: beer.name
            }
          })
          this.beers = newBeers
        }
      })
    }
  },
}
</script>

<style lang="scss">
  .create-brewer-wrapper {
    @include flexRowC;
    min-height: calc(100% - 74px);
  }
</style>
