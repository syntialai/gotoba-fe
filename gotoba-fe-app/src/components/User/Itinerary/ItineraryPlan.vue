<template>
  <div class="itinerary-plan bg-white border-square-20 p-3">
    <b-overlay
      id="overlay-timeline"
      :show="!schedules"
      variant="light"
      spinner-variant="primary"
      :opacity="0.6"
      blur="2px"
      rounded="sm"
    >
      <timeline
        v-if="todayTimeline"
        :timelines="schedules"
      />

      <div class="empty" v-else>
        <div class="align-center my-2">
          <div class="w-100">
            <img
              src="@/assets/img/illustrate/no-schedule.png"
              alt="No Schedule"
              width="50%"
            >
          </div>
          <div class="text-info mt-2">
            You haven't set your plan for this day!
          </div>
        </div>
      </div>
    </b-overlay>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Timeline from '../../Partial/Timeline.vue';

export default {
  name: 'ItineraryPlan',
  props: {
    schedules: {
      type: Array,
      default: null,
    },
  },
  components: {
    Timeline,
  },
  computed: {
    ...mapGetters(['schedule', 'selectedDate']),
    todayTimeline() {
      const date = new Date(
        this.selectedDate.year,
        this.selectedDate.month,
        this.selectedDate.date,
      ).toString();

      return this.schedule.find((item) => item.date === date);
    },
  },
};
</script>
