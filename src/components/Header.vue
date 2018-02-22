<template>
  <div class="navWrapper">
    <div class="navContainer">
      <router-link to="/" >Home</router-link>
      <router-link :to="{ name: 'beers', params: {}, query: {limit: 2, order: 'desc'} }">All Beers</router-link>
      <router-link :to="{ name: 'beers', query: {status: 'active', order: 'desc'} }">On Tap</router-link>
      <router-link :to="{ name: 'beers', query: {status: 'brewing', order: 'desc', limit: 1} }">Now Brewing</router-link>
      <router-link :to="{ name: 'beers', query: {status: 'empty', order: 'desc'} }">Off Tap</router-link>
      <router-link :to="{ name: 'createBeer', query: {} }" v-if="this.authed">Create Beer</router-link>
      <router-link :to="{ name: 'imageupload', query: {} }" v-if="this.authed">Upload Image</router-link>
      <router-link :to="{ name: 'admin', query: {} }" v-if="!this.authed">Admin</router-link>
      <a href="" @click.prevent="logout" v-if="this.authed">Logout</a>
    </div>

    <div class="nav-mobile">
      <div class="dropdown-bg" :class="{active: isActive}" @click="toggleNav"></div>
      <span class="hamburger" @click="toggleNav" style="z-index: 999"><img src="/src/assets/img/nav-hamburger.png" alt="mobile hamburger navigation icon"/></span>
      <div ref="navdropdown" class="mob-nav-items" :class="{active: isActive}">
        <ul class="nav-ul">
          <li class="nav-li" v-scroll-to="'#onTap, 50px'" @click.prevent="toggleNav"><a href="">On Tap</a></li>
          <li class="nav-li" v-scroll-to="'#nowBrewing, 50px'" @click.prevent="toggleNav"><a href="#">Now Brewing</a></li>
          <li class="nav-li" v-scroll-to="'#pastBeers, 50px'" @click.prevent="toggleNav"><a href="#">Past Beers</a></li>
          <li class="nav-li" v-scroll-to="'#map, 50px'" @click.prevent="toggleNav"><a href="#">Get involved!</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import AppService from '@/app.service.js'
import vueScrollTo from 'vue-scroll-to'
export default {
  props: [
    'authed',
  ],
  components: {
  },
  data() {
    return {
      isActive: false
    }
  },
  methods: {
    logout() {
      let token = window.localStorage.getItem("brewToken")
      if (token) {
        AppService.logout(token)
        .then(result => {
          if (result.Error) {
            console.log("Error trying to logout", result.Error.status_text);
          } else if (result.Success) {
            this.$router.push("/")
            this.$emit("auth", false)
            window.localStorage.removeItem("brewToken")
          }
        })
      }
    },
    toggleNav() {
      this.isActive = !this.isActive
    }
  },
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
