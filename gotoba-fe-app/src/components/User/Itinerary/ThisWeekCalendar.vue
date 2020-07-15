<template>
  <div class="this-week-calendar box-shadow border-square-20 bg-white">
    <div
      class="days d-flex justify-content-around p-3"
    >
      <b-button-group
        vertical
        v-for="item in days"
        :key="item.day"
      >
        <b-button
          variant="light"
          disabled
          class="font-size-14 p-2"
        >
          {{ item.day }}
        </b-button>
        <b-button
          pill
          :variant="item.active? 'primary' : 'secondary'"
          :class="'font-size-14 p-2 ' +
            (item.active? 'custom-btn-primary' : 'bg-white font-color-black-60')
          "
        >
          {{ `0${item.date}`.slice(-2) }}
        </b-button>
      </b-button-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThisWeekCalendar',
  data() {
    return {
      days: [
        { day: 'Mo', date: 28, active: true },
        { day: 'Tu', date: 29, active: false },
        { day: 'We', date: 30, active: false },
        { day: 'Th', date: 31, active: false },
        { day: 'Fr', date: 1, active: false },
        { day: 'Sa', date: 2, active: false },
        { day: 'Su', date: 3, active: false },
      ],
    };
  },
};
</script>
