<template>
  <!-- TODO extract away mapbox-gl access-token -->
  <div id="map" class="newMap">
    <mapbox
    v-on:map-load="handleMapLoad"
    :access-token="mapToken"
    :map-options="mapOptions">
    </mapbox>
  </div>
</template>

<script>
import Mapbox from 'mapbox-gl-vue'
export default {
  components: {
    Mapbox
  },
  data() {
    return {
      mapToken: 'pk.eyJ1IjoicnVucGl4ZWxydW4iLCJhIjoiY2pjcGZ6anNzMXB2dzJ3bzd2ejM3Mzc0eiJ9.5wJ30sHh6E-SbMEyZdjnvA',
      mapOptions: {
        style: 'mapbox://styles/runpixelrun/cjcpqhmkx4i7b2rqxhmf01vme',
        center: [151.207100, -33.887675],
        zoom: 14,
        minzoom: 1.3,
        dragPan: true
      }
      // geoLocateControl: {
      //   show: true,
      //   position: 'top-left'
      // },
      // scaleControl: {
      //   show: true,
      //   position: 'top-left'
      // },
      // fullscreenControl: {
      //   show: true,
      //   position: 'top-left'
      // }
    }
  },
  mounted() {},
  methods: {
    handleMapLoad(map) {
      var marker = new mapboxgl.Marker()
      marker.setLngLat([151.203401, -33.889682])
      marker.addTo(map)
      var x = document.getElementsByClassName('mapboxgl-marker')
      x[0].childNodes[0].childNodes[0].childNodes[1].setAttribute('fill', '#F37E2C')
    }
  }
}
</script>

<style lang="scss">
  .marker {
    height: 80px;
    width: 80px;
    background: red;
  }
  #map {
    width: 80%;
    height: 550px;
    @media screen and (max-width: 991px) {
      height: 400px;
    }
    @media screen and (max-width: 768px) {
      height: 340px;
      width: 90%;
    }
    @media screen and (max-width: 570px) {
      height: 300px;
    }

    .mapboxgl-canvas-container {
      width: 100%;
      height: 100%;

      .mapboxgl-canvas {
        top: 0;
        left: 0;
        border: 4px solid $textColor;
      }
    }

    .mapboxgl-ctrl, .mapboxgl-ctrl-attrib {
      display: none;
    }

    .mapboxgl-ctrl-logo {
      display: none;
    }
  }
</style>
