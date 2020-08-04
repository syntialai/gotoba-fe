<template>
  <div class="timeline">
    <ul class="timeline" v-if="sortedTimeline">
      <li
        v-for="(timeline, index) in sortedTimeline"
        :key="index"
        :class="{ 'active': index === sortedTimeline.length - 1 }"
      >
        <div class="d-flex justify-content-between w-100">
          <div class="timeline-place font-color-black-87 semibold">
            {{ timeline.destination }}
          </div>
          <div class="timeline-time">
            {{ timeline.time }}
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
import { sortTime } from '../../utils/filter';
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
    ...mapGetters([
      'locationKeyword',
      'newSchedule',
      'selectedDate',
    ]),
    location: {
      get() {
        return this.locationKeyword;
      },
      set(value) {
        this.setLocationKeyword(value);
      },
    },
    date() {
      return new Date(
        this.selectedDate.year,
        this.selectedDate.month,
        this.selectedDate.date,
      ).toString();
    },
    getSavedTimeline() {
      const timeline = this.timelines.find((item) => item.date === this.date);

      if (timeline) {
        return timeline.schedule;
      }
      return [];
    },
    getTimeline() {
      const selected = this.newSchedule.find((item) => item.date === this.date);

      if (selected) {
        return [
          ...this.getSavedTimeline,
          ...selected.schedule,
        ];
      }

      return this.getSavedTimeline;
    },
    sortedTimeline() {
      return sortTime(this.getTimeline);
    },
  },
  data() {
    return {
      time: null,
      context: null,
    };
  },
  methods: {
    ...mapActions([
      'setLocationKeyword',
      'addNewSchedule',
      'setLocationOpen',
    ]),
    addSchedule() {
      const data = {
        date: this.date,
        schedule: [
          {
            destination: this.locationKeyword,
            time: this.context.formatted,
          },
        ],
      };

      if (this.locationKeyword === null || this.context.formatted === null) {
        return;
      }

      this.addNewSchedule(data);

      this.time = null;
      this.context = null;
      this.setLocationKeyword('');
      this.setLocationOpen(true);
    },
    onContext(context) {
      this.context = context;
    },
  },
};
</script>
