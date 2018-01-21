<template>
  <div class="past-beers-wrapper">

    <h2 class="status-heading">Off Tap</h2>
    <p class="status-p">A slow-growing selection of limited edition brews and oak aged oddities that are retired but always ready to make a resurgence.</p>

    <slider style="height: 550px; width: 80%;" :auto="auto" :indicators="indicators">
      <slider-item v-for="(beer, index) in beers" :key="index">
        <div class="slide-wrapper">
          <div class="slide-image"></div>
          <div class="slide-text">
            <div class="placeholder-div"></div>
            <div class="slide-beer-info">
              <div class="beer-title-wrapper">
                <span class="beer-card-title">Title</span>
                <h3 class="beer-card-heading">{{beer.name}}</h3>
              </div>

              <div class="beer-description-wrapper">
                <span class="beer-card-title">Description</span>
                <p class="beer-card-description">{{beer.description}}</p>
                <span>{{beer.alcohol_content}} ABV</span>
              </div>
            </div>
          </div>
        </div>
      </slider-item>
    </slider>

    <status-beers status="empty" order="desc" v-on:data="setData"></status-beers>
  </div>
</template>

<script>
import { Slider, SliderItem } from 'vue-easy-slider'
import StatusBeers from '@/components/StatusBeers.vue'
export default {
  components: {
    StatusBeers,
    Slider,
    SliderItem
  },
  data() {
    return {
      beers: [],
      auto: false,
      indicators: false
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
  .past-beers-wrapper {
    @include flexCol;

    // TODO remove this
    margin-bottom: 500px;

    .status-heading {
      @include h2Style;
      margin-top: 40px;
      margin-bottom: 40px;
    }

    .status-p {
      @include pStyle;
      width: 50%;
      text-align: left;
      margin-bottom: 60px;
    }

    .slide-wrapper {
      @include flexRowSt;
      height: 100%;
      background-image: url("https://brew-site.s3-ap-southeast-2.amazonaws.com/slider-dots-bg.png");
      background-size: cover;
      border: 4px solid $textColor;

      .slide-image {
        width: 50%;
        height: 80%;
        background-image: url("https://brew-site.s3-ap-southeast-2.amazonaws.com/passionfruit-ipa.svg");
        background-position: center;
        background-size: contain;
      }
    }

    .slide-text {
      @include flexColSt;
      width: 50%;
      height: 100%;

      .slide-beer-info {
        margin-top: auto;
        height: 46.4%;
        width: 100%;
        background-color: $bgColor;
        border-left: 4px solid $textColor;
        border-top: 2px solid $textColor;

        .beer-title-wrapper {
          border-top: 2px solid $textColor;
          border-bottom: 2px solid $textColor;
        }

        .beer-title-wrapper, .beer-description-wrapper {
          @include flexColSt;
          padding: 20px 16px 16px;
        }
      }
    }
  }

  .btn {
    min-width: 50px !important;
  }

  button.btn.btn-right, button.btn.btn-left {
    height: 56px !important;
    width: 50px !important;
    top: 43% !important;
    border: 4px solid $textColor;
    background: $textColor !important;

    &:hover {
      background: $bgColor !important;

      i.slider-icon.slider-icon-right, i.slider-icon.slider-icon-left {
        border-left: 2px solid $textColor !important;
        border-bottom: 2px solid $textColor !important;
      }
    }
  }

  .btn-right {
    right: -8px !important;
  }

  .btn-left {
    left: -8px !important;
  }

  .btn:not(.btn--depressed) {
    box-shadow: none !important;
  }

  i.slider-icon.slider-icon-right, i.slider-icon.slider-icon-left {
    border-left: 2px solid $bgColor;
    border-bottom: 2px solid $bgColor;
  }

  i.slider-icon.slider-icon-left {
    margin-left: 8px;
  }

  i.slider-icon.slider-icon-right {
    margin-right: 8px;
  }
</style>
