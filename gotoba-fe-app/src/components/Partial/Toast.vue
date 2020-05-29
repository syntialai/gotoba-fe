<template>
  <div class="toast">
    <b-toaster-bottom-center
      v-model="showToast"
      variant="dark"
      no-close-button
      class="border-circle"
    >
      {{ message }}
    </b-toaster-bottom-center>
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
