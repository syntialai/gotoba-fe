<template>
  <div class="menu-info">
    <h2 class="font-color-blue-secondary text-capitalize">
      {{ menu }}
    </h2>
    <p class="font-color-black-60">
      Show {{ menu }} datas
    </p>
  </div>
</template>

<script>
export default {
  name: 'MenuInfo',
  computed: {
    menu() {
      return this.$route.path.slice(7).split('/')[0];
    },
  },
};
</script>
