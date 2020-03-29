<template>
  <b-navbar
    id="bottom-nav"
    class="fixed-bottom d-flex justify-content-around"
  >
    <b-nav-item
      v-for="item of navItems"
        :key="item.id"
        :icon="item.icon"
        :name="item.name"
        :class="{active: isActive[key-1]}"
        @click="Array.from(isActive, () => 0); isActive[key-1] = 1;"
      href="/"
    >
      <font-awesome-icon :icon="[item.icon]" />
      <div :id="['bottom-nav-' + item.id]">
        {{ item.name }}
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
        { id: 1, name: 'Home', icon: 'home' },
        { id: 2, name: 'Itinerary', icon: 'route' },
        { id: 3, name: 'My tickets', icon: 'qrcode' },
        { id: 4, name: 'Cart', icon: 'shopping-cart' },
        { id: 5, name: 'Profile', icon: 'user' },
      ],
      isActive: [1, 0, 0, 0, 0],
    };
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/abstracts/variables';

b-nav-item {
  color: $gray;
}

b-nav-item .active {
  color: $blue-primary;
}
</style>
