<template>
  <div class="tour-guide">
    <div class="tour-guide-profiles bg-white p-3 my-3">
      <h6>Available tour guides</h6>
      <div class="tour-guide-group">
        <card-tour-guide
          v-for="tourGuide in tourGuideDatas"
          :key="tourGuide.sku"
          :tourGuide="tourGuide"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CardTourGuide from '../../../components/User/TourGuide/CardTourGuide.vue';

export default {
  name: 'TourGuide',
  components: {
    CardTourGuide,
  },
  computed: {
    ...mapGetters(['tourGuideDatas']),
  },
  created() {
    this.getTourGuideData();
  },
  methods: {
    ...mapActions(['getTourGuideData']),
  },
};
</script>
