<template>
  <div class="alert">
    <b-alert
      v-model="showAlert"
      class="position-fixed fixed-top m-0 rounded-0"
      style="z-index: 2000;"
      :variant="success? 'success' : 'danger'"
      dismissible
    >
      {{ success? 'Successfully' : 'Failed' }} {{ message }}!
    </b-alert>
  </div>
</template>

<script>
export default {
  name: 'Alert',
  computed: {
    showAlert() {
      return this.$store.state.showAlert;
    },
    message() {
      return this.$store.state.alertMessage;
    },
    success() {
      return this.$store.state.alertSuccess;
    },
  },
};
</script>
