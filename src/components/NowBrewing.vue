<template>
  <div id="nowBrewing" class="now-brewing-wrapper">
    <h2 class="status-heading">Now Brewing</h2>
    <p class="status-p">Mentally Fermented’s dedicated team of bootleggers are well known for pushing the boundaries of their craft, experimenting with all types of store bought hops, spices and woods to create unique, full flavoured beers.</p>

    <div class="brewing-image-section">

      <div class="brewing-beer" v-for="beer in brewingBeers" v-bind:key="beer.id">
        <div class="beer-keg">
          <div class="inner-card-wrapper">
            <h3 class="beer-card-heading">{{beer.name}}</h3>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  components: {},
  props: [
    'authed'
  ],
  data() {
    return {        
    }
  },
  computed: {
      ...mapGetters(['brewingBeers'])
  },
  methods: {
    ...mapActions(['fetchBrewingBeers'])
  },
  created() {
      this.fetchBrewingBeers({status: "brewing", limit: "2", order: "desc"})
  },
  watch: {}
}
</script>
<style lang="scss">
  .now-brewing-wrapper {
    @include flexCol;

    .status-heading {
      @include h2Style;
      margin-bottom: 40px;
      @media screen and (max-width: 991px) {
        // font-size: 32px;
        margin-bottom: 20px;
      }
    }

    .status-p {
      @include pStyle;
      width: 50%;
      margin-bottom: 60px;
      text-align: left;
      line-height: 1.5;
      max-width: 1100px;
      @media screen and (max-width: 991px) {
        font-size: 14px;
        margin-bottom: 40px;
      }
      @media screen and (max-width: 768px) {
        font-size: 16px;
        width: 70%;
      }
      @media screen and (max-width: 570px) {
      }
      @media screen and (max-width: 491px) {
        width: 80%;
      }
    }

    .brewing-image-section {
      @include flexRowC;
      margin: 6rem 0;
      max-width: 1600px;

      @media screen and (max-width: 991px) {
        margin: 6% 0;
      }


      .brewing-beer {
        width: 22%;
        height: 32vw;
        max-width: 320px;
        max-height: 500px;

        @media screen and (max-width: 991px) {
          width: 30%;
          height: 48vw;
        }
        @media screen and (max-width: 570px) {
          width: 40%;
          height: 62vw;
        }

        &:last-child {
          .beer-keg {
            background-image: url("https://brew-site.s3-ap-southeast-2.amazonaws.com/keg2.png");
          }
        }

        .beer-keg {
          @include flexColC;
          background-image: url("https://brew-site.s3-ap-southeast-2.amazonaws.com/keg1.png");
          background-position: center;
          background-size: contain;
          width: 100%;
          height: 100%;
        }

        .inner-card-wrapper {
          background-color: $bgColor;
          width: 70%;
          padding: 15% 0;

          .beer-card-heading {
            @include h3Style;
            @media screen and (max-width: 768px) {
              font-size: 16px;
            }
          }
        }
      }
    }
  }
</style>
