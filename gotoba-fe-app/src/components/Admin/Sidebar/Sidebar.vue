<template>
  <div class="sidebar h-100 position-absolute box-shadow">
    <aside id="sidebar-admin" class="bg-white" shadow>
      <b-button
        variant="link"
        class="sidebar-button pt-3 py-3 pb-0 bg-white"
        @click="setPictSize"
      >
        <font-awesome-icon
          icon="bars"
          class="icon-blue-primary font-size-24"
        />
      </b-button>

      <div class="sidebar__profile d-flex justify-content-center">
        <b-avatar
          src=""
          :size="pictSize + 'px'"
          class="my-3"
        ></b-avatar>
      </div>
      <ul class="sidebar__menu p-0 mt-2">
        <li class="sidebar-link-group">
          <sidebar-item
            v-for="(menu, key) in menus"
            :key="key"
            :minimized="minimized"
            :icon="menu.icon"
            :title="menu.title"
            :to="menu.link"
          />
        </li>
      </ul>
    </aside>
  </div>
</template>

<script>
import SidebarItem from './SidebarItem.vue';

export default {
  name: 'Sidebar',
  components: {
    SidebarItem,
  },
  data() {
    return {
      minimized: true,
      pictSize: 40,
      menus: [
        {
          icon: 'tachometer-alt',
          title: 'Dashboard',
          link: '/admin/dashboard',
        },
        {
          icon: 'users',
          title: 'User',
          link: '/admin/user',
        },
        {
          icon: 'store',
          title: 'Merchant',
          link: '/admin/merchant',
        },
        {
          icon: 'image',
          title: 'Gallery',
          link: '/admin/gallery',
        },
        {
          icon: 'route',
          title: 'Itinerary',
          link: '/admin/itinerary',
        },
        {
          icon: 'utensils',
          title: 'Restaurant',
          link: '/admin/restaurant',
        },
        {
          icon: 'user-tie',
          title: 'Tour Guide',
          link: '/admin/tour-guide',
        },
        {
          icon: 'user-cog',
          title: 'Settings',
          link: '/admin/settings',
        },
      ],
    };
  },
  methods: {
    setPictSize() {
      this.pictSize = 40 + this.minimized * 40;
      this.minimized = !this.minimized;
    },
  },
};
</script>
