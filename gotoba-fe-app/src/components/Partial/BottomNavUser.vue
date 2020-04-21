<template>
  <b-navbar
    id="bottom-nav"
    class="fixed-bottom d-flex pl-0 pr-0"
    variant="light"
  >
    <b-nav-item
      v-for="item of navItems"
        :key="item.id"
        :class="{active: isActive[item.id-1]}"
        @click="Array.from(isActive, () => 0); isActive[key-1] = 1;"
        :style="['width: ' + item.width + '%;']"
      href="/"
    >
      <div class="align-center">
        <font-awesome-icon :icon="item.icon" class="font-size-24" />
        <div :id="['bottom-nav-' + item.id]"
          class="font-size-12"
        >
          {{ item.name }}
        </div>
      </div>
    </b-nav-item>
  </b-navbar>
</template>

<script>
export default {
  name: 'BottomNavUser',
  data() {
    return {
      navItems: [
        {
          id: 1, name: 'Home', icon: 'home', width: 18,
        },
        {
          id: 2, name: 'Itinerary', icon: 'route', width: 18,
        },
        {
          id: 3, name: 'My tickets', icon: 'qrcode', width: 28,
        },
        {
          id: 4, name: 'Cart', icon: 'shopping-cart', width: 18,
        },
        {
          id: 5, name: 'Profile', icon: 'user', width: 18,
        },
      ],
      isActive: [1, 0, 0, 0, 0],
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/abstracts/variables';

#bottom-nav {
  max-width: 768px;
  margin: 0 auto;
}

a {
  color: $gray!important;
}

a .active {
  color: $blue-primary!important;
}
</style>
