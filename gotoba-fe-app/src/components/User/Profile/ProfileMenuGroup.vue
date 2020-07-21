<template>
  <div class="profile-menu-group bg-white p-3">
    <h5 class="bold pl-1">{{ title }}</h5>
    <b-list-group>
      <b-list-group-item
        v-for="(menu, index) in menus"
        :key="menu.name"
        :to="menu.link"
        :class="'border-none p-2' +
          (index < menus.length - 1 && !logOut? ' border-bottom-gray-young' : '')"
      >
        <profile-menu :icon="menu.icon" :name="menu.name" />
      </b-list-group-item>
      <b-list-group-item
        v-if="logOut"
        class='border-none p-2'
        @click="logout"
      >
        <profile-menu icon="sign-out-alt" name="Log Out" />
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import ProfileMenu from './ProfileMenu.vue';

export default {
  name: 'ProfileMenuGroup',
  props: {
    title: String,
    menus: Array,
    logOut: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    ProfileMenu,
  },
  methods: {
    ...mapActions(['setLogOut']),
    logout() {
      this.setLogOut();
      this.$router.push('/login');
    },
  },
};
</script>
