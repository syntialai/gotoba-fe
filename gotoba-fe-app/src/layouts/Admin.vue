<template>
  <div class="admin">
    <div class="d-flex">
      <sidebar />

      <div class="m-4">
        <menu-info class="my-3" />

        <breadcrumb class="my-2 p-0" />
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '../components/Admin/Partial/Breadcrumb/Breadcrumb.vue';
import MenuInfo from '../components/Admin/Partial/MenuInfo/MenuInfo.vue';
import Sidebar from '../components/Admin/Partial/Sidebar/Sidebar.vue';

export default {
  name: 'Admin',
  components: {
    Breadcrumb,
    MenuInfo,
    Sidebar,
  },
};
</script>
