<template>
  <div class="sidebar h-100 position-fixed overflow-auto bg-white box-shadow">
    <aside id="sidebar-admin" class="bg-white" shadow>
      <b-button
        variant="link"
        class="sidebar-button pt-3 pb-0 bg-white"
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
          <router-link
            v-for="(menu, key) in menus"
            :key="key"
            :to="menu.link"
            class="sidebar-link"
            exact-active-class="active"
          >
            <sidebar-item
              :minimized="minimized"
              :icon="menu.icon"
              :title="menu.title"
            />
          </router-link>
          <button @click="logout" class="border-none p-0 bg-white">
            <sidebar-item
              :minimized="minimized"
              icon="sign-out-alt"
              title="Log Out"
              class="font-color-gray"
            />
          </button>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
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
      ],
    };
  },
  methods: {
    ...mapActions(['setLogOut']),
    logout() {
      this.setLogOut();
      this.$router.push('/login');
    },
    setPictSize() {
      this.pictSize = 40 + this.minimized * 20;
      this.minimized = !this.minimized;
    },
  },
};
</script>

<style lang="scss">
::-webkit-scrollbar {
  display: none;
}
</style>
