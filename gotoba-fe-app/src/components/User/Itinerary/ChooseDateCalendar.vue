<template>
  <div class="choose-date-calendar bg-white p-3">
    <div class="month-picked semibold font-size-20 w-100 d-flex justify-content-center">
      <div class="month-year pr-3">
        {{ toMonthYear(new Date(value)) }}
      </div>
      <div class="choose-month">
        <font-awesome-icon
          id="show-date"
          icon="chevron-down"
          @click="showCalendar = !showCalendar"
        />
        <b-popover
          target="show-date"
          triggers="click"
          placement="bottomleft"
        >
          <b-calendar
            class="m-auto pt-2"
            v-model="value"
            :hide-header="true"
            :min="Date()"
            v-if="showCalendar"
          ></b-calendar>
        </b-popover>
      </div>
    </div>

    <div class="date-choose d-flex justify-content-around overflow-auto mt-3">
      <card-date
        v-for="date in 29"
        :key="date"
        :date="date"
        :day="toFullDay(date % 7).substr(0, 3)"
        :active="true"
      />
    </div>
  </div>
</template>

<script>
import { toFullMonth, toFullDay } from '@/utils/filter';
import CardDate from './CardDate.vue';

export default {
  name: 'ChooseDateCalendar',
  data() {
    return {
      value: Date(),
      showCalendar: false,
    };
  },
  components: {
    CardDate,
  },
  methods: {
    toFullDay,
    toFullMonth,
    toMonthYear(date) {
      return `${toFullMonth(date.getMonth())}, ${date.getFullYear()}`;
    },
  },
};
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
  display: none;
}
</style>
