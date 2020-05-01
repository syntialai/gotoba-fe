<template>
  <b-breadcrumb :items="menus"></b-breadcrumb>
</template>

<script>
export default {
  name: 'Breadcrumb',
  computed: {
    menus() {
      const path = this.$route.path.slice(6);
      const pathArrays = path.split('/');
      const active = pathArrays.slice(-1);
      pathArrays.splice(-1);

      let menu = [];
      let link = '/admin'
      for (item in pathArrays) {
        link += `/${item}`;

        menu.push({
          text: item,
          to: link,
        });
      }

      menu.push({
        text: active,
        active: true,
      });

      return menu;
    },
  },
};
</script>