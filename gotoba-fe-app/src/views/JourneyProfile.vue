<template>
  <div class="journey-profile">
    <NavigationBack :title="journeyData.name" />

    <ProfileDetail :data="journeyData" />
  </div>
</template>

<script>
import NavigationBack from '@/components/NavigationBack.vue';
import ProfileDetail from '@/components/ProfileDetail.vue';

export default {
  name: 'JourneyProfile',
  components: {
    NavigationBack,
    ProfileDetail,
  },
  computed: {
    journeyData() {
      return this.$store.getters.journeyData;
    },
  },
};
</script>