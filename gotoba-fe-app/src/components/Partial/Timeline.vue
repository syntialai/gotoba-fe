<template>
  <div class="timeline">
    <ul class="timeline">
      <li
        v-for="timeline in getTimeline"
        :key="timeline.destination"
        class="active"
      >
        <div class="d-flex justify-content-between w-100">
          <div class="timeline-place font-color-black-87 semibold">
            {{ timeline.destination }}
          </div>
          <div class="timeline-time">
            {{ timeline.formattedTime }}
          </div>
        </div>
      </li>
      <li v-if="add">
        <div class="d-flex justify-content-between w-100">
          <div class="timeline-place-select font-color-black-87 semibold w-75">
            <b-input-group
              size="sm" class="w-100 dropdown"
            >
              <b-form-input
                v-model="location"
                debounce="1000"
                data-toggle="dropdown"
                required
              ></b-form-input>
              <select-destination-autocomplete />
            </b-input-group>
          </div>
          <div class="timeline-time">
            <b-form-timepicker
              v-model="time"
              @context="onContext"
              required
              locale="en"
              size="sm"
            ></b-form-timepicker>
          </div>
          <div class="add">
            <b-button
              pill
              size="sm"
              class="custom-btn-primary"
              @click="addSchedule"
            >ADD</b-button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
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
  },
  computed: {
    ...mapGetters(['locationKeyword', 'newSchedule', 'selectedDate']),
    location: {
      get() {
        return this.locationKeyword;
      },
      set(value) {
        this.setLocationKeyword(value);
      },
    },
    getTimeline() {
      return [...this.timelines, ...this.newSchedule].sort((a, b) => b.time < a.time);
    },
  },
  data() {
    return {
      time: null,
      schedules: [],
      context: null,
    };
  },
  methods: {
    ...mapActions(['setLocationKeyword', 'addNewSchedule']),
    addSchedule() {
      const data = {
        destination: this.locationKeyword,
        time: new Date(
          this.selectedDate.date,
          this.selectedDate.month,
          this.selectedDate.year,
          this.context.hours,
          this.context.minutes,
          this.context.seconds,
          0,
        ),
        formattedTime: this.context.formatted,
      };

      if (data.destination === null || data.time === null) {
        return;
      }

      this.addNewSchedule(data);
      this.time = null;
      this.context = null;
      this.setLocationKeyword('');
    },
    onContext(context) {
      this.context = context;
    },
  },
};
</script>
