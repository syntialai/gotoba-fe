<template>
  <div class="edit-profile">
    <div class="container pt-4 mb-5">
      <b-form @submit="updateProfile">
        <b-form-group id="edit-img">
          <img src="" alt="" class="border-rounded">
          <b-form-file accept="image/*"></b-form-file>
        </b-form-group>
        <b-form-group
          id="edit-nick-name"
          label="Nick name"
          label-for="input-edit-nick-name"
        >
          <b-form-input
            id="input-edit-nick-name"
            v-model="userInfo.nickname"
            type="text"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="edit-username"
          label="Username"
          label-for="input-edit-username"
        >
          <b-form-input
            id="input-edit-username"
            v-model="userInfo.username"
            type="text"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="edit-email"
          label="Email"
          label-for="input-edit-email"
        >
          <b-form-input
            id="input-edit-email"
            v-model="userInfo.email"
            type="email"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="edit-password"
          label="Password"
          label-for="input-edit-password"
        >
          <b-form-input
            id="input-edit-password"
            v-model="userInfo.password"
            type="password"
            readonly
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="edit-phone-number"
          label="Phone number"
          label-for="input-edit-phone-number"
        >
          <b-form-input
            id="input-edit-phone-number"
            v-model="userInfo.phoneNumber"
            type="text"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="edit-location"
          label="Location"
          label-for="input-edit-location"
        >
          <b-form-input
            id="input-edit-location"
            v-model="userInfo.location"
            type="text"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="edit-birth-date"
          label="Birthdate"
          label-for="input-birth-date"
        >
          <b-form-datepicker
            id="input-birth-date"
            v-model="birthDate"
            :date-format-options="{ year: 'numeric', month: 'long', day: 'numeric' }"
          ></b-form-datepicker>
        </b-form-group>

        <b-button
          class="btn custom-btn-primary w-100 mt-4 border-none"
          type="submit"
        >
          UPDATE PROFILE
        </b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import api from '../../../api/api';

export default {
  name: 'EditProfile',
  computed: {
    ...mapGetters(['userLoginStatus']),
    ...mapState(['userInfo']),
  },
  created() {
    if (!this.userLoginStatus) {
      this.$router.push('/login');
    }
  },
  data() {
    return {
      user: {
        nickname: '',
        username: '',
        email: '',
        phoneNumber: '',
        location: '',
        birthDate: '', // return value YYYY-MM-DD
      },
    };
  },
  methods: {
    ...mapActions(['setUserInfo']),
    updateProfile() {
      if (!this.nickname
        || !this.username
        || !this.email) {
        return;
      }

      const data = {
        nickname: this.nickname,
        username: this.username,
        email: this.email,
        phoneNumber: this.phoneNumber,
        location: this.location,
        birthDate: this.birthDate,
      };

      api.UpdateProfile(data)
        .then((res) => {
          if (res.success) {
            this.setUserInfo(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.user = this.userInfo;
  },
};
</script>
