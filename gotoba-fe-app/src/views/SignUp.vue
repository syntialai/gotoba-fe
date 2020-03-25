<template>
  <div class="page-signup">
    <SignUp />
    <div>
      Already have an account?
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
