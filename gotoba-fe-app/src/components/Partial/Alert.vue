<template>
  <div class="alert">
    <b-alert
      v-model="show"
      class="position-fixed fixed-top m-0 rounded-0"
      style="z-index: 9000;"
      :variant="alertSuccess? 'success' : 'danger'"
      dismissible
      fade
    >
      <div class="message">
        {{ alertSuccess? 'Successfully' : 'Failed to' }} {{ alertMessage }}!
      </div>
    </b-alert>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Alert',
  computed: {
    ...mapGetters(['showAlert', 'alertMessage', 'alertSuccess']),
    show: {
      get() {
        return this.showAlert;
      },
      set(value) {
        this.setShowAlert(value);
      },
    },
  },
  methods: {
    ...mapActions(['setShowAlert']),
  },
};
</script>
