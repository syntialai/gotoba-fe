<template>
  <div class="card-profile-detail bg-white p-3">
    <b-card
      :img-src="imageUrl"
      img-alt="Card image"
      img-left
      class="border-none object-fit_cover"
      img-width="80"
      img-height="80"
    >
      <b-card-text class="ml-3">
        <div class="d-flex justify-content-between">
          <div class="info">
            <h6 class="font-color-black-87">{{ name }}</h6>
            <div class="font-size-14">{{ address }}</div>
            <div class="rating d-flex align-items-center" v-if="rating">
              <rating
                :rate="rating"
                :fontSize="12"
              />
              <div class="pl-1">({{ rating }})</div>
            </div>
          </div>
          <div class="buttons d-flex flex-column justify-content-between">
            <div class="icon-btn">
              <b-button :to="showOnMap" variant="light">
                <font-awesome-icon
                  icon="map-marked-alt"
                  class="icon-gradient"
                ></font-awesome-icon>
              </b-button>
            </div>
            <div class="edit-btn" v-if="add">
              <b-button to="/merchant/bistro/edit" variant="light">
                <p class="icon-gradient m-0">
                  <b-icon icon="pencil-square"></b-icon>
                </p>
              </b-button>
            </div>
          </div>
        </div>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import api from '../../../api/api';
import Rating from '../../Partial/Rating.vue';

export default {
  name: 'CardProfileDetail',
  props: {
    name: String,
    address: String,
    rating: Number,
    image: String,
    add: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Rating,
  },
  computed: {
    imageUrl() {
      return api.imageUrl(this.image);
    },
    showOnMap() {
      return `${this.$route.path}/show-on-map`;
    },
  },
};
</script>
