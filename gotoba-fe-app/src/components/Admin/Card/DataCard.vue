<template>
  <div class="data-card">
    <b-card class="border-gray-young mt-2">
      <b-row no-gutters>
        <b-col md="8">
          <b-card-img
            v-if="data.image"
            :src="imageUrl"
            :alt="data.location"
            width="100%"
            :left="true"
          ></b-card-img>
          <b-card-img v-else blank-src>
            <b-avatar variant="primary" :text="initialName"></b-avatar>
          </b-card-img>
        </b-col>
        <b-col md="4">
          <b-card-body class="m-3">
            <b-card-sub-title class="bold font-color-blue-secondary mb-2">
              {{ data.name }}
            </b-card-sub-title>

            <div class="other d-flex align-items-center mb-2">
              <div class="other-icon icon-gradient">
                <font-awesome-icon :icon="otherIcon"></font-awesome-icon>
              </div>
              <div class="other-text pl-3 font-color-black-60">
                {{ data.other }}
              </div>
            </div>

            <div class="location d-flex align-items-center">
              <div class="location-icon icon-gradient">
                <font-awesome-icon icon="map-marker-alt"></font-awesome-icon>
              </div>
              <div class="location-text pl-3 font-color-black-60">
                {{ data.location }}
              </div>
            </div>

            <div class="rating d-flex align-items-center" v-if="data.rating">
              <rating
                :rate="data.rating"
                :fontSize="14"
                class="pr-1"
              />
              <div class="rate-number semibold font-color-black-60">
                ({{ data.rating }})
              </div>
            </div>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import api from '../../../api/api';
import Rating from '../../Partial/Rating.vue';

export default {
  name: 'DataCard',
  props: {
    data: Object,
    otherIcon: String,
  },
  components: {
    Rating,
  },
  computed: {
    imageUrl() {
      return api.imageUrl(this.data.image);
    },
    initialName() {
      return this.data.name.split(' ').map((name) => name[0]).join('');
    },
  },
};
</script>
