<template>
  <div class="itinerary-plan bg-white border-square-20 p-3">
    <b-overlay
      id="overlay-timeline"
      :show="schedule"
      variant="light"
      spinner-variant="primary"
      :opacity="0.6"
      blur="2px"
      rounded="sm"
    >
      <timeline
        v-if="schedule && schedule.length > 0"
        :timelines="schedule"
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
import Timeline from '../../Partial/Timeline.vue';

export default {
  name: 'ItineraryPlan',
  props: {
    schedule: {
      type: Array,
      default: null,
    },
  },
  components: {
    Timeline,
  },
};
</script>
