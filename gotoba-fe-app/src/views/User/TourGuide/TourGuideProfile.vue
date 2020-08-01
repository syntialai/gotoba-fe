<template>
  <div class="tour-guide-profile">
    <div v-if="tourGuideData">
      <card-profile-tour-guide :tourGuide="tourGuideData" class="my-2" />

      <about-tour-guide-detail :data="tourGuideData" class="mt-1 mb-2" />
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
              Tour guide can't be found.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AboutTourGuideDetail from '../../../components/User/TourGuide/AboutTourGuideDetail.vue';
import CardProfileTourGuide from '../../../components/User/TourGuide/CardProfileTourGuide.vue';

export default {
  name: 'TourGuideProfile',
  components: {
    AboutTourGuideDetail,
    CardProfileTourGuide,
  },
  computed: {
    ...mapGetters(['tourGuideData', 'tourGuideReview']),
  },
  created() {
    this.getTourGuideBySku(this.$route.params.sku);
  },
  methods: {
    ...mapActions(['getTourGuideBySku', 'getTourGuideReview']),
  },
};
</script>
