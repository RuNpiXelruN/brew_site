<template>
  <div class="app-main">
    <div class="hero-section">

      <img class="hero-logo" src="/src/assets/img/fermented-logo.png" alt="mentally fermented logo">

      <div class="hero-wrapper">
        <div class="hero-text">
          <h2 class="hero-subtitle">Drinking beer<br>
            shouldn't be hard
          </h2>

          <p class="hero-p">With Mentally Fermented, it's simple, personal and fun for everyone
          </p>
        </div>

        <div class="hero-image"></div>
      </div>

    </div>



    <div class="about-fermented">

      <div class="status-wrapper">
        <div class="blurb-wrapper">
          <p class="beer-blurb">It all began in 7000BCE, when 3 yeast spontaneously fermented the sugars of Redfern.
            Since that very day, The Art of Brewing has been refined and passed down the Fiddler bloodline.
            Liam’s Funky Crumpet has truely revolutionised the way the world drinks beer.
          </p>
        </div>

        <on-tap :authed="authed"/>
        <now-brewing :authed="authed" />
        <past-beers :authed="authed"/>
        <next-brew-date :authed="authed"/>
      </div>
    </div>
  </div>
</template>

<script>

// TODO add max-width to sliders and map
// TODO optimize image sizes
import AppService from '@/app.service.js'
import NextBrewDate from '@/components/NextBrewDate.vue'
import PastBeers from '@/components/Empty.vue'
import NowBrewing from '@/components/NowBrewing.vue'
import OnTap from '@/components/OnTap.vue'
import MfMap from '@/components/MfMap.vue'
export default {
  props: [
    'authed'
  ],
  components: {
    OnTap,
    NowBrewing,
    PastBeers,
    NextBrewDate,
    MfMap
  },
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {},
  watch: {
    'authed'(newVal, oldVal) {
      console.log(newVal, oldVal);
    }
  }
}
</script>

<style lang="scss">
  // 991, 767, 570, 469
  .app-main {
    width: 100%;
    display: flex;
    flex-flow: column nowrap;

    .hero-section {
      @include flexCol;
      width: 100%;
      max-width: 1350px;
      position: relative;
      align-self: center;

      @media screen and (max-width: 1600px) {
        width: 80%;
      }

      @media screen and (max-width: 768px) {
        height: 630px;
      }
      @media screen and (max-width: 570px) {
        width: 95%;
        margin-left: 5%;
        height: 500px;
      }

      .hero-logo {
        position: absolute;
        top: 0;
        left: 0;
        margin-right: auto;
        margin-top: 50px;
        margin-bottom: 50px;
        @media screen and (max-width: 991px) {
          margin-top: 40px;
          margin-bottom: 40px;
        }
        @media screen and (max-width: 491px) {
          width: 210px;
          margin-top: 30px;
          margin-bottom: 30px;
        }
      }

      .hero-wrapper {
        @include flexRowSp;
        height: inherit;
        @media screen and (max-width: 1600px) {
          width: 120%;
          margin-left: 20%;
        }

        .hero-text {
          width: 100%;

          @media screen and (max-width: 768px) {
            width: 60%;
            margin-top: 50px;
          }
          @media screen and (max-width: 570px) {
            width: 62%;
            margin-top: -10px;
          }
          @media screen and (max-width: 491px) {
            width: 55%;
          }
        }

        .hero-subtitle {
          font-family: 'PoppinsSemiBold', sans-serif;
          font-size: 48px;
          line-height: 1.5;
          margin-bottom: 30px;
          @media screen and (max-width: 991px) {
            font-size: 44px;
            margin-bottom: 20px;
          }
          @media screen and (max-width: 768px) {
            font-size: 35px;
            margin-bottom: 20px;
          }
          @media screen and (max-width: 590px) {
            font-size: 30px;
            margin-bottom: 20px;
          }
          @media screen and (max-width: 491px) {
            font-size: 5.7vw;
          }
        }

        .hero-p {
          font-family: 'PoppinsRegular', sans-serif;
          font-size: 24px;
          width: 440px;
          line-height: 1.5;
          @media screen and (max-width: 991px) {
            font-size: 18px;
            width: 490px;
          }
          @media screen and (max-width: 768px) {
            font-size: 20px;
            width: 54vw;
          }
          @media screen and (max-width: 590px) {
            font-size: 16px;
            width: 310px;
          }
          @media screen and (max-width: 491px) {
            font-size: 3.7vw;
            width: 223px;
          }
        }

        .hero-image {
          background-image: url(https://brew-site.s3-ap-southeast-2.amazonaws.com/beer-bottle-hero.png);
          height: 800px;
          width: 100%;
          background-size: 700px;
          background-position: -60% bottom;

          @media screen and (max-width: 1600px) {
            background-position: 0% bottom;
          }
          @media screen and (max-width: 991px) {
            height: 700px;
            background-size: 620px;
            width: 45%;
          }
          @media screen and (max-width: 768px) {
            height: inherit;
            background-size: 850px;
            background-position: 0 70%;
            width: 40%;
          }
          @media screen and (max-width: 570px) {
            background-size: 830px;
            width: 45%;
          }
          @media screen and (max-width: 491px) {
            background-size: 780px;
            width: 40%;
          }
        }
      }
    }

    .about-fermented {
      border-top: 4px solid $textColor;
      // margin: 0 -9999rem;
      // padding: 0.25rem 9999rem;

      .status-wrapper {
        width: 100;
        margin-top: 10rem;
        @media screen and (max-width: 768px) {
          margin-top: 15%;
        }

        .blurb-wrapper {
          @include flexRowC;

          .beer-blurb {
            color: $textColor;
            font-family: "PoppinsRegular", sans-serif;
            font-size: 24px;
            width: 50%;
            margin-bottom: 10rem;
            text-align: left;
            line-height: 2;
            max-width: 1100px;

            @media screen and (max-width: 991px) {
              font-size: 18px;
              line-height: 1.5;
              margin-bottom: 9%;
            }
            @media screen and (max-width: 768px) {
              font-size: 20px;
              width: 60%;
            }
            @media screen and (max-width: 570px) {
              width: 70%;
            }
            @media screen and (max-width: 491px) {
              font-size: 18px;
              width: 80%;
            }
          }
        }
      }
    }
  }
</style>
