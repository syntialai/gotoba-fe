<template>
  <div class="page-login">
    <Login />
    <div>
      Don't have an account?
      <router-link to="/sign-up">Sign up</router-link>
    </div>
  </div>
</template>

<script>
import Login from '@/components/Login.vue';

export default {
  name: 'LoginPage',
  components: {
    Login,
  },
};
</script>
