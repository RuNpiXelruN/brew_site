<template>
  <div class="navWrapper">
    <div class="navContainer">
      <router-link to="/" >Home</router-link>
        <v-menu ofset-y>
            <div
                slot="activator"
            >
                Admin
            </div>
            <v-card>
                <v-list>
                    <v-list-tile-content>
                        <v-list-tile-title>Create</v-list-tile-title>
                    </v-list-tile-content>
                </v-list>                
            </v-card>

            <v-divider></v-divider>

            <v-list>
                <router-link :to="{name: 'createBeer'}">
                    <v-list-tile>
                        <v-list-tile-title>Beer</v-list-tile-title>
                    </v-list-tile>
                </router-link>
                <router-link :to="{name: 'createBrewer'}">
                    <v-list-tile>                  
                        <v-list-tile-title>Brewer</v-list-tile-title>
                    </v-list-tile>
                </router-link>
            </v-list>

            <v-card>
                <v-list>
                    <v-list-tile-content>
                        <v-list-tile-title>Update</v-list-tile-title>
                    </v-list-tile-content>
                </v-list>                
            </v-card>

            <v-divider></v-divider>

            <v-list>
                <router-link :to="{name: 'editBeerAll'}">
                    <v-list-tile>                  
                        <v-list-tile-title>Beer</v-list-tile-title>
                    </v-list-tile>
                </router-link>
                <router-link :to="{name: 'editBrewer'}">
                    <v-list-tile>                  
                        <v-list-tile-title>Brewer</v-list-tile-title>
                    </v-list-tile>
                </router-link>
            </v-list>
        </v-menu>
    </div>
  </div>
</template>

<script>
import vueScrollTo from 'vue-scroll-to'
export default {
  props: [],
  components: {
  },
  data() {
    return {}
  },
  methods: {},
  created() {}
}
</script>
<style lang="scss">

  .navWrapper {
    @include flexRowC;
    height: 71px;
    background: white;
    border-bottom: 2px solid;
    @media screen and (max-width: 768px) {
      display: none;
    }

    .navContainer {
      @include flexRowSp;
      width: 80%;
      max-width: 1350px;
      @media screen and (max-width: 768px) {
        display: none;
      }

      a {
        color: $textColor;
        text-decoration: none;
        font-family: 'PoppinsSemiBold', sans-serif;
        font-size: 14px;
        text-transform: uppercase;
      }
    }

    .nav-mobile {
      display: none;
      margin-top:50px;
      position: relative;
      width: 100%;
      @media screen and (max-width: 768px) {
        display: block;
      }

      .hamburger {
        cursor: pointer;
        position: absolute;
        top: -50px;
        right: 20px;
        transform: scale(0.7);
      }

      .dropdown-bg {
        display: none;
        position: fixed;
        z-index: 99;
        top: 0;
        bottom: 0;
        width: 100%;
        min-height: 100vh;
        background: rgba(0, 0, 0, 0.5);

        &.active {
          display: block;
        }
      }

      .mob-nav-items {
        opacity: 0;
        visibility: hidden;
        position: absolute;
        top: 20px;
        z-index: 100;
        width: 100%;
        background: $bgColor;
        border-top: 4px solid $textColor;
        border-bottom: 4px solid $textColor;
        padding-bottom: 30px;
        transition: all 0.3s ease;

        &.active {
          opacity: 1;
          visibility: visible;
        }

        .nav-ul {
          @include flexColSp;

          .nav-li {
            list-style-type: none;
            padding: 3rem 0;
            width: 100%;
            transition: all 0.2s ease;

            &:focus, &:active, &:hover {
              background: $textColor;

              a {
                color: $bgColor;
              }
            }

            a {
              @include pStyle;
              text-decoration: none;
            }
          }
        }
      }
    }
  }
</style>
