<template>
  <div class="this-week-calendar box-shadow border-square-20 bg-white">
    <div
      class="days d-flex justify-content-around p-3"
    >
      <b-button-group
        vertical
        v-for="item in week"
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
          :class="'font-size-14 p-2 semibold ' +
            (item.active? 'custom-btn-primary' : 'btn-outline')
          "
          @click="setActive(item.date)"
        >
          {{ `0${item.date}`.slice(-2) }}
        </b-button>
      </b-button-group>
    </div>
  </div>
</template>

<script>
import { toFullDay } from '../../../utils/filter';

export default {
  name: 'ThisWeekCalendar',
  data() {
    return {
      week: [],
    };
  },
  created() {
    this.days();
  },
  methods: {
    days() {
      const today = new Date();
      const week = [];

      for (let i = 0; i < 7; i += 1) {
        week.push({
          day: toFullDay(today.getDay() % 7).substr(0, 2),
          date: today.getDate(),
          active: i === 0,
        });
        today.setDate(today.getDate() + 1);
      }

      this.week = week;
    },
    setActive(date) {
      const changeWeek = this.week.map((item) => ({
        day: item.day,
        date: item.date,
        active: item.date === date,
      }));

      this.week = changeWeek;
    },
  },
};
</script>
