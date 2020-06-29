<template>
  <div class="journey-profile">
    <profile-detail :data="journeyDataBySku" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ProfileDetail from '../../../components/User/Profile/ProfileDetail.vue';

export default {
  name: 'JourneyProfile',
  components: {
    ProfileDetail,
  },
  computed: {
    ...mapGetters(['journeyDataBySku']),
  },
  created() {
    this.getJourneyDataBySku(this.$route.params.sku);
  },
  methods: {
    ...mapActions(['getJourneyDataBySku']),
  },
};
</script>
