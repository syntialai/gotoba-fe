<template>
  <div class="alert">
    <b-alert
      v-model="show"
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
  props: {
    message: String,
    success: Boolean,
    show: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
