<template>
  <div class="profile">
    <card-profile-user
      :name="userName"
      :image="userImage"
    />

    <profile-menu-group
      title="Account"
      :menus="menuAccount"
    />

    <profile-menu-group
      title="About"
      :menus="menuAbout"
      :logOut="true"
      class="mt-3 margin-80"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CardProfileUser from '../../../components/User/Profile/CardProfileUser.vue';
import ProfileMenuGroup from '../../../components/User/Profile/ProfileMenuGroup.vue';

export default {
  name: 'Profile',
  components: {
    CardProfileUser,
    ProfileMenuGroup,
  },
  computed: {
    ...mapGetters([
      'userName',
      'userLoginStatus',
      'userRole',
      'userImage',
    ]),
  },
  data() {
    return {
      menuAccount: [
        {
          name: 'Edit Profile', icon: 'user-edit', link: '/merchant/profile/edit',
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
