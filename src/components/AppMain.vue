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
        <div class="hero-image">
          <img class="beer-bottle-main" src="https://brew-site.s3-ap-southeast-2.amazonaws.com/beer-bottle-hero.png">
        </div>
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

        <on-tap />
        <now-brewing />
        <past-beers />
        <next-brew-date />
      </div>
    </div>
  </div>
</template>

<script>

// TODO add max-width to sliders and map
// TODO optimize image sizes

import NextBrewDate from '@/components/NextBrewDate.vue'
import PastBeers from '@/components/Empty.vue'
import NowBrewing from '@/components/NowBrewing.vue'
import OnTap from '@/components/OnTap.vue'
import MfMap from '@/components/MfMap.vue'
export default {
  components: {
    OnTap,
    NowBrewing,
    PastBeers,
    NextBrewDate,
    MfMap
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss">
  // 991, 767, 469
  .app-main {
    width: 100%;

    .hero-section {
      @include flexCol;
      width: 80%;
      margin-left: 10%;

      .hero-logo {
        margin-right: auto;
        margin-top: 50px;
        margin-bottom: 50px;
        @media screen and (max-width: 991px) {
          margin-top: 40px;
          margin-bottom: 40px;
        }
      }

      .hero-wrapper {
        @include flexRowSp;

        @media screen and (max-width: 768px) {
          .hero-text {
            width: 100%;
          }
        }

        .hero-subtitle {
          font-family: 'PoppinsSemiBold', sans-serif;
          font-size: 48px;
          line-height: 1.3;
          margin-bottom: 40px;
          @media screen and (max-width: 991px) {
            font-size: 36px;
            margin-bottom: 20px;
            line-height: 1.2;
          }
          @media screen and (max-width: 768px) {
            font-size: 28px;
            margin-bottom: 10px;
            line-height: 1.2;
          }
        }

        .hero-p {
          font-family: 'PoppinsRegular', sans-serif;
          font-size: 24px;
          width: 440px;
          @media screen and (max-width: 991px) {
            font-size: 18px;
            width: 400px;
          }
          @media screen and (max-width: 768px) {
            font-size: 16px;
            width: 300px;
          }
        }

        .hero-image {
          width: 40%;
          @media screen and (max-width: 991px) {
            width: 38%;
          }

          .beer-bottle-main {
            @media screen and (max-width: 991px) {
              height: 52vw;
            }
            @media screen and (max-width: 768px) {
              height: 46vw;
            }
          }
        }
      }
    }

    .about-fermented {
      border-top: 4px solid $textColor;

      .status-wrapper {
        width: 100;
        margin-top: 10%;

        .blurb-wrapper {
          @include flexRowC;

          .beer-blurb {
            color: $textColor;
            font-family: "PoppinsRegular", sans-serif;
            font-size: 24px;
            width: 50%;
            margin-bottom: 12%;
            text-align: left;
            line-height: 2;
            @media screen and (max-width: 991px) {
              font-size: 18px;
              line-height: 1.5;
              margin-bottom: 9%;
            }
            @media screen and (max-width: 768px) {
              font-size: 16px;
              line-height: 1.3;
            }
          }
        }
      }
    }
  }
</style>
