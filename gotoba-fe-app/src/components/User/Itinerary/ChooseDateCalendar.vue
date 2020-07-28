<template>
  <div class="choose-date-calendar bg-white p-3">
    <div class="month-picked semibold font-size-20 w-100 d-flex justify-content-center">
      <div class="month-year pr-3">
        {{ toMonthYear(toDate) }}
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
          class="p-2"
        >
          <b-form-datepicker
            v-model="dateSelected"
            class="m-0 p-0 w-100"
            :hide-header="true"
            :min="new Date()"
            locale="en-US"
            v-if="showCalendar"
          ></b-form-datepicker>
        </b-popover>
      </div>
    </div>

    <div id="date-choose" class="d-flex overflow-auto mt-3">
      <card-date
        v-for="date in selectedDayOfMonth"
        :key="date"
        :date="date"
        :day="getDay(dateSelected.getFullYear(), dateSelected.getMonth(), date).substr(0, 3)"
        :active="isSelectedDate(date)"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { toFullMonth, toFullDay } from '../../../utils/filter';
import CardDate from './CardDate.vue';

export default {
  name: 'ChooseDateCalendar',
  data() {
    return {
      showCalendar: false,
    };
  },
  components: {
    CardDate,
  },
  computed: {
    ...mapGetters(['selectedDate']),
    selectedDayOfMonth() {
      const date = this.toDate;
      const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

      return daysInMonth;
    },
    toDate() {
      return new Date(this.selectedDate.year, this.selectedDate.month, this.selectedDate.date);
    },
    dateSelected: {
      get() {
        return this.toDate;
      },
      set(value) {
        this.setSelectedDate(new Date(value));
        this.scrollToDate();
      },
    },
  },
  methods: {
    ...mapActions(['setSelectedDate']),
    toFullMonth,
    getDay(year, month, day) {
      return toFullDay(new Date(year, month, day).getDay());
    },
    toMonthYear(date) {
      return `${toFullMonth(date.getMonth())}, ${date.getFullYear()}`;
    },
    isSelectedDate(date) {
      return date === this.selectedDate.date;
    },
    scrollToDate() {
      const elm = document.getElementById('date-choose');
      const cardDate = document.getElementsByClassName('card-date');
      let scroll = 0;

      for (let i = 0; i < this.selectedDate.date - 1; i += 1) {
        scroll += cardDate[i].clientWidth + 8;
      }

      elm.scrollTo({
        top: 0,
        left: scroll,
        behavior: 'smooth',
      });
    },
  },
  mounted() {
    this.scrollToDate();
  },
};
</script>
