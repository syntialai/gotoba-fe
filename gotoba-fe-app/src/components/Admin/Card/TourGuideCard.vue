<template>
  <div class="tour-guide-card">
    <a :href="'/admin/tour-guide/' + tourGuide.sku">
      <data-card :data="tourGuide" :otherIcon="tourGuide.gender" />
      <!-- gender : male || female -->
    </a>
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
