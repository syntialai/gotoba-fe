<template>
  <b-navbar
    id="bottom-nav"
    class="bg-white box-shadow fixed-bottom d-flex justify-content-around px-0"
    variant="light"
  >
    <b-nav-item
      v-for="item of navItems"
        :key="item.id"
        :class="{active: isActive[item.id-1]}"
        @click="Array.from(isActive, () => 0); isActive[key-1] = 1;"
    >
      <router-link :to="item.link">
        <div class="align-center">
          <font-awesome-icon
            :icon="item.icon"
            class="font-size-24"
          />
          <div :id="['bottom-nav-' + item.id]"
            class="font-size-12"
          >
            {{ item.name }}
          </div>
        </div>
      </router-link>
    </b-nav-item>
  </b-navbar>
</template>

<script>
export default {
  name: 'BottomNav',
  props: {
    navItems: Array,
  },
  data() {
    return {
      isActive: [1, 0, 0, 0, 0],
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/abstracts/variables';

#bottom-nav {
  margin: 0 auto;
}

a {
  color: $gray!important;
}

a .active {
  color: $blue-primary!important;
}
</style>
