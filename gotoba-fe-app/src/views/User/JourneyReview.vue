<template>
  <div class="journey-review">
    <NavigationBack title="Reviews" />

    <ReviewDetailGroup :data="journeyData" />
  </div>
</template>

<script>
import NavigationBack from '@/components/Partial/NavigationBack.vue';
import ReviewDetailGroup from '@/components/User/ReviewDetailGroup.vue';

export default {
  name: 'JourneyReview',
  computed: {
    journeyData() {
      return this.$store.getters.journeyData;
    },
  },
};
</script>
