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
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Timeline',
  props: {
    timelines: Array,
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/index';
</style>
