<template>
  <div class="profile">
    <div class="merchant-profile d-flex w-100 m-4 bg-white box-shadow">
      <div class="merchant-img">
        <b-avatar :src="userInfo.image"></b-avatar>
      </div>
      <div class="merchant-info">
        <div class="merchant-name bold font-size-20">
          {{ userInfo.name }}
        </div>
        <div class="merchant-location font-color-black-60">
          {{ userInfo.location }}
        </div>
      </div>
    </div>

    <profile-menu-group
      title="Account"
      :menus="menuAccount"
    />

    <profile-menu-group
      title="About"
      :menus="menuAbout"
      class="my-3"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ProfileMenuGroup from '../../../components/User/Profile/ProfileMenuGroup.vue';

export default {
  name: 'Profile',
  components: {
    ProfileMenuGroup,
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  data() {
    return {
      menuAccount: [
        {
          name: 'Edit Profile', icon: 'user-edit', link: '/profile/edit',
        },
      ],
      menuAbout: [
        {
          name: 'Terms and Condition', icon: 'list-alt', link: '/terms-and-condition',
        },
        {
          name: 'Privacy Policy', icon: 'user-shield', link: '/privacy-policy',
        },
        {
          name: 'Help Centre', icon: 'question-circle', link: '/faq',
        },
        {
          name: 'Log Out', icon: 'sign-out-alt', link: '/log-out',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.menus {
  margin-bottom: 20px;
}
</style>
