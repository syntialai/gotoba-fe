<template>
  <div class="toast">
    <b-toast
      v-model="showToast"
      variant="dark"
      no-close-button
      class="b-toaster-bottom-center border-circle"
    >
      {{ message }}
    </b-toast>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  computed: {
    showToast() {
      return this.$store.state.showToast;
    },
    message() {
      return this.$store.state.toastMessage;
    },
  },
};
</script>
