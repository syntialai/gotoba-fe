<template>
  <div class="alert-success">
    <b-alert
      v-model="showTop"
      class="position-fixed fixed-top m-0 rounded-0"
      style="z-index: 2000;"
      variant="success"
      dismissible
    >
      Successfully {{ message }}!
    </b-alert>
  </div>
</template>

<script>
export default {
  name: 'AlertSuccess',
  props: {
    message: String,
  },
  data() {
    return {
      showTop: false,
    };
  },
};
</script>
