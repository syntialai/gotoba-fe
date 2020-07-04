<template>
  <div class="tour-guide">
    <div class="tour-guide-profiles bg-white p-3 my-3">
      <h6>Available tour guides</h6>
      <div class="tour-guide-group">
        <card-home-long
          v-for="tourGuide in tourGuideDatas"
          :key="tourGuide.sku"
          :data="tourGuide"
          @click="goToProfile(tourGuide.sku)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CardHome from '../../../components/User/Home/CardHome.vue';
import CardHomeLong from '../../../components/User/Home/CardHomeLong.vue';

export default {
  name: 'TourGuide',
  components: {
    CardHome,
    CardHomeLong,
  },
  computed: {
    ...mapGetters(['tourGuideDatas']),
  },
  methods: {
    goToProfile(tourGuideSku) {
      this.$router.push(`/tour-guide/${tourGuideSku}`);
    },
  },
};
</script>
