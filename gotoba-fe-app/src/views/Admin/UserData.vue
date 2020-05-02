<template>
  <div class="user-data">
    <show-data-count
      :perPage="10"
      class="my-2"
    />

    <user-table-data
      id="data-table"
      class="my-2"
      :perPage="10"
    />

    <div class="info">
      Showing {{ currentPage * perPage }} to
      {{ currentPage * (perPage + 1) }} of
      {{ users.length }} entries
    </div>

    <pagination
      :currentPage="1"
      :perPage="10"
      class="my-3"
      idControls="data-table"
    />
  </div>
</template>

<script>
import Pagination from '../../components/Partial/Pagination.vue';
import ShowDataCount from '../../components/Admin/Data/ShowDataCount.vue';
import UserTableData from '../../components/Admin/Data/UserTableData.vue';

export default {
  name: 'UserData',
  components: {
    Pagination,
    ShowDataCount,
    UserTableData,
  },
};
</script>
