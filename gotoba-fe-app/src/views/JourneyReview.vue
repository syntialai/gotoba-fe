<template>
  <div class="journey-review">
    <NavigationBack title="Reviews" />

    <ReviewDetailGroup :data="journeyData" />
  </div>
</template>

<script>
import NavigationBack from '@/components/NavigationBack.vue';
import ReviewDetailGroup from '@/components/ReviewDetailGroup.vue';

export default {
  name: 'JourneyReview',
  computed: {
    journeyData() {
      return this.$store.getters.journeyData;
    },
  },
};
</script>