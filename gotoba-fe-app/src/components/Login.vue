<template>
  <div class="container">
    <form>
      <fieldset class="form-group w-100 border-none">
        <div class="input-group border-gray">
          <span class="input-group-addon">
            <i class="glyphicon glyphicon-user icon icon-gradient"></i>
          </span>
          <input id="login-username" type="email" class="form-control"
            name="usernameOrEmail" placeholder="Username or email">
        </div>
      </fieldset>
      <fieldset class="form-group w-100 border-none">
        <div class="input-group border-gray">
          <span class="input-group-addon">
            <i class="glyphicon glyphicon-lock icon icon-gradient"></i>
          </span>
          <input id="login-password" type="password" class="form-control"
            name="password" placeholder="Password">
        </div>
      </fieldset>

      <router-link class="text-right" id="login-forgot-password"
        to="/forgot-password">Forgot password?</router-link>
      <br>
      <button class="btn btn-primary border-blue-primary d-block w-100"
        type="submit">LOG IN</button>

      <br>
      <span class="d-block text-center">Don't have an account?
        <router-link to="/sign-up">Sign up</router-link>
      </span>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
};
</script>

<style lang="scss">
// @import 'assets/scss/index';
</style>
