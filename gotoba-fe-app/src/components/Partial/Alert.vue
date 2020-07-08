<template>
  <div class="alert">
    <b-alert
      v-model="showAlert"
      class="position-fixed fixed-top m-0 rounded-0"
      style="z-index: 9000;"
      :variant="alertSuccess? 'success' : 'danger'"
      dismissible
    >
      <div class="message">
        {{ alertSuccess? 'Successfully' : 'Failed' }} {{ alertMessage }}!
      </div>
    </b-alert>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Alert',
  computed: {
    ...mapGetters(['showAlert', 'alertMessage', 'alertSuccess']),
  },
};
</script>
