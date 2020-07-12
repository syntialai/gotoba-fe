<template>
  <div class="tour-guide-card">
    <data-card :data="tourGuide" :otherIcon="tourGuide.gender" />
      <!-- gender : male || female -->
  </div>
</template>

<script>
import DataCard from './DataCard.vue';

export default {
  name: 'TourGuideCard',
  components: {
    DataCard,
  },
  props: {
    tourGuide: Object,
  },
};
</script>
