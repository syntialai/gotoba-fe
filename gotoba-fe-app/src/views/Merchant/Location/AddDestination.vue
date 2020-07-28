<template>
  <div class="add-destination h-100">
    <div class="maps position-fixed w-100 h-100">
      <l-map
        class="max-100"
        ref="map"
        :zoom="zoom"
        :center="center"
        :options="{zoomControl: false}"
        @update:zoom="zoomUpdated"
        @update:center="centerUpdated"
        @update:bounds="boundsUpdated"
        @click="setLocationClick"
      >
        <l-tile-layer
          :url="url"
          :attribution="attribution"
        />
        <div class="place-marker" v-if="locationData">
          <l-marker
            v-for="loc of locationData"
            :key="loc.name"
            :lat-lng="[loc.longitude, loc.latitude]"
          >
            <l-icon
              :icon-anchor="[loc.longitude, loc.latitude]"
            >
              <font-awesome-layers class="fa-stack" size="lg">
                <font-awesome-icon
                  icon="comment-alt"
                  :class="'fa-stack-2x font-color-accent-'
                  + (loc.image[1] === 'w'? 'green' : 'orange')"
                ></font-awesome-icon>
                <font-awesome-icon
                  :icon="loc.image[1] === 'w'? 'map-marked-alt' : 'utensils'"
                  size="lg"
                  class="text-white fa-stack-1x fa-inverse"
                  transform="up-2"
                ></font-awesome-icon>
              </font-awesome-layers>
            </l-icon>
          </l-marker>
          <l-marker
            :lat-lng="[location.latitude, location.longitude]"
          ></l-marker>
        </div>
        <l-control-zoom position="topright"></l-control-zoom>
      </l-map>

      <l-control
        position="bottomcenter"
        v-if="location.location !== '' && location.address !== ''"
      >
        <div
          class="set-dest fixed-bottom box-shadow bg-white border-square-20 p-3"
        >
          <div class="set-dest__title">
            <h5>Set Destination Location</h5>
          </div>
          <div class="set-dest__place my-3">
            <card-location
              :name="location.location"
              :address="location.address"
            />
          </div>
          <div class="set-dest__btn">
            <b-button
              block
              class="border-circle custom-btn-primary"
              :disabled="!(location.latitude && location.longitude)"
              @click="setDestinationLocation"
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
import { mapGetters, mapActions } from 'vuex';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import {
  LMap, LTileLayer, LMarker, LControl, LIcon, LControlZoom,
} from 'vue2-leaflet';
import { FontAwesomeLayers } from '@fortawesome/vue-fontawesome';
import api from '../../../api/api';
import CardLocation from '../../../components/User/Itinerary/CardLocation.vue';
import 'leaflet/dist/leaflet.css';

export default {
  name: 'AddDestination',
  components: {
    CardLocation,
    FontAwesomeLayers,
    LMap,
    LMarker,
    LTileLayer,
    LControl,
    LIcon,
    LControlZoom,
  },
  computed: {
    ...mapGetters(['locationData', 'locationSet']),
  },
  created() {
    this.getLocationData();

    // eslint-disable-next-line
    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconUrl: icon,
      iconRetinaUrl: iconRetina,
      shadowUrl: iconShadow,
    });
  },
  data() {
    return {
      zoom: 9,
      center: [2.6, 98.7],
      bounds: null,
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      location: {
        location: '',
        address: '',
        latitude: 2.6,
        longitude: 98.7,
      },
    };
  },
  methods: {
    ...mapActions(['getLocationData', 'setLocation']),
    setLocationClick(e) {
      this.location.latitude = e.latlng.lat;
      this.location.longitude = e.latlng.lng;

      api.ReverseGeocoding(e.latlng.lng, e.latlng.lat)
        .then((res) => {
          this.location.address = res.display_name;
          this.location.location = res.address.name
            || res.address.village
            || res.address.suburb
            || res.address.city;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    setDestinationLocation() {
      this.setLocation(this.location);
      this.$router.replace(`/merchant/${this.route.params.category}/edit`);
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
  watch: {
    locationSet() {
      this.location = { ...this.locationSet };
    },
  },
};
</script>

<style lang="scss" scoped>
.max-100 {
  max-width: 1000px;
}
</style>
