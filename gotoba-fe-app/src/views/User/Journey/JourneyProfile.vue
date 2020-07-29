<template>
  <div class="journey-profile">
    <div v-if="journeyDataBySku">
      <profile-detail
        :data="journeyDataBySku"
        :promotions="[]"
      />
    </div>
    <div v-else class="vh-100 d-flex">
      <div class="align-self-center align-center">
        <div class="image-no-data">
          <img
            src="@/assets/img/illustrate/no-data.png"
            alt="No-Data"
            width="50%"
          >
        </div>
        <div class="info-no-data m-3">
          <div class="font-color-black-60">
            <div class="semibold">
              The journey can't be found.
            </div>
          </div>
        </div>
      </div>
    </div>
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
