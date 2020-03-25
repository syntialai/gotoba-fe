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
          v-model="form.usernameOrEmail"
          type="email"
          required
          placeholder="Username / email"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-password"
        label-for="input-password"
        inline
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

      <router-link to="/forgot-password">Forgot Password?</router-link>

      <b-button id="button-submit" class="btn btn-red" type="submit">LOG IN</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      form: {
        usernameOrEmail: '',
        password: '',
      },
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      JSON.stringify(this.form);
    },
  },
};
</script>
