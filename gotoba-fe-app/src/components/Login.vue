<template>
  <div id="form-login">
    <b-form @submit="onSubmit">
      <b-form-group
        id="input-group-email"
        label-for="input-email"
      >
        <b-input-group>
          <b-input-group-prepend is-text>
            <b-icon icon="person-fill" class="icon-gradient"></b-icon>
          </b-input-group-prepend>
          <b-form-input
            id="input-email"
            v-model="form.usernameOrEmail"
            type="email"
            required
            placeholder="Username / email"
          ></b-form-input>
        </b-input-group>
      </b-form-group>
      <b-form-group
        id="input-group-password"
        label-for="input-password"
      >
        <b-input-group>
          <b-input-group-prepend is-text>
            <b-icon icon="lock-fill" class="icon-gradient"></b-icon>
          </b-input-group-prepend>
          <b-form-input
            id="input-password"
            v-model="form.password"
            type="password"
            required
            placeholder="Password"
          ></b-form-input>
        </b-input-group>
      </b-form-group>

      <span class="align-right d-block mb-3">
        <a href="/forgot-password">Forgot Password?</a>
      </span>

      <b-button
        id="button-submit"
        class="btn custom-btn-primary w-100 d-block mb-3"
        type="submit"
      >
        LOG IN
      </b-button>
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
