<template>
  <div :class="'info-card w-100 border-square-10 p-2 bg-color-'
    + colors[info.colorNo] + ' box-shadow-' + colors[info.colorNo]"
  >
    <div class="d-flex align-items-center text-white">
      <div class="info-icon m-2">
        <font-awesome-icon class="icon" :icon="info.icon"></font-awesome-icon>
      </div>
      <div class="info-content mr-2">
        <div class="info-title semibold font-size-20">{{ info.title }}</div>
        <div class="info-text font-size-14">{{ info.text }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoCard',
  props: {
    info: Object,
  },
  data() {
    return {
      colors: ['accent-orange', 'accent-purple', 'accent-green', 'blue-primary'],
    };
  },
};
</script>
