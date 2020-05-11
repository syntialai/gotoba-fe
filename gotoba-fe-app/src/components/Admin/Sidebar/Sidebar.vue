<template>
  <div class="sidebar h-100 position-fixed z1 box-shadow">
    <b-button
      variant="light"
      class="p-3"
      @click="minimized = !minimized; pictSize = 50 + minimized * 50"
    >
      <font-awesome-icon
        icon="bars"
        class="icon-blue-primary fa-2x"
      />
    </b-button>
    <transition name="width">
      <aside id="sidebar-admin" class="bg-white" shadow>
        <div class="sidebar__profile py-3">
          <b-avatar
            src=""
            :size="pictSize + 'px'"
            class="ml-2"
          ></b-avatar>
        </div>
        <ul class="sidebar__menu px-2 m-0">
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
    </transition>
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
      pictSize: 50,
      menus: [
        {
          icon: 'tachometer-alt',
          title: 'Dashboard',
          link: '/admin/',
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
          icon: 'store',
          title: 'Settings',
          link: '/admin/settings',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.width-enter-active, .width-leave-active {
  transition: width 0.5s;
  z-index: 1;
}

.width-enter {
  &-active {
    width: 25%;
  }

  &-leave {
    width: 64px;
  }
}

#sidebar-admin {
  width: 64px;
}
</style>
