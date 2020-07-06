<template>
  <div class="add-destination h-100">
    <div class="maps position-fixed w-100 h-100">
      <l-map :zoom="zoom" :center="center">
        <l-tile-layer :url="url"></l-tile-layer>
        <div class="restaurant-marker">
          <l-marker
            :lat-lng="latLong"
          ></l-marker>
        </div>
      </l-map>

      <l-control position="bottomcenter">
        <div
          class="set-dest fixed-bottom box-shadow bg-white border-square-20 p-3"
        >
          <div class="set-dest__title">
            <h5>Set Destination Location</h5>
          </div>
          <div class="set-dest__place my-3">
            <card-location name="Danau toba" address="Jl.csa" />
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
      </l-control>
    </div>
  </div>
</template>

<script>
import {
  LMap, LTileLayer, LMarker, LControl,
} from 'vue2-leaflet';
import CardLocation from '../../../components/User/Itinerary/CardLocation.vue';
import 'leaflet/dist/leaflet.css';

export default {
  name: 'AddDestination',
  components: {
    CardLocation,
    LMap,
    LMarker,
    LTileLayer,
    LControl,
  },
  data() {
    return {
      zoom: 10,
      center: [2.6, 98.7],
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      latLong: [2.6, 98.7],
      locationSelected: null,
    };
  },
};
</script>
