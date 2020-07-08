<template>
  <div class="toast">
    <b-toast
      v-model="showToast"
      variant="dark"
      no-close-button
    >
      <div class="message">
        {{ toastMessage }}
      </div>
    </b-toast>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Toast',
  computed: {
    ...mapGetters(['showToast', 'toastMessage']),
  },
};
</script>
