<template>
  <div class="not-found p-5">
    <div class="404-info mb-5 align-center">
      <h4>Page Not Found</h4>
      <p>We couldn't find the page you're looking for.</p>
    </div>

    <b-button
      block
      class="custom-btn custom-btn-primary"
      @click="home"
    >
      BACK TO HOME
    </b-button>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  methods: {
    home() {
      this.$router.push('/');
    },
  },
};
</script>
