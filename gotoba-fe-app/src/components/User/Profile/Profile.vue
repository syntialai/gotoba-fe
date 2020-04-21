<template>
  <div class="profile">
    <div class="user-profile d-flex w-100 m-4 bg-white box-shadow">
      <div class="user-img">
        <img :src="image" :alt="['image-' + name.toLowerCase().replace(' ', '-')]">
      </div>
      <div class="user-info">
        <div class="user-name bold font-size-20">{{ name }}</div>
        <div class="user-location font-color-black-60">{{ location }}</div>
      </div>
    </div>

    <div class="menus account bg-white">
      <h2 class="bold">Account</h2>
      <b-list-group>
        <b-list-group-item
          v-for="menu in menuAccount"
          :key="menu.name.toLowerCase().replace(' ', '-')"
          :href="menu.link"
        >
          <div class="menu-info">
            <font-awesome-icon :icon="menu.icon" class="icon icon-gradient"
            ></font-awesome-icon>
            <span class="font-size-20 font-color-black-60">
              {{ menu.name }}
            </span>
          </div>
          <div class="go-to-menu-icon">
            <font-awesome-icon
              icon="chevron-right"
              class="icon icon-black-87"
            ></font-awesome-icon>
          </div>
        </b-list-group-item>
      </b-list-group>
    </div>

    <div class="menus about bg-white">
      <h2 class="bold">About</h2>
      <b-list-group>
        <b-list-group-item
          v-for="menu in menuAbout"
          :key="menu.name.toLowerCase().replace(' ', '-')"
          :href="menu.link"
        >
          <div class="menu-info">
            <font-awesome-icon :icon="menu.icon" class="icon icon-gradient"
            ></font-awesome-icon>
            <span class="font-size-20 font-color-black-60">
              {{ menu.name }}
            </span>
          </div>
          <div class="go-to-menu-icon">
            <font-awesome-icon
              icon="chevron-right"
              class="icon icon-black-87"
            ></font-awesome-icon>
          </div>
        </b-list-group-item>
      </b-list-group>
    </div>

    <b-button class="bg-color-primary border-square-15 border-none">
      <font-awesome-icon icon="sign-out-alt"></font-awesome-icon>
      <span class="pl-2 bold">LOG OUT</span>
    </b-button>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  props: {
    image: String,
    name: String,
    location: String,
  },
  data() {
    return {
      menuAccount: [
        {
          name: 'Edit Profile', icon: 'user-edit', link: '/edit-profile',
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
          name: 'Privacy Policy', icon: 'shield', link: '/privacy-policy',
        },
        {
          name: 'Help Centre', icon: 'question-circle', link: '/',
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
