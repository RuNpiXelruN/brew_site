<template>
    <div class="navWrapper">
        <div class="navContainer">
            <router-link to="/" >Home</router-link>
            <div v-if="!authed" @click="GAuth">Login</div>
            <div v-else @click="logout">Logout</div>        
        </div>
    </div>
</template>

<script>
import vueScrollTo from 'vue-scroll-to'
import SignupComponent from '@/components/auth/SignUp.vue'
export default {
    props: [],
    components: {
        SignupComponent
    },
    data() {
        return {
            dialog: false,
        }
    },
    computed: {        
        authed() {
            return this.$store.getters.isAuthed
        }
    },
    methods: {
        async GAuth() {
            try {
                let response = await this.$gAuth.getAuthCode((authCode) => {                
                    this.$store.dispatch('login', {code: authCode, redirect_uri: 'postmessage'})        
                })
            } catch (err) {
                console.log("Error in GAuth", err)
            }                
        },
        logout() {
            this.$store.dispatch('logout')
            this.$store.dispatch('createPopup', {text: "Successfully signed out.", state: true})
            this.$router.push("/")
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
