<template>
  <div class="itinerary p-3">
    <this-week-calendar class="mb-3" />

    <itinerary-plan class="box-shadow" />
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
