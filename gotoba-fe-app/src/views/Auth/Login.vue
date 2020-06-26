<template>
  <div class="page-login position-relative">
    <div id="form-login">
      <ValidationObserver>
        <b-form @submit="login">
          <ValidationProvider
            name="Username / email"
            :rules="{required: true, min: 6}"
            v-slot="validationContext"
          >
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
                  v-model="usernameOrEmail"
                  type="text"
                  required
                  placeholder="Username / email"
                  :state="getValidationState(validationContext)"
                  aria-describedby="input-email-feedback-msg"
                ></b-form-input>
                <b-form-invalid-feedback id="input-email-feedback-msg">
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-input-group>
            </b-form-group>
          </ValidationProvider>

          <ValidationProvider
            name="Password"
            rules="required"
            v-slot="validationContext"
          >
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
                  v-model="password"
                  type="password"
                  required
                  placeholder="Password"
                  :state="getValidationState(validationContext)"
                  aria-describedby="input-password-feedback-msg"
                ></b-form-input>
                <b-form-invalid-feedback id="input-password-feedback-msg">
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-input-group>
            </b-form-group>
          </ValidationProvider>

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
      </ValidationObserver>
    </div>
    <div class="align-center">
      <span class="font-color-black-60">Don't have an account? </span>
      <a href="/sign-up">Sign up</a>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import api from '../../api/api';

export default {
  name: 'LoginPage',
  data() {
    return {
      usernameOrEmail: '',
      password: '',
    };
  },
  methods: {
    ...mapActions({ setUserInfo: 'setUserInfo' }),

    getValidationState({ error, validated, valid = null }) {
      return error || validated ? valid : null;
    },

    login() {
      if (!this.usernameOrEmail || !this.password || this.usernameOrEmail.length < 6) {
        return;
      }

      const data = {
        usernameOrEmail: this.usernameOrEmail,
        password: this.password,
      };

      api.Login(data)
        .then((res) => {
          if (res.success) {
            this.setUserInfo(res.data);
            this.$router.push('');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/index";
</style>
