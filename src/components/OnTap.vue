<template>
  <div>
    <div id="onTap" class="on-tap-section">
      <h2 class="status-heading">On Tap</h2>
      <p class="status-p">We maintain 1-3 beers on tap, which are constantly changing to satisfy the never-ending thirst of our cicerones.</p>

      <div class="active-beers-section">
        <div class="active-beer" v-for="beer in beers" v-bind:key="beer.id">
          <div class="image-container">
            <div v-if="beer.status === 'active-empty'" class="runout runout-img"></div>
            <img v-bind:src="beer.image_url" alt="image of currently active beer" class="beer-card-image">
          </div>

          <div class="beer-title-wrapper">
            <div v-if="beer.status === 'active-empty'" class="runout"></div>
            <span class="beer-card-title">Title</span>
            <h3 class="beer-card-heading">{{beer.name}}</h3>
          </div>

          <div class="beer-description-wrapper">
            <div v-if="beer.status === 'active-empty'" class="runout"></div>
            <span class="beer-card-title">Description</span>
            <div class="desc-flex">
              <p class="beer-card-description">{{beer.description}}</p>
              <span>{{beer.alcohol_content}} ABV</span>
            </div>
            <!-- <button v-if="authed" v-on:click.prevent="btnClick(index)" type="button" name="button">Update</button>

            <router-link v-if="authed" :to="{name: 'editBeer', params: {id: `${beer.id}`}}">Edit</router-link> -->
          </div>
        </div>
      </div>

      <!-- <edit-beer-component :beer="beerToEdit" v-on:clearupdate="clearUpdate"/> -->

      <!-- TODO add alt tags to images -->
      <!-- TODO add empty class to mob slider beers on tap -->
      <div class="active-beers-mob">
        <mob-slider :beers="beers" />
      </div>
    </div>
  </div>
</template>

<script>
// TODO add 'runout' class to mob slider
import MobSlider from '@/components/MobSlider.vue'
// import EditBeerComponent from '@/components/EditBeerComponent'
import { statusBeersMixin } from '../mixins/statusBeersMixin'
export default {
    mixins: [statusBeersMixin("active", 3)],
  components: {
    MobSlider,
    // EditBeerComponent
  },
  props: [],
  data() {
    return {
    //   beers: [],
    //   beerToEdit: {}
    }
  },
  methods: {
    //   ...mapActions['fetchBeers'],
    // btnClick(index) {
    //   if (index) {
    //     this.beerToEdit = this.beers[index]
    //   }
    // },
    // clearUpdate(value) {
    //   this.beerToEdit = value
    // },
  }
}
</script>
<style lang="scss">
  .on-tap-section {
    @include flexCol;
    @media screen and (max-width: 768px) {
      margin-top: 8%;
    }

    .status-heading {
      @include h2Style;
      margin-bottom: 40px;
      @media screen and (max-width: 991px) {
        margin-bottom: 20px;
      }
      @media screen and (max-width: 768px) {
        margin-bottom: 12px;
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

    .active-beers-mob {
      display: none;
      @media screen and (max-width: 768px) {
        display: block;
        width: 100%;
        margin-bottom: 90px;
      }
    }

    .active-beers-section {
      @include flexRowSt;
      width: 80%;
      border: 4px solid $textColor;
      margin-bottom: 150px;
      align-items: stretch;
      max-width: 1300px;

      @media screen and (max-width: 991px) {
        margin-bottom: 110px;
      }
      @media screen and (max-width: 768px) {
        display: none;
      }

      .active-beer {
        @include flexCol;
        width: 33.333%;
        max-height: 850px;

        .image-container {
          width: 100%;
          height: 23vw;
          overflow: hidden;
          background-size: cover;
          position: relative;
          max-height: 440px;

          .beer-card-image {
            transform-origin: bottom;
            height: 30vw;
            position: absolute;
            z-index: 1;
            bottom: 1vw;
            width: 100%;
            left: 0;
            max-height: 600px;
          }
        }

        .beer-card-title {
          color: $textColor;
          font-size: 14px;
          font-family: "PoppinsRegular", sans-serif;
          margin-bottom: 6px;
          @media screen and (max-width: 991px) {
            font-size: 12px;
          }
          @media screen and (max-width: 570px) {
            font-size: 10px;
          }
        }

        .beer-card-heading {
          @include h3Style;
          @media screen and (max-width: 991px) {
            font-size: 16px;
          }
          @media screen and (max-width: 570px) {
            font-size: 13px;
          }
        }

        .beer-card-description {
          @include pStyle;
          text-align: left;
          @media screen and (max-width: 991px) {
            font-size: 14px;
            line-height: 1.5;
          }
          @media screen and (max-width: 570px) {
            font-size: 10px;
          }
        }

        &:first-child {
          border-right: 4px solid $textColor;

          .image-container {
            background-image: url("https://brew-site.s3-ap-southeast-2.amazonaws.com/large-dots-bg.svg");
          }
        }

        &:nth-child(2) {
          border-right: 4px solid $textColor;

          .image-container {
            background-image: url("https://brew-site.s3-ap-southeast-2.amazonaws.com/med-dots-bg.svg");
          }
        }

        &:last-child {
          .image-container {
            background-image: url("https://brew-site.s3-ap-southeast-2.amazonaws.com/sm-dots-bg.svg");
          }
        }

        .beer-title-wrapper {
          border-top: 2px solid $textColor;
          border-bottom: 2px solid $textColor;
        }

        .desc-flex {
          height: 160px;
          display: flex;
          flex-flow: column nowrap;
          align-items: flex-start;
          justify-content: space-between;
        }

        .beer-title-wrapper, .beer-description-wrapper {
          @include flexColSt;
          padding: 16px 0px 16px 7px;
          position: relative;
          @media screen and (max-width: 991px) {
            padding: 10px 12px;
          }
        }
      }
    }
    .runout {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background-color: rgba(255, 248, 226, 0.6);

      &.runout-img {
        background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' preserveAspectRatio='none' viewBox='0 0 100 100'><path d='M1 0 L0 0 L100 100 L100 99' fill='#F57F17' /><path d='M0 100 L99 0 L100 0 L1 100' fill='#F57F17' /></svg>");
        background-color: rgba(255, 248, 226, 0.6);
        background-repeat:no-repeat;
        background-position:center center;
        background-size: 103% 103%, auto;
        z-index: 2;
      }
    }
  }
</style>
