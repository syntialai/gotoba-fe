<template>
  <div class="itinerary p-3">
    <itinerary-plan />

    <this-week-calendar />
  </div>
</template>

<script>
import ItineraryPlan from './ItineraryPlan.vue';
import ThisWeekCalendar from './ThisWeekCalendar.vue';

export default {
  name: 'Itinerary',
  components: {
    ItineraryPlan,
    ThisWeekCalendar,
  },
};
</script>
