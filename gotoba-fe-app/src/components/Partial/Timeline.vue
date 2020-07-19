<template>
  <div class="timeline">
    <ul class="timeline">
      <li
        v-for="timeline in timelines"
        :key="timeline.place"
        class="active"
      >
        <div class="d-flex justify-content-between w-100">
          <div class="timeline-place font-color-black-87 semibold">
            {{ timeline.place }}
          </div>
          <div class="timeline-time">
            {{ timeline.time }}
          </div>
        </div>
      </li>
      <li v-if="add" @click="addSchedule">
        <div class="d-flex justify-content-between w-100">
          <div class="timeline-place-select font-color-black-87 semibold w-50">
            <b-input-group
              size="sm" class="w-100"
            >
              <b-form-input
                v-model="schedule.destination"
                list="location-list"
                required
              ></b-form-input>
              <select-destination-autocomplete
                v-if="locationList"
                :locationList="locationList"
                :searchKeywords="schedule.destination"
              />
            </b-input-group>
          </div>
          <div class="timeline-time">
            <b-form-timepicker
              v-model="schedule.time"
              required
              locale="en"
              size="sm"
            ></b-form-timepicker>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import SelectDestinationAutocomplete from '../User/Itinerary/SelectDestinationAutocomplete.vue';

export default {
  name: 'Timeline',
  components: {
    SelectDestinationAutocomplete,
  },
  props: {
    timelines: Array,
    add: {
      type: Boolean,
      default: false,
    },
    locationList: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      schedule: {
        destination: null,
        time: null,
      },
      schedules: [],
    };
  },
  methods: {
    addSchedule() {
      const data = this.schedule;

      if (data.destination.trim() === null || data.time === null) {
        return;
      }

      this.schedules.push(data);
      this.schedule = {
        destination: null,
        time: null,
      };
    },
  },
};
</script>
