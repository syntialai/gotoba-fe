<template>
  <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
</template>

<script>
import { toCapitalize } from '../../../utils/filter';

export default {
  name: 'Breadcrumb',
  computed: {
    breadcrumbs() {
      const pathArray = this.$route.path.split('/');
      pathArray.shift();

      const active = pathArray.slice(-1);
      pathArray.splice(-1);

      const breadcrumb = pathArray.reduce((array, path, index) => {
        array.push({
          text: toCapitalize(path), // this.$router.matched[index].meta.breadcrumb || path
          to: index === 0 ? `/${path}` : `/admin/${path}`,
        });

        return array;
      }, []);

      breadcrumb.push({
        text: toCapitalize(active[0]),
        active: true,
      });

      return breadcrumb;
    },
  },
  methods: {
    toCapitalize,
  },
};
</script>
