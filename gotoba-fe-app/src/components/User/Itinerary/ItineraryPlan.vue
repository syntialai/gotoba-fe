<template>
  <div class="itinerary-plan bg-white border-square-20 p-3">
    <Timeline :timelines="timelines" />
  </div>
</template>

<script>
import Timeline from '../../Partial/Timeline.vue';

export default {
  name: 'ItineraryPlan',
  components: {
    Timeline,
  },
  data() {
    return {
      timelines: [
        { place: 'Danau Toba', time: '9.30am' },
        { place: 'Jenny\'s Restaurant', time: '12.30pm' },
      ],
    };
  },
};
</script>
