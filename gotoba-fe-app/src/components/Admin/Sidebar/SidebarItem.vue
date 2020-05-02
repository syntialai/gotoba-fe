<template>
  <router-link :to="to" :target="target">
    <div :class="'sidebar-link d-flex py-3 ' + { '__active': isActive }">
      <div class="px-3">
        <font-awesome-icon
          :icon="icon"
          :class="'icon-' + (isActive? 'gradient': 'gray')"
        />
      </div>
      <div
        v-if="!minimized"
        :class="'sidebar-link__item-title font-color-' +
          (isActive? 'blue-primary bold': 'gray')
        "
      >
        {{ title }}
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    icon: String,
    title: String,
    minimized: Boolean,
    to: String,
    target: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isActive: this.activeByDefault,
    };
  },
  methods: {
    updateActiveState() {
      this.isActive = (this.$route.name
        === this.to.name)
        || this.activeByDefault;
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/index';

.sidebar-link {
   border: none;
   background-color: white;

  &__active {
    border-left: 3px solid $blue-primary;
    background-color: #f3f3f3;
  }
}
</style>
