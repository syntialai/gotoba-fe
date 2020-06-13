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
          <div class="timeline-place-select font-color-black-87 semibold">
            <b-input-group
              size="sm"
            >
              <b-form-input
                v-model="schedule.destination"
                required
              ></b-form-input>
              <b-input-group-append>
                <b-button class="custom-btn-white">
                  <b-icon icon="chevron-down" />
                </b-button>
              </b-input-group-append>
            </b-input-group>
          </div>
          <div class="timeline-time">
            <b-form-timepicker
              v-model="schedule.time"
              required
              locale="en"
            ></b-form-timepicker>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Timeline',
  props: {
    timelines: Array,
    add: {
      type: Boolean,
      default: false,
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
  method: {
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

<style lang="scss">
@import '@/assets/scss/index';
</style>
