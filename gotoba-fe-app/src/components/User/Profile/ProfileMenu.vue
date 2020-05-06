<template>
  <div class="profile-menu d-flex justify-content-between">
    <div class="menu-info">
      <font-awesome-icon :icon="icon" class="icon-gradient font-size-16" />
      <span class="font-size-20 font-color-black-60 pl-2">
        {{ name }}
      </span>
    </div>
    <div class="go-to-menu-icon">
      <font-awesome-icon
        icon="chevron-right"
        class="icon-black-87"
      ></font-awesome-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileLink',
  props: {
    icon: String,
    name: String,
  },
};
</script>
