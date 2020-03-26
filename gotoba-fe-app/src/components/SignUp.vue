<template>
  <div id="form-sign-up">
    <b-form @submit="onSubmit">
      <b-form-group
        id="input-group-nick-name"
        label-for="input-nick-name"
      >
        <b-input-group>
          <b-input-group-prepend is-text>
            <b-icon icon="person-fill" class="icon-gradient"></b-icon>
          </b-input-group-prepend>
          <b-form-input
            id="input-nick-name"
            v-model="form.nickname"
            type="text"
            required
            placeholder="Nick name"
          ></b-form-input>
        </b-input-group>
      </b-form-group>
      <b-form-group
        id="input-group-username"
        label-for="input-username"
      >
        <b-input-group>
          <b-input-group-prepend is-text>
            <b-icon icon="person-fill" class="icon-gradient"></b-icon>
          </b-input-group-prepend>
          <b-form-input
            id="input-username"
            v-model="form.username"
            type="text"
            required
            placeholder="Username"
          ></b-form-input>
        </b-input-group>
      </b-form-group>
      <b-form-group
        id="input-group-email"
        label-for="input-email"
      >
        <b-input-group>
          <b-input-group-prepend is-text>
            <b-icon icon="envelope-fill" class="icon-gradient"></b-icon>
          </b-input-group-prepend>
          <b-form-input
            id="input-email"
            v-model="form.email"
            type="email"
            required
            placeholder="Email"
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
      <b-form-group
        id="input-group-retype-password"
        label-for="input-retype-password"
      >
        <b-input-group>
          <b-input-group-prepend is-text>
            <b-icon icon="lock-fill" class="icon-gradient"></b-icon>
          </b-input-group-prepend>
          <b-form-input
            id="input-retype-password"
            v-model="form.retypePassword"
            type="password"
            required
            placeholder="Re-type Password"
          ></b-form-input>
        </b-input-group>
      </b-form-group>
      <b-form-group
        id="input-group-role"
        label="Register as"
        label-for="input-role"
      >
        <b-form-select
          id="input-role"
          v-model="form.role"
          required
        >
          <b-icon
            icon="person-fill"
            class="icon icon-gradient pr-2">
          </b-icon>
          <b-form-select-option value="user">User</b-form-select-option>
          <b-form-select-option value="merchant">
            Merchant
          </b-form-select-option>
        </b-form-select>
      </b-form-group>

      <b-form-group
        id="input-group-checkbox-agree"
        class="mb-4"
      >
        <b-form-checkbox-group v-model="form.checked" id="checkbox-agree">
          <b-form-checkbox
            class="font-size-12"
            value="true"
            unchecked-value="false"
            required>
            I Agree to gotoba
            <router-link to="">Terms and Conditions</router-link> and
            <router-link to="">Privacy Policy</router-link>
          </b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

      <b-button
        id="button-submit"
        class="btn custom-btn-primary w-100 d-block mb-3"
        type="submit"
      >
        SIGN UP
      </b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  name: 'SignUp',
  data() {
    return {
      form: {
        nickname: '',
        username: '',
        email: '',
        password: '',
        retypePassword: '',
        role: 'User',
        checked: [],
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
