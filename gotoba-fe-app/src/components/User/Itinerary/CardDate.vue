<template>
  <div
    id="card-date"
    :class="'bg-color-'
      + (active? 'primary' : 'white')
      + ' border-black-10 border-square-5 align-center m-2'
    "
  >
    <div :class="{'text-white ': active, 'day font-size-12 semibold pt-1': day}">
      {{ day }}
    </div>
    <div :class="{'text-white': active, 'date font-size-20 bold pb-1': day}">
      {{ date }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardDate',
  props: {
    day: String,
    date: Number,
    active: Boolean,
  },
};
</script>

<style lang="scss">
#card-date {
  padding: 8px 16px;
}
</style>
