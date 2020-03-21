<template>
  <div class="container">
    <form>
      <fieldset>
        <fieldset class="form-group">
          <div class="input-group">
            <span class="input-group-addon"><i class="glyphicon glyphicon-user icon icon-gradient"></i></span>
            <input id="login-username" type="email" class="form-control " name="usernameOrEmail" placeholder="Username or email">
          </div>
        </fieldset>
        <fieldset class="form-group">
          <div class="input-group">
            <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
            <input id="login-password" type="password" class="form-control" name="password" placeholder="Password">
          </div>
        </fieldset>

        <router-link class="align-right" id="login-forgot-password" to="/forgot-password">Forgot password?</router-link>
        <button class="btn btn-primary pull-xs-right" type="submit">LOG IN</button>

        <span class="align-center">Don't have an account? <router-link to="/sign-up">Sign up</router-link></span> 
      </fieldset>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
};
</script>