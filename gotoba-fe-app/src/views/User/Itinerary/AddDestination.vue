<template>
  <div class="add-destination h-100">
    <div class="maps position-fixed w-100 h-100">
      <l-map
        :zoom="zoom"
        :center="center"
        :options="{zoomControl: false}"
        @update:zoom="zoomUpdated"
        @update:center="centerUpdated"
        @update:bounds="boundsUpdated"
        @click="setLocation"
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
            @click="setSavedLocation(loc)"
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
        </div>
        <l-control-zoom position="topright"></l-control-zoom>
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
    ...mapGetters(['locationData']),
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
      latLong: [2.6, 98.7],
      locationSelected: null,
      location: {
        name: '',
        address: '',
      },
    };
  },
  methods: {
    ...mapActions(['getLocationData', 'setLocationKeyword']),
    setLocation(e) {
      api.ReverseGeocoding(e.latlng.lng, e.latlng.lat)
        .then((res) => {
          this.location.address = res.display_name;
          this.location.name = res.address.name || res.address.village;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    setSavedLocation(loc) {
      this.location = {
        name: loc.name,
        address: loc.address,
      };
    },
    setDestinationLocation() {
      this.setLocationKeyword(`${this.location.name}: ${this.location.address}`);
      this.$router.replace('/itinerary/add');
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
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
