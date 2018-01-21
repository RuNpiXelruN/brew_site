<template>
  <div>
    <div class="on-tap-section">
      <h2 class="status-heading">On Tap</h2>
      <p class="status-p">We maintain 1-3 beers on tap, which are constantly changing to satisfy the never-ending thirst of our cicerones.</p>

      <div class="active-beers-section">
        <div class="active-beer" v-for="beer in beers" v-bind:key="beers.id">
          <div class="image-container">
            <div class="runout runout-img"></div>
            <img v-bind:src="beer.image_url" alt="image of currently active beer" class="beer-card-image">
          </div>

          <div class="beer-title-wrapper">
            <div class="runout"></div>
            <span class="beer-card-title">Title</span>
            <h3 class="beer-card-heading">{{beer.name}}</h3>
          </div>

          <div class="beer-description-wrapper">
            <div class="runout"></div>
            <span class="beer-card-title">Description</span>
            <p class="beer-card-description">{{beer.description}}</p>
            <span>{{beer.alcohol_content}} ABV</span>
          </div>
        </div>
      </div>
    </div>

    <status-beers status="active" limit="3" order="desc" v-on:data="setData"></status-beers>
  </div>
</template>

<script>
import StatusBeers from '@/components/StatusBeers.vue'
export default {
  components: {
    StatusBeers
  },
  data() {
    return {
      beers: []
    }
  },
  methods: {
    setData(data) {
      this.beers = data
    }
  }
}
</script>
<style lang="scss">
  .on-tap-section {
    @include flexCol;

    .status-heading {
      @include h2Style;
      margin-bottom: 40px;
    }

    .status-p {
      @include pStyle;
      width: 50%;
      margin-bottom: 60px;
      text-align: left;
    }

    .active-beers-section {
      @include flexRowSt;
      width: 80%;
      border: 4px solid $textColor;
      margin-bottom: 150px;
      align-items: stretch;

      .active-beer {
        @include flexCol;
        width: 33.333%;

        .image-container {
          width: 100%;
          background-size: cover;
          position: relative;

          .beer-card-image {

          }
        }

        .beer-card-title {
          color: $textColor;
          font-size: 14px;
          font-family: "PoppinsRegular", sans-serif;
          margin-bottom: 6px;
        }

        .beer-card-heading {
          @include h3Style;
        }

        .beer-card-description {
          @include pStyle;
          text-align: left;
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

        .beer-title-wrapper, .beer-description-wrapper {
          @include flexColSt;
          padding: 20px 16px 16px;
          position: relative;
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
      }
    }
  }
</style>
