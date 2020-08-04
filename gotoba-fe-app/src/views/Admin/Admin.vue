<template>
  <div class="admin">
    <sidebar />

    <div class="admin-view">
      <search class="py-3 mb-4" />

      <menu-info class="pt-2" />

      <breadcrumb class="mt-2 mb-4 p-0" />

      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '../../components/Admin/Breadcrumb/Breadcrumb.vue';
import MenuInfo from '../../components/Admin/MenuInfo/MenuInfo.vue';
import Search from '../../components/Admin/Search/Search.vue';
import Sidebar from '../../components/Admin/Sidebar/Sidebar.vue';

export default {
  name: 'Admin',
  components: {
    Breadcrumb,
    MenuInfo,
    Search,
    Sidebar,
  },
};
</script>

<style lang="scss" scoped>
.admin-view {
  margin: 0 20px 0 80px;
}
</style>
