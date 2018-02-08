<template>
  <div class="past-beers-wrapper">

    <h2 class="status-heading">Off Tap</h2>
    <p class="status-p">A slow-growing selection of limited edition brews and oak aged oddities that are retired but always ready to make a resurgence.</p>

    <div class="past-beers-slider">
      <div class="sliderbtn-left" v-on:click="prev">
        <div class="arrow-left"></div>
      </div>
      <div class="sliderbtn-right" v-on:click="next">
        <div class="arrow-right"></div>
      </div>

      <slick ref="slick" v-if="beers.length > 0" :options="slickOptions">
        <div class="past-beer" v-for="(beer, index) in beers" :key="index">
          <div class="image-wrapper" v-bind:style="{ backgroundImage: 'url(' + beer.image_url + ')' }"></div>
          <div class="text-wrapper">
              <div class="placeholder-div"></div>
              <div class="slide-beer-info">
                <div class="beer-title-wrapper">
                  <span class="beer-card-title">Title</span>
                  <h3 class="beer-card-heading">{{beer.name}}</h3>
                </div>

                <div class="beer-description-wrapper">
                  <span class="beer-card-title">Description</span>
                  <div class="desc-flex">
                    <p class="beer-card-description">{{beer.description}}</p>
                    <div class="alc-percent">{{beer.alcohol_content}} ABV</div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </slick>
    </div>

    <status-beers status="empty" order="desc" v-on:data="setData"></status-beers>
  </div>
</template>

<script>
import Slick from 'vue-slick'
import StatusBeers from '@/components/StatusBeers.vue'
export default {
  components: {
    StatusBeers,
    Slick
  },
  data() {
    return {
      beers: [],
      slickOptions: {
        arrows: false,
        dots: true,
        mobileFirst: false,
        autoPlay: false,
        centerMode: false,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              infinite: true,
              centerMode: true,
              mobileFirst: true
            }
          }
        ],
      }
    }
  },
  methods: {
    next() {
      this.$refs.slick.next()
    },
    prev() {
      this.$refs.slick.prev()
    },
    setData(data) {
      this.beers = data
    }
  }
}
</script>

<style lang="scss">
  .past-beers-slider {
    @include flexColC;
    position: relative;
    margin-top: 50px;

    .slick-slider {
      height: 100%;
      width: 80%;

      @media screen and (max-width: 768px) {
        width: 100%;
      }

      .slick-list {
        height: 100%;

        .slick-track {
          width: 100%;
          height: 100%;

          .slick-slide {
            width: 100%;

            .past-beer {
              display: flex !important;
              flex-flow: row nowrap;
              align-items: center;
              justify-content: flex-start;
              width: 80%;
              height: 550px;
              border: 4px solid $textColor;
              background-image: url("https://brew-site.s3-ap-southeast-2.amazonaws.com/slider-dots-bg.png");
              background-size: cover;

              @media screen and (max-width: 991px) {
                height: 400px;
              }
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
                width: 50%;
                height: 100%;
                background-position: center;
                background-size: 130px;
                @media screen and (max-width: 991px) {
                  background-size: 100px;
                }
                @media screen and (max-width: 768px) {
                  background-size: 85px;
                }
                @media screen and (max-width: 570px) {
                  background-size: 75px;
                }
                @media screen and (max-width: 469px) {
                  background-size: 65px;
                }
              }

              .text-wrapper {
                width: 50%;
                display: flex;
                flex-flow: column nowrap;
                align-items: flex-start;
                height: 100%;

                .placeholder-div {
                  height: 50%;
                  width: 100%;
                  @media screen and (max-width: 768px) {
                    display: none;
                  }
                }

                .slide-beer-info {
                  width: 100%;
                  height: 50%;
                  text-align: left;
                  background: $bgColor;
                  border-top: 4px solid $textColor;
                  border-left: 4px solid $textColor;
                  @media screen and (max-width: 768px) {
                    height: 100%;
                    border-top: none;
                  }

                  .beer-title-wrapper, .beer-description-wrapper {
                    @include flexColSt;
                    padding: 20px 16px 12px;
                    @media screen and (max-width: 991px) {
                      padding: 8px 7px 2px;
                    }
                  }

                  .beer-title-wrapper {
                    border-bottom: 2px solid #F57F17;
                    @media screen and (max-width: 768px) {
                      border-bottom: 2px solid;
                      width: 100%;
                      height: 30%;
                      padding: 7% 5%;
                    }

                    .beer-card-title {
                      color: $textColor;
                      font-size: 14px;
                      font-family: "PoppinsRegular", sans-serif;
                      margin-bottom: 0px;
                      @media screen and (max-width: 991px) {
                        font-size: 12px;
                      }
                      @media screen and (max-width: 768px) {
                        font-size: 14px;
                        margin-bottom: 6px;
                      }
                    }
                    .beer-card-heading {
                      @include h3Style;
                      @media screen and (max-width: 991px) {
                        font-size: 18px;
                      }
                      @media screen and (max-width: 768px) {
                        font-size: 16px;
                      }
                    }
                  }
                  .beer-description-wrapper {

                    @media screen and (max-width: 768px) {
                      padding: 7% 5%;
                      height: 70%;
                      width: 100%;
                    }

                    .beer-card-title {
                      color: $textColor;
                      font-size: 14px;
                      font-family: "PoppinsRegular", sans-serif;
                      margin-bottom: 0px;
                      @media screen and (max-width: 991px) {
                        font-size: 12px;
                        margin-bottom: 0px;
                      }
                      @media screen and (max-width: 768px) {
                        font-size: 14px;
                        margin-bottom: 6px;
                      }
                    }

                    .desc-flex {
                      height: 100px;
                      display: flex;
                      flex-flow: column nowrap;
                      align-items: flex-start;
                      justify-content: space-between;
                      @media screen and (max-width: 991px) {
                        height: 95px;
                      }
                      @media screen and (max-width: 768px) {
                        height: 80px;
                      }
                      @media screen and (max-width: 570px) {
                        height: 70px;
                      }

                      .beer-card-description {
                        @include pStyle;
                        margin-top: 5px;
                        font-size: 14px;
                        line-height: 1.5;
                        margin-top: 2px;
                        text-align: left;
                        @media screen and (max-width: 991px) {
                          margin-top: 0;
                          font-size: 13px;
                          line-height: 1.2;
                          margin-bottom: 0px;
                          height: 59%;
                          text-align: left;
                        }
                        @media screen and (max-width: 768px) {
                          font-size: 14px;
                          line-height: 1.5;
                        }
                        @media screen and (max-width: 570px) {
                          font-size: 11px;
                        }
                      }

                      .alc-percent {
                        font-size: 12px;
                        @media screen and (max-width: 991px) {
                          font-size: 10px;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    .slick-dots {
      position: absolute;
      bottom: -45px;
      padding: 0;
      margin: 0;
      list-style: none;
      text-align: center;
      width: 100%;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: center;

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
  }

  .sliderbtn-left {
    position: absolute;
    width: 50px;
    height: 56px;
    background-color: $textColor;
    left: 10.05%;
    top: 220px;
    z-index: 98;
    cursor: pointer;
    border: 4px solid $textColor;
    transition: background-color 0.2s ease;
    @media screen and (max-width: 991px) {
      top: 147px;
    }
    @media screen and (max-width: 768px) {
      display: none;
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
        top: 10px;
        left: 13px;
      }
    }
  }

  .sliderbtn-right {
    position: absolute;
    width: 50px;
    height: 56px;
    background-color: $textColor;
    right: 10.05%;
    top: 220px;
    z-index: 98;
    cursor: pointer;
    border: 4px solid $textColor;
    transition: background-color 0.2s ease;
    @media screen and (max-width: 991px) {
      top: 147px;
    }
    @media screen and (max-width: 768px) {
      display: none;
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
        top: 10px;
        left: 3px;
      }
    }
  }

  .past-beers-wrapper {
    @include flexCol;
    margin-bottom: 160px;
    @media screen and (max-width: 991px) {
      margin-bottom: 130px;
    }

    .status-heading {
      @include h2Style;
      margin-top: 40px;
      margin-bottom: 40px;
      @media screen and (max-width: 991px) {
        margin-bottom: 20px;
      }
    }

    .status-p {
      @include pStyle;
      width: 50%;
      text-align: left;
      margin-bottom: 60px;
      line-height: 1.5;
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

        .beer-title-wrapper, .beer-description-wrapper {
          @include flexColSt;
          padding: 20px 16px 12px;
          @media screen and (max-width: 991px) {
            padding: 8px 7px 2px;
          }
          @media screen and (max-width: 991px) {
            padding: 5px 7px 2px;
          }
        }

        .beer-title-wrapper {
          border-top: 2px solid $textColor;
          border-bottom: 2px solid $textColor;
          @media screen and (max-width: 768px) {
            padding-top: 5px !important;
          }

          .beer-card-title {
            color: $textColor;
            font-size: 14px;
            font-family: "PoppinsRegular", sans-serif;
            margin-bottom: 0px;
            @media screen and (max-width: 991px) {
              font-size: 12px;
            }
            @media screen and (max-width: 768px) {
              font-size: 10px;
            }
          }

          .beer-card-heading {
            @include h3Style;
            @media screen and (max-width: 991px) {
              font-size: 18px;
            }
            @media screen and (max-width: 768px) {
              font-size: 14px;
            }
          }
        }

        .beer-description-wrapper {

          @media screen and (max-width: 768px) {
            padding: 5px 7px;
          }

          .beer-card-title {
            color: $textColor;
            font-size: 14px;
            font-family: "PoppinsRegular", sans-serif;
            margin-bottom: 0px;
            @media screen and (max-width: 991px) {
              font-size: 12px;
              margin-bottom: 0px;
            }
            @media screen and (max-width: 768px) {
              font-size: 10px;
            }
          }

          .desc-flex {
            height: 100px;
            display: flex;
            flex-flow: column nowrap;
            align-items: flex-start;
            justify-content: space-between;
            @media screen and (max-width: 991px) {
              height: 65px;
            }
            @media screen and (max-width: 768px) {
              height: 80px;
            }

            .beer-card-description {
              @include pStyle;
              margin-top: 5px;
              font-size: 14px;
              line-height: 1.5;
              margin-top: 2px;
              text-align: left;
              @media screen and (max-width: 991px) {
                margin-top: 0;
                font-size: 13px;
                line-height: 1.2;
                margin-bottom: 0px;
                height: 59%;
                text-align: left;
              }
              @media screen and (max-width: 768px) {
                font-size: 12px;
              }
            }

            .alc-percent {
              font-size: 12px;
              @media screen and (max-width: 991px) {
                font-size: 10px;
              }
            }
          }
        }
      }
    }
  }
</style>
