<template>
  <div id="form-sign-up">
    <b-form @submit="onSubmit">
      <b-form-group
        id="input-group-nick-name"
        label-for="input-nick-name"
      >
        <b-input-group-prepend>
          <b-icon icon="person-fill"></b-icon>
        </b-input-group-prepend>
        <b-form-input
          id="input-nick-name"
          v-model="form.nickname"
          type="text"
          required
          placeholder="Nick name"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-username"
        label-for="input-username"
      >
        <b-input-group-prepend>
          <b-icon icon="person-fill"></b-icon>
        </b-input-group-prepend>
        <b-form-input
          id="input-username"
          v-model="form.username"
          type="text"
          required
          placeholder="Username"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-email"
        label-for="input-email"
      >
        <b-input-group-prepend>
          <b-icon icon="envelope-fill"></b-icon>
        </b-input-group-prepend>
        <b-form-input
          id="input-email"
          v-model="form.email"
          type="email"
          required
          placeholder="Email"
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
      <b-form-group
        id="input-group-retype-password"
        label-for="input-retype-password"
      >
        <b-input-group-prepend>
          <b-icon icon="lock-fill"></b-icon>
        </b-input-group-prepend>
        <b-form-input
          id="input-retype-password"
          v-model="form.retypePassword"
          type="password"
          required
          placeholder="Re-type Password"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-role"
        label="Register as"
        label-for="input-role"
      >
        <b-dropdown id="input-role" variant="secondary">
          <template v-slot:button-content>
            <b-icon icon="person-fill" aria-hidden="true"></b-icon> User
          </template>
          <b-dropdown-item-button>
            <b-icon icon="lock-fill" aria-hidden="true"></b-icon>
            Merchant <span class="sr-only">(Not Selected)</span>
          </b-dropdown-item-button>
          <b-dropdown-item-button>
            <b-icon icon="person-fill" aria-hidden="true"></b-icon>
            User <span class="sr-only">(Selected)</span>
          </b-dropdown-item-button>
        </b-dropdown>
      </b-form-group>

      <b-form-group id="input-group-checkbox-agree">
        <b-form-checkbox-group v-model="form.checked" id="checkbox-agree">
          <b-form-checkbox value="true" unchecked-value="false">
            I Agree to gotoba
            <router-link to="">Terms and Conditions</router-link> and
            <router-link to="">Privacy Policy</router-link>
          </b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

      <b-button type="submit" variant="primary">SIGN UP</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  name: 'SignUp',
};
</script>
