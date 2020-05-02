<template>
  <div class="admin">
    <sidebar />

    <div class="mx-5 my-0">
      <search class="ml-5 py-3 mb-4" />

      <menu-info class="pt-2 ml-5" />

      <breadcrumb class="mt-2 ml-5 mb-4 p-0" />
    </div>
  </div>
</template>

<script>
import Breadcrumb from '../components/Admin/Partial/Breadcrumb/Breadcrumb.vue';
import MenuInfo from '../components/Admin/Partial/MenuInfo/MenuInfo.vue';
import Search from '../components/Admin/Partial/Search/Search.vue';
import Sidebar from '../components/Admin/Partial/Sidebar/Sidebar.vue';

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
