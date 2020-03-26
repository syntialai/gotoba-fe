<template>
  <div class="page-login mt-3">
    <Login />
    <div class="align-center">
      <span class="font-color-black-60">Don't have an account? </span>
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
