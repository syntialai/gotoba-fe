<template>
  <div class="tour-guide-card-group">
    <b-card-group>
      <tour-guide-card
        v-for="tourGuide of tourGuideRange"
        :key="tourGuide.sku"
        :tourGuide="tourGuide"
      />
    </b-card-group>
  </div>
</template>

<script>
import TourGuideCard from '../Card/TourGuideCard.vue';

export default {
  name: 'TourGuideCardGroup',
  components: {
    TourGuideCard,
  },
  props: {
    tourGuides: Array,
    start: Number,
    end: Number,
  },
  computed: {
    tourGuideRange() {
      return this.tourGuides.slice(this.start - 1, this.end);
    },
  },
};
</script>
