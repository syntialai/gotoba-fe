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
import { mapGetters } from 'vuex';

export default {
  name: 'NotFound',
  computed: {
    ...mapGetters(['userRole']),
  },
  methods: {
    home() {
      if (this.userRole === 'ROLE_ADMIN') {
        this.$router.push('/admin');
        return;
      }

      if (this.userRole === 'ROLE_MERCHANT') {
        this.$router.push('/merchant');
        return;
      }

      this.$router.push('/');
    },
  },
};
</script>
