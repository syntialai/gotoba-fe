<template>
  <div class="page-signup p-3">
    <div id="form-sign-up">
      <b-overlay
        id="overlay-sign-up"
        :show="showLoading"
        variant="light"
        :opacity="0.6"
        blur="2px"
        rounded="sm"
      >
        <ValidationObserver>
          <b-form @submit.stop.prevent="signup">
            <ValidationProvider
              name="Nickname"
              :rules="{ required: true, min: 3 }"
              v-slot="validationContext"
            >
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
                    v-model="nickname"
                    type="text"
                    required
                    placeholder="Nick name"
                    :state="getValidationState(validationContext)"
                    aria-describedby="input-nick-name-feedback-msg"
                  ></b-form-input>
                  <b-form-invalid-feedback id="input-nick-name-feedback-msg">
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-input-group>
              </b-form-group>
            </ValidationProvider>

            <ValidationProvider
              name="Username"
              rules="required|alpha_dash"
              v-slot="validationContext"
            >
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
                    v-model="username"
                    type="text"
                    required
                    placeholder="Username"
                    :state="getValidationState(validationContext)"
                    aria-describedby="input-username-feedback-msg"
                  ></b-form-input>
                  <b-form-invalid-feedback id="input-username-feedback-msg">
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-input-group>
              </b-form-group>
            </ValidationProvider>

            <ValidationProvider
              name="Email"
              rules="required|email"
              v-slot="validationContext"
            >
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
                    v-model="email"
                    type="email"
                    required
                    placeholder="Email"
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
              :rules="{required: true, min: 8}"
              v-slot="validationContext"
              vid="confirmation"
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

            <ValidationProvider
              name="Confirm password"
              rules="required|confirmed:confirmation"
              v-slot="validationContext"
            >
              <b-form-group
                id="input-group-confirm-password"
                label-for="input-confirm-password"
              >
                <b-input-group>
                  <b-input-group-prepend is-text>
                    <b-icon icon="lock-fill" class="icon-gradient"></b-icon>
                  </b-input-group-prepend>
                  <b-form-input
                    id="input-confirm-password"
                    v-model="confirmPassword"
                    type="password"
                    required
                    placeholder="Confirm Password"
                    :state="getValidationState(validationContext)"
                    aria-describedby="input-confirm-password-feedback-msg"
                  ></b-form-input>
                  <b-form-invalid-feedback
                    id="input-confirm-password-feedback-msg"
                  >
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-input-group>
              </b-form-group>
            </ValidationProvider>

            <b-form-group
              id="input-group-role"
              label="Register as"
              label-for="input-role"
            >
              <b-form-select
                id="input-role"
                v-model="role"
                required
              >
                <b-form-select-option value="ROLE_USER" selected>
                  <font-awesome-icon icon="user"></font-awesome-icon>
                  User
                </b-form-select-option>
                <b-form-select-option value="ROLE_MERCHANT">
                  <b-icon
                    icon="person-fill"
                    class="icon icon-gradient pr-2">
                  </b-icon>
                  Merchant
                </b-form-select-option>
              </b-form-select>
            </b-form-group>

            <ValidationProvider
              name="Rules"
              rules="required"
              v-slot="validationContext"
            >
              <b-form-group
                id="input-group-checkbox-agree"
                class="mb-4"
              >
                <b-form-checkbox
                  class="font-size-12"
                  v-model="checked"
                  value="true"
                  unchecked-value="false"
                  :state="getValidationState(validationContext)"
                  aria-describedby="rules-feedback-msg"
                  required>
                  I Agree to gotoba
                  <router-link to="/terms-and-condition">Terms and Conditions</router-link> and
                  <router-link to="/privacy-policy">Privacy Policy</router-link>
                </b-form-checkbox>
                <b-form-invalid-feedback id="rules-feedback-msg">
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>

            <b-button
              id="button-submit"
              class="btn custom-btn-primary w-100 d-block mb-3"
              type="submit"
            >
              SIGN UP
            </b-button>
          </b-form>
        </ValidationObserver>
      </b-overlay>
    </div>
    <div class="align-center">
      <span class="font-color-black-60">Already have an account? </span>
      <router-link to="/login">Log in</router-link>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { setAlert } from '../../utils/tool';
import api from '../../api/api';
import getValidationState from '../../utils/validation';

export default {
  name: 'SignUpPage',
  data() {
    return {
      nickname: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'ROLE_USER',
      checked: 'false',
      showLoading: false,
    };
  },
  methods: {
    ...mapActions(['setUserInfo']),

    getValidationState,

    async signup() {
      if (!this.nickname
        || !this.username
        || !this.email
        || !this.password
        || !this.confirmPassword
        || this.checked !== 'true'
      ) {
        return;
      }

      this.showLoading = true;

      const data = {
        nickname: this.nickname,
        username: this.username,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
        image: '',
        role: this.role,
      };

      try {
        const res = await api.Signup(data);

        if (!res.error) {
          this.login();
          return;
        }

        this.showLoading = false;
        setAlert('sign your account. Please try again later', false);
      } catch (err) {
        this.showLoading = false;
        setAlert('sign up. Please try again later', false);
      }
    },
    async login() {
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

        setAlert('log in. Check your username/password', false);
      } catch (err) {
        this.showLoading = false;
        setAlert('log in. Please try again later', false);
        console.log(err);
      }
    },
    checkRole() {
      if (this.role === 'ROLE_MERCHANT') {
        this.$router.push('/merchant');
        return;
      }
      this.$router.push('/');
    },
  },
};
</script>

<style lang="scss">
#form-sign-up {
  max-width: 768px;
  margin: auto;
}
</style>
