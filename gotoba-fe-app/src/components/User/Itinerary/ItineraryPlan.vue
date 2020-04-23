<template>
  <div class="itinerary-plan bg-white border-square-20 p-3">
    <VTimelinePro updates="updates" />
  </div>
</template>

<script>
import VTimelinePro from 'vue-timeline-pro';

export default {
  name: 'ItineraryPlan',
  components: {
    VTimelinePro,
  },
  data() {
    return {
      updates: [
        {
          icon: '/awesomeimage.png',
          title: 'My awesome title',
          description: 'Lorem ...',
          date: new Date(),
          url: 'https://wakeupyouneedtomakemoney...',
        },
      ],
    };
  },
};
</script>
