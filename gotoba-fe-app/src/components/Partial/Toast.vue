<template>
  <div class="toast">
    <b-toast
      v-model="show"
      variant="dark"
      no-close-button
      auto-hide-delay="3000"
    >
      <div class="message">
        {{ toastMessage }}
      </div>
    </b-toast>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Toast',
  computed: {
    ...mapGetters(['toastMessage', 'showToast']),
    show: {
      get() {
        return this.showToast;
      },
      set() {
        return (value) => this.setShowToast(value);
      },
    },
  },
  methods: {
    ...mapActions(['setShowToast']),
  },
};
</script>
