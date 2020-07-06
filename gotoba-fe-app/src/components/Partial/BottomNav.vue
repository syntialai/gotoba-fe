<template>
  <b-navbar
    id="bottom-nav"
    class="bg-white box-shadow fixed-bottom d-flex justify-content-around px-0"
    variant="light"
  >
    <b-nav-item
      v-for="item of navItems"
      :key="item.id"
      :to="item.link"
      exact-active-class="active"
    >
      <div class="align-center">
        <font-awesome-icon
          :icon="item.icon"
          class="font-size-24"
        />
        <div :id="['bottom-nav-' + item.id]"
          class="font-size-14"
        >
          {{ item.name }}
        </div>
      </div>
    </b-nav-item>
  </b-navbar>
</template>

<script>
export default {
  name: 'BottomNav',
  props: {
    navItems: Array,
  },
};
</script>
