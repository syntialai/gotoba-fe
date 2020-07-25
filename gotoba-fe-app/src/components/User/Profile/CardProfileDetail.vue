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
            <div class="font-size-14">{{ location }}</div>
            <rating
              v-if="rating"
              :rate="rating"
              :fontSize="10"
            />
          </div>
          <div class="show-on-map">
            <div class="icon-btn">
              <b-button to="" variant="light">
                <font-awesome-icon
                  icon="map-marked-alt"
                  class="icon-gradient"
                ></font-awesome-icon>
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
    location: String,
    rating: Number,
    image: String,
  },
  components: {
    Rating,
  },
  computed: {
    imageUrl() {
      return api.imageUrl(this.image);
    },
  },
};
</script>
