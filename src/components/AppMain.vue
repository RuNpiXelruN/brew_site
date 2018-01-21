<template>
  <div class="app-main">
    <div class="hero-section">

      <img class="hero-logo" src="/src/assets/img/fermented-logo.png" alt="mentally fermented logo">

      <div class="hero-wrapper">
        <div class="hero-text">
          <h2 class="hero-subtitle">Drinking beer<br>
            shouldn't be hard
          </h2>

          <p class="hero-p">With Mentally Fermented, it's simple, personal<br>and fun for everyone
          </p>
        </div>
        <div class="hero-image">
          <img src="https://brew-site.s3-ap-southeast-2.amazonaws.com/beer-bottle-hero.png">
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

        <on-tap></on-tap>
        <now-brewing></now-brewing>
        <past-beers></past-beers>
      </div>
    </div>
  </div>
</template>

<script>

// TODO add extra status type to beers for class add to 'On Tap' section

import PastBeers from '@/components/Empty.vue'
import NowBrewing from '@/components/NowBrewing.vue'
import OnTap from '@/components/OnTap.vue'
export default {
  components: {
    OnTap,
    NowBrewing,
    PastBeers
  }
}
</script>

<style lang="scss">
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
      }

      .hero-wrapper {
        @include flexRowSp;

        .hero-subtitle {
          font-family: 'PoppinsSemiBold', sans-serif;
          font-size: 48px;
          line-height: 1.3;
          margin-bottom: 40px;
        }

        .hero-p {
          font-family: 'PoppinsRegular', sans-serif;
          font-size: 24px;
        }

        .hero-image {
          width: 40%;
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
          }
        }
      }
    }
  }
</style>
