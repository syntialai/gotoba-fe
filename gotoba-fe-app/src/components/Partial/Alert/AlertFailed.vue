<template>
  <div class="alert-failed">
    <b-alert
      v-model="showTop"
      class="position-fixed fixed-top m-0 rounded-0"
      style="z-index: 2000;"
      variant="danger"
      dismissible
    >
      Failed {{ message }}!
    </b-alert>
  </div>
</template>

<script>
export default {
  name: 'AlertFailed',
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
