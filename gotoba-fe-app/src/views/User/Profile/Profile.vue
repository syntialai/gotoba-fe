<template>
  <div class="profile">
    <div class="user-profile d-flex w-100 m-4 bg-white box-shadow position-relative">
      <div class="user-img">
        <b-avatar :src="image"></b-avatar>
      </div>
      <div class="user-info">
        <div class="user-name bold font-size-20">{{ name }}</div>
        <div class="user-location font-color-black-60">{{ location }}</div>
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
import ProfileMenuGroup from '../../../components/User/Profile/ProfileMenuGroup.vue';

export default {
  name: 'Profile',
  props: {
    image: String,
    name: String,
    location: String,
  },
  components: {
    ProfileMenuGroup,
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
