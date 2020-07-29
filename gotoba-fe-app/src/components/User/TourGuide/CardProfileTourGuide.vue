<template>
  <div class="card-profile-tour-guide p-3 bg-white">
    <b-media vertical-align="center">
      <template v-slot:aside>
        <b-avatar
          :src="imageUrl"
          size="72"
        ></b-avatar>
      </template>
      <div class="user-info">
        <div class="user-name bold font-size-20">{{ tourGuide.name }}</div>
        <div class="user-location font-color-black-60">{{ tourGuide.location }}</div>
      </div>
    </b-media>
  </div>
</template>

<script>
import api from '../../../api/api';

export default {
  name: 'CardProfileTourGuide',
  props: {
    tourGuide: Object,
  },
  computed: {
    imageUrl() {
      return api.imageUrl(this.tourGuide.image);
    },
  },
};
</script>
