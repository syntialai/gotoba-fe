<template>
  <div class="page-login position-relative p-3">
    <div id="form-login">
      <b-overlay
        id="overlay-log-in"
        :show="showLoading"
        variant="light"
        :opacity="0.6"
        blur="2px"
        rounded="sm"
      >
        <ValidationObserver>
          <b-form @submit.stop.prevent="login">
            <ValidationProvider
              name="Username"
              :rules="{required: true, alpha_dash: true, min: 6}"
              v-slot="validationContext"
            >
              <b-form-group
                id="input-group-user-name"
                label-for="input-user-name"
              >
                <b-input-group>
                  <b-input-group-prepend is-text>
                    <b-icon icon="person-fill" class="icon-gradient"></b-icon>
                  </b-input-group-prepend>
                  <b-form-input
                    id="input-user-name"
                    v-model="username"
                    type="text"
                    required
                    placeholder="Username"
                    :state="getValidationState(validationContext)"
                    aria-describedby="input-user-name-feedback-msg"
                  ></b-form-input>
                  <b-form-invalid-feedback id="input-user-name-feedback-msg">
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
              <router-link to="/forgot-password">Forgot Password?</router-link>
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
      </b-overlay>
    </div>
    <div class="align-center">
      <span class="font-color-black-60">Don't have an account? </span>
      <router-link to="/sign-up">Sign up</router-link>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import api from '../../api/api';
import { alert } from '../../utils/tool';
import getValidationState from '../../utils/validation';

export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: '',
      showLoading: false,
    };
  },
  methods: {
    ...mapActions(['setUserInfo']),

    getValidationState,

    async login() {
      if (!this.username || !this.password || this.username.length < 6) {
        return;
      }

      const data = {
        username: this.username,
        password: this.password,
      };

      this.showLoading = true;

      try {
        const res = await api.Login(data);
        console.log(res);
        this.showLoading = false;

        if (!res.error) {
          this.setUserInfo({
            name: res.name,
            sku: res.sku_user,
            role: res.role,
            image: res.image,
          });

          this.checkRole(res.role);
          return;
        }

        alert('log in. Check your username/password', false);
      } catch (err) {
        this.showLoading = false;
        alert('log in. Please try again later', false);
        console.log(err);
      }
    },
    checkRole(role) {
      if (role === 'ROLE_ADMIN') {
        this.$router.push('/admin');
        return;
      }
      if (role === 'ROLE_MERCHANT') {
        this.$router.push('/merchant');
        return;
      }
      this.$router.push('/');
    },
  },
};
</script>

<style lang="scss">
#form-login {
  max-width: 768px;
  margin: auto;
}
</style>
