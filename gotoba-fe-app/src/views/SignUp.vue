<template>
  <div class="page-signup mt-3">
    <SignUp />
    <div class="align-center">
      <span class="font-color-black-60">Already have an account? </span>
      <router-link to="/login">Log in</router-link>
    </div>
  </div>
</template>

<script>
import SignUp from '@/components/SignUp.vue';

export default {
  name: 'SignUpPage',
  components: {
    SignUp,
  },
};
</script>
