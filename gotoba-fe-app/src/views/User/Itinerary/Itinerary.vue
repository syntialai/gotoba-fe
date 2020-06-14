<template>
  <div class="itinerary p-3">
    <itinerary-plan />

    <this-week-calendar />
  </div>
</template>

<script>
import ItineraryPlan from '../../../components/User/Itinerary/ItineraryPlan.vue';
import ThisWeekCalendar from '../../../components/User/Itinerary/ThisWeekCalendar.vue';

export default {
  name: 'Itinerary',
  components: {
    ItineraryPlan,
    ThisWeekCalendar,
  },
};
</script>
