<template>
  <div class="add-destination h-100">
    <div class="maps position-fixed w-100 h-100">
      <l-map
        :zoom="zoom"
        :center="center"
        @update:zoom="zoomUpdated"
        @update:center="centerUpdated"
        @update:bounds="boundsUpdated"
        @click="setLocation"
      >
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
            <card-location
              :name="location.name"
              :address="location.address"
            />
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
import api from '../../../api/api';
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
      bounds: null,
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      latLong: [2.6, 98.7],
      locationSelected: null,
      location: {
        name: '',
        address: '',
      },
    };
  },
  methods: {
    setLocation() {
      api.ReverseGeocoding(this.latLong[1], this.latLong[0])
        .then((res) => {
          this.location.address = res.display_name;
          this.location.name = res.address.name || res.address.village;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    zoomUpdated(zoom) {
      this.zoom = zoom;
    },
    centerUpdated(center) {
      this.center = center;
    },
    boundsUpdated(bounds) {
      this.bounds = bounds;
    },
  },
};
</script>
