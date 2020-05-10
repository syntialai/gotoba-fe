<template>
  <div class="journey-profile">
    <profile-detail :data="journeyData" />
  </div>
</template>

<script>
import ProfileDetail from '../../../components/User/Profile/ProfileDetail.vue';

export default {
  name: 'JourneyProfile',
  components: {
    ProfileDetail,
  },
  computed: {
    journeyData() {
      return this.$store.getters.journeyData;
    },
  },
};
</script>
