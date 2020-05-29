<template>
  <div class="add-destination h-100">
    <div class="maps position-fixed w-100 h-100">
      <l-map :zoom="zoom" :center="center">
        <l-tile-layer :url="url"></l-tile-layer>
        <l-marker :lat-lng="latLong"></l-marker>
      </l-map>
    </div>

    <div
      v-if="locationSelected"
      class="set-dest fixed-bottom box-shadow border-square-20 p-3"
    >
      <div class="set-dest__title font-size-20 bold">
        Set Destination Location
      </div>
      <div class="set-dest__place mt-3">
        <card-location name="" address="" />
      </div>
      <div class="set-dest__btn">
        <b-button
          block
          class="border-circle custom-btn-primary"
        >
          Set Destination Location
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
// import L from 'leaflet';
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import CardLocation from '../../../components/User/Itinerary/CardLocation.vue';
import 'leaflet/dist/leaflet.css';

export default {
  name: 'AddDestination',
  components: {
    CardLocation,
    LMap,
    LMarker,
    LTileLayer,
    // L,
  },
  data() {
    return {
      zoom: 13,
      center: [47.413220, -1.219482],
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      latLong: [47.413220, -1.209482],
      locationSelected: null,
    };
  },
};
</script>
