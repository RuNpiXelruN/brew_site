<template>
  <div class="next-date-wrapper">
    <h2 class="status-heading">Next Brew Date</h2>
    <p class="status-p">Learn the voodoo science behind your favourite IPA and have a sneaky taste of our *new* limited edition brews at our next meetup.</p>

    <div class="map-wrapper">

      <div class="map-info-wrapper">
        <div class="info-location">
          <span class="beer-card-title">Location</span>
          <div class="location-name"><img id="loc-icon" class="location-icon" src="/src/assets/img/Marker.png" /><span class="courtyard">The Courtyard</span></div>
        </div>
        <div class="time-details">
          <span class="beer-card-title">Date &amp; Time</span>

          <!-- TODO make next date and time dynamic -->
          <p class="beer-card-description">
            Fri 20 February 2018 <br>
            5:00 PM - 6:00 PM
          </p>
        </div>

        <div class="joinus-cta">
          <h3>Join us at Happy Hour</h3>
        </div>
      </div>

      <mf-map />
    </div>
  </div>
</template>

<script>

import MfMap from '@/components/MfMap.vue'
export default {
  components: {
    MfMap
  },
  props: [
    'authed'
  ],
  data() {
    return {}
  },
  watch: {}
}
</script>

<style lang="scss">
  .next-date-wrapper {
    @include flexCol;

    .status-heading {
      @include h2Style;
      margin-bottom: 40px;
      @media screen and (max-width: 991px) {
        font-size: 32px;
        margin-bottom: 20px;
      }
    }

    .status-p {
      @include pStyle;
      width: 50%;
      margin-bottom: 80px;
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

    .map-wrapper {
      margin-bottom: 220px;
      position: relative;
      @include flexRowC;
      max-width: 1600px;

      @media screen and (max-width: 991px) {
        margin-bottom: 140px;
      }

      .map-info-wrapper {
        @include flexColSt;
        position: absolute;
        background-color: $bgColor;
        width: 40%;
        border: 4px solid;
        right: 10%;
        bottom: 0;
        z-index: 99;
        @media screen and (max-width: 768px) {
          right: 5%;
        }

        .info-location {
          padding: 20px 16px 16px;
          text-align: left;
          width: 100%;
          border-bottom: 2px solid $textColor;
          @media screen and (max-width: 991px) {
            padding: 10px 12px 10px;
          }
          @media screen and (max-width: 768px) {
            padding: 4px 12px 8px;
          }

          .beer-card-title {
            color: $textColor;
            font-size: 14px;
            font-family: "PoppinsRegular", sans-serif;
            margin-bottom: 6px;
            @media screen and (max-width: 991px) {
              font-size: 12px;
            }
            @media screen and (max-width: 768px) {
              font-size: 10px;
            }
          }

          .location-icon {
            vertical-align: middle !important;
            margin-right: 10px;
            margin-bottom: 4px !important;
          }

          .courtyard {
            @include pStyle;
            padding-right: 3px;
            border-bottom: 1px solid $textColor;
            @media screen and (max-width: 991px) {
              font-size: 16px;
            }
            @media screen and (max-width: 768px) {
              font-size: 14px;
            }
          }
        }

        .time-details {
          padding: 20px 16px 16px;
          text-align: left;
          width: 100%;
          @media screen and (max-width: 991px) {
            padding: 10px 12px 10px;
          }
          @media screen and (max-width: 768px) {
            padding: 4px 12px 6px;
          }

          .beer-card-title {
            color: $textColor;
            font-size: 14px;
            font-family: "PoppinsRegular", sans-serif;
            margin-bottom: 6px;
            @media screen and (max-width: 991px) {
              font-size: 12px;
            }
            @media screen and (max-width: 768px) {
              font-size: 10px;
            }
          }

          .beer-card-description {
            @include pStyle;
            margin-top: 5px;
            @media screen and (max-width: 991px) {
              margin-top: 0;
              font-size: 14px;
              line-height: 1.5;
              margin-bottom: 5px;
            }
            @media screen and (max-width: 768px) {
              font-size: 12px;
            }
            @media screen and (max-width: 570px) {
              font-size: 10px;
            }
          }
        }

        .joinus-cta {
          @include h3Style;
          width: 100%;
          color: white;
          background-color: $textColor;
          padding: 30px 0;
          @media screen and (max-width: 991px) {
            padding: 10px 0 4px;
            font-size: 18px;
          }
          @media screen and (max-width: 768px) {
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
