<template>
  <div class="background-blue">
    <background />

    <slot class="z4" />
  </div>
</template>

<script>
import Background from '../components/Partial/Background.vue';

export default {
  name: 'BackgroundBlue',
  components: {
    Background,
  },
};
</script>
