<template>
  <div class="profile">
    <div class="user-profile d-flex w-100 m-4 bg-white box-shadow">
      <div class="user-img">
        <img :src="image" :alt="name">
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

    <b-button class="bg-color-primary border-square-15 border-none">
      <font-awesome-icon icon="sign-out-alt" />
      <span class="pl-2 bold">LOG OUT</span>
    </b-button>
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
          name: 'Privacy Policy', icon: 'file-signature', link: '/privacy-policy',
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
