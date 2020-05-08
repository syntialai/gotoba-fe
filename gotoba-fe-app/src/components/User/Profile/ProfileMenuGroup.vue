<template>
  <div class="profile-menu-group bg-white p-3">
    <h5 class="bold pl-1">{{ title }}</h5>
    <b-list-group>
      <b-list-group-item
        v-for="menu in menus"
        :key="menu.name"
        :href="menu.link"
        class="border-none border-bottom-gray p-2"
      >
        <profile-menu :icon="menu.icon" :name="menu.name" />
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import ProfileMenu from './ProfileMenu.vue';

export default {
  name: 'ProfileMenuGroup',
  props: {
    title: String,
    menus: Array,
  },
  components: {
    ProfileMenu,
  },
};
</script>
