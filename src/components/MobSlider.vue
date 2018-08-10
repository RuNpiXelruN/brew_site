<template>
  <div class="mob-slider-wrapper">
    <div class="sliderbtn-left" v-on:click="prev">
      <div class="arrow-left"></div>
    </div>
    <div class="sliderbtn-right" v-on:click="next">
      <div class="arrow-right"></div>
    </div>

    <!-- <slick ref="slick" class="mob-slick-wrapper" v-if="beers.length > 0" :options="slickOptions"> -->
    <slick ref="slick" class="mob-slick-wrapper" v-if="!!beers.length" :options="slickOptions">
      <div class="mob-active-beer" v-for="(beer, index) in beers" :key="index">
        <div class="image-wrapper">
          <div v-if="beer.status.name === 'active-empty'" class="runout runout-img"></div>
          <img class="mob-beer-image" :src="beer.image_url" alt="an image of a beer currently on tap">
        </div>
        <div class="text-wrapper">
          <div class="beer-title">
            <div v-if="beer.status.name === 'active-empty'" class="runout"></div>
            <span class="beer-card-title">Title</span>
            <h3 class="beer-card-heading">{{beer.name}}</h3>
          </div>
          <div class="beer-description">
            <div v-if="beer.status.name === 'active-empty'" class="runout"></div>
            <span class="beer-card-title">Description</span>
            <div class="description-flex">
              <p class="beer-card-description">{{beer.description}}</p>
              <span>{{beer.alcohol_content}} ABV</span>
            </div>
          </div>
        </div>
      </div>
    </slick>
  </div>
</template>

<script>
import Slick from 'vue-slick'
export default {
  props: ['beers'],
  components: {
    Slick
  },
  data() {
    return {
      slickOptions: {
        arrows: false,
        dots: true,
        mobileFirst: true,
        centerMode: true,
        // variableWidth: true
      }
    }
  },
  methods: {
    next() {
      this.$refs.slick.next()
    },

    prev() {
      this.$refs.slick.prev()
    }
  }
}
</script>

<style lang="scss">
  .mob-slider-wrapper {
    width: 100%;
    position: relative;

    .sliderbtn-left {
      position: absolute;
      width: 50px;
      height: 56px;
      background-color: $textColor;
      left: 0;
      top: 44%;
      z-index: 98;
      cursor: pointer;
      border: 4px solid $textColor;
      transition: background-color 0.2s ease;
      @media screen and (max-width: 991px) {
        top: 38%;
      }
      @media screen and (max-width: 768px) {
        top: 140px;
        width: 44px;
        height: 46px;
      }

      &:hover {
        background-color: white;

        .arrow-left {
          border-right: 3px solid $textColor;
          border-top: 3px solid $textColor;
        }
      }

      .arrow-left {
        transform:  rotate(-135deg);
        border-right: 3px solid $bgColor;
        border-top: 3px solid $bgColor;
        height: 20px;
        top: 14px;
        left: 14px;
        position: absolute;
        width: 20px;
        left: 16px;
        z-index: 99;
        @media screen and (max-width: 768px) {
          top: 9px;
          left: 13px;
        }
      }
    }

    .sliderbtn-right {
      position: absolute;
      width: 50px;
      height: 56px;
      background-color: $textColor;
      right: 0;
      top: 44%;
      z-index: 98;
      cursor: pointer;
      border: 4px solid $textColor;
      transition: background-color 0.2s ease;
      @media screen and (max-width: 991px) {
        top: 38%;
      }
      @media screen and (max-width: 768px) {
        top: 140px;
        width: 44px;
        height: 46px;
      }

      &:hover {
        background-color: white;

        .arrow-right {
          border-right: 3px solid $textColor;
          border-top: 3px solid $textColor;
        }
      }

      .arrow-right {
        transform:  rotate(45deg);
        border-right: 3px solid $bgColor;
        border-top: 3px solid $bgColor;
        height: 20px;
        top: 14px;
        position: absolute;
        width: 20px;
        left: 7px;
        z-index: 99;
        @media screen and (max-width: 768px) {
          top: 9px;
          left: 3px;
        }
      }
    }

    .mob-slick-wrapper {
      width: 100%;

      .slick-list .slick-track {
        #slick-slide00 {
          .image-wrapper {
            background-image: url("https://brew-site.s3-ap-southeast-2.amazonaws.com/large-dots-bg.svg");
          }
        }

        #slick-slide01 {
          .image-wrapper {
            background-image: url("https://brew-site.s3-ap-southeast-2.amazonaws.com/sm-dots-bg.svg");
          }
        }
        #slick-slide02 {
          .image-wrapper {
            background-image: url("https://brew-site.s3-ap-southeast-2.amazonaws.com/med-dots-bg.svg");
          }
        }

      }

      .slick-arrow {
        display: none !important;
      }

      .sliderbtn-left {
        position: absolute;
        width: 50px;
        height: 56px;
        background-color: $textColor;
        left: 10.05%;
        top: 44%;
        z-index: 98;
        cursor: pointer;
        border: 4px solid $textColor;
        transition: background-color 0.2s ease;
        @media screen and (max-width: 991px) {
          top: 38%;
        }

        &:hover {
          background-color: white;

          .arrow-left {
            border-right: 3px solid $textColor;
            border-top: 3px solid $textColor;
          }
        }

        .arrow-left {
          transform:  rotate(-135deg);
          border-right: 3px solid $bgColor;
          border-top: 3px solid $bgColor;
          height: 20px;
          top: 14px;
          left: 14px;
          position: absolute;
          width: 20px;
          left: 16px;
          z-index: 99;
        }
      }

      .slick-dots {
        position: absolute;
        bottom: -25px;
        padding: 0;
        margin: 0;
        list-style: none;
        text-align: center;
        width: 100%;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: center;
        @media screen and (max-width: 768px) {
          bottom: -45px;
        }

        li {
          position: relative;
          display: inline-block;
          width: 15px;
          height: 15px;
          margin: 0 5px;
          padding: 0;
          cursor: pointer;
          border: 2px solid $textColor;
          border-radius: 20px;

          &.slick-active {
            background: $textColor !important;
          }

          button {
            font-size: 0;
            line-height: 0;
            display: block;
            width: 15px;
            height: 15px;
            padding: 5px;
            cursor: pointer;
            color: transparent;
            border: 0;
            outline: 0;
            position: absolute;
            top: -1px;
            left: -2px;
          }
        }
      }

      .mob-active-beer {
        display: flex !important;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        height: 450px;
        border: 4px solid $textColor;

        @media screen and (max-width: 768px) {
          height: 340px;
          width: 95% !important;
          margin-left: 2.5%;
        }
        @media screen and (max-width: 570px) {
          height: 300px;
        }
        @media screen and (max-width: 469px) {
          height: 260px;
        }

        .image-wrapper {
          background-size: cover;
          width: 50%;
          height: inherit;
          position: relative;
          border-right: 2px solid $textColor;

          &:first-child {
            background-image: url("https://brew-site.s3-ap-southeast-2.amazonaws.com/large-dots-bg.svg");
          }

          &:nth-child(2) {
            background-image: url("https://brew-site.s3-ap-southeast-2.amazonaws.com/med-dots-bg.svg");
          }

          &:last-child {
            background-image: url("https://brew-site.s3-ap-southeast-2.amazonaws.com/sm-dots-bg.svg");
          }

          .mob-beer-image {
            position: absolute;
            bottom: 15px;
            left: 0;
            right: 0;
            margin: auto;
            height: 80vw;
            @media screen and (max-width: 768px) {
              height: 460px;
            }
            @media screen and (max-width: 570px) {
              height: 410px;
            }
            @media screen and (max-width: 469px) {
              height: 330px;
            }
          }
        }

        .text-wrapper {
          @include flexColSt;
          width: 50%;
          height: inherit;
          text-align: left;

          .beer-card-title {
            color: $textColor;
            font-size: 14px;
            font-family: "PoppinsRegular", sans-serif;
            margin-bottom: 6px;
            @media screen and (max-width: 469px) {
              font-size: 10px;
            }
          }

          .beer-title {
            border-bottom: 2px solid;
            width: 100%;
            height: 30%;
            padding: 7% 5%;

            .beer-card-heading {
              @include h3Style;              

              @media screen and (max-width: 991px) {
                font-size: 16px;
              }
            }
          }

          .beer-title, .beer-description {
            position: relative;
          }

          .beer-description {
            padding: 7% 5%;
            height: 70%;
            width: 100%;

            .description-flex {
              display: flex;
              flex-flow: column nowrap;
              align-items: flex-start;
              justify-content: space-between;
              height: 90%;

              .beer-card-description {
                @include pStyle;
                @media screen and (max-width: 991px) {
                  font-size: 14px;
                  line-height: 1.5;
                }
                @media screen and (max-width: 469px) {
                  font-size: 12px;
                  line-height: 1.2;
                }
              }
            }
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
      border-top: 4px solid $textColor;

      &.runout-img {
        background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' preserveAspectRatio='none' viewBox='0 0 100 100'><path d='M1 0 L0 0 L100 100 L100 99' fill='#F57F17' /><path d='M0 100 L99 0 L100 0 L1 100' fill='#F57F17' /></svg>");
        background-color: rgba(255, 248, 226, 0.6);
        background-repeat:no-repeat;
        background-position:center center;
        background-size: 103% 103%, auto;
        z-index: 2;
        border-bottom: 4px solid $textColor;
      }
    }
    .beer-description .runout {
      border-top: 0;
      border-bottom: 4px solid $textColor;
    }
  }
</style>
