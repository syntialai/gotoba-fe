<template>
  <router-link :to="goToTourGuideDetails">
    <div class="card-home-long bg-white box-shadow mb-3">
      <div class="d-flex p-3">
        <div class="image">
          <b-img :src="imageUrl" :alt="tourGuide.sku" width="150" height="100" />
        </div>
        <div class="card-home__info pl-3">
          <div class="item__name font-color-black-87 semibold d-block">
            {{ tourGuide.name }}
          </div>
          <div class="gender-age ml-1">
            <font-awesome-icon
              :icon="tourGuide.gender"
              class="icon-gradient mr-1"
            ></font-awesome-icon>
            <span class="ml-2 age font-size-14 font-color-black-60">
              {{ tourGuide.age }}
            </span>
          </div>
          <div class="location">
            <font-awesome-icon
              icon="street-view"
              class="icon-gradient"
            ></font-awesome-icon>
            <span class="ml-2 age font-size-14 font-color-black-60">
              {{ tourGuide.location }}
            </span>
          </div>
          <div class="rating d-flex align-items-center">
            <rating
              :rate="tourGuide.rating"
              :fontSize="14"
            />
            <span class="ml-2 font-color-black-60">
              ({{ tourGuide.rating }})
            </span>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
import Rating from '../../Partial/Rating.vue';
import api from '../../../api/api';

export default {
  name: 'CardTourGuide',
  props: {
    tourGuide: Object,
  },
  components: {
    Rating,
  },
  computed: {
    imageUrl() {
      return api.imageUrl(this.tourGuide.image);
    },
    goToTourGuideDetails() {
      return `/tour-guide/${this.tourGuide.sku}`;
    },
  },
};
</script>

<style lang="scss" scoped>
img {
  width: 120px;
  height: 90px;

  @media screen and (min-width: 425px) {
    width: 120px;
    height: 105px;
  }

  @media screen and (min-width: 768px) {
    width: 160px;
    height: 120px;
  }
}
</style>
