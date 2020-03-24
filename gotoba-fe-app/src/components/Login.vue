<template>
  <div id="form-login">
    <b-form @submit="onSubmit">
      <b-form-group
        id="input-group-email"
        label-for="input-email"
      >
        <b-input-group-prepend>
          <b-icon icon="person-fill"></b-icon>
        </b-input-group-prepend>
        <b-form-input
          id="input-email"
          v-model="form.email"
          type="email"
          required
          placeholder="Username / email"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-password"
        label-for="input-password"
      >
        <b-input-group-prepend>
          <b-icon icon="lock-fill"></b-icon>
        </b-input-group-prepend>
        <b-form-input
          id="input-password"
          v-model="form.password"
          type="password"
          required
          placeholder="Password"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">LOG IN</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
};
</script>

<style lang="scss">
// @import '~@assets/scss/index';
</style>
