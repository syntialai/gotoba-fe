<template>
  <div class="spot-detail">
    <profile-detail :data="journeyData" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ProfileDetail from '../../../components/User/Profile/ProfileDetail.vue';

export default {
  name: 'SpotDetail',
  components: {
    ProfileDetail,
  },
  computed: {
    ...mapGetters(['journeyData']),
  },
  created() {
    this.getJourneyDataBySku(this.$route.params.sku);
  },
  methods: {
    ...mapActions(['getJourneyDataBySku']),
  },
};
</script>
