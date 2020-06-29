<template>
  <div class="profile">
    <card-profile-user :user="userInfo" />

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
import { alert } from '../../../utils/tool';
import CardProfileUser from '../../../components/User/Profile/CardProfileUser.vue';
import ProfileMenuGroup from '../../../components/User/Profile/ProfileMenuGroup.vue';

export default {
  name: 'Profile',
  components: {
    CardProfileUser,
    ProfileMenuGroup,
  },
  computed: {
    ...mapGetters(['userInfo', 'userLoginStatus']),
  },
  created() {
    if (!this.userLoginStatus) {
      alert('You should log in first', false);
      this.$router.push('/login');
    }
  },
  data() {
    return {
      menuAccount: [
        {
          name: 'Edit Profile', icon: 'user-edit', link: '/profile/edit',
        },
        {
          name: 'History', icon: 'history', link: '/history',
        },
        {
          name: 'My Itinerary', icon: 'route', link: '/my-itinerary',
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
