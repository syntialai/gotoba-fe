<template>
  <div
    id="card-date"
    :class="'bg-color-'
      + (active? 'primary text-white' : 'white')
      + 'border-black-10 border-square-5 align-center m-2'
    "
  >
    <div class="day font-size-12 semibold pt-1">
      {{ day }}
    </div>
    <div class="date font-size-20 bold pb-1">
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
