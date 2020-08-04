<template>
  <div class="sidebar-border pl-2 d-flex py-3">
    <div class="px-3">
      <font-awesome-icon :icon="icon" class="sidebar-icon" />
    </div>
    <div v-if="!minimized" class="sidebar-link__item-title pr-5">
      {{ title }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    icon: String,
    title: String,
    minimized: Boolean,
  },
};
</script>
