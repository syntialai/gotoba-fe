<template>
  <div class="user-data">
    <show-data-count
      :perPage="perPage"
      class="my-3"
    />

    <user-table-data
      id="user-data-table"
      class="my-2"
      :perPage="perPage"
      :fields="fields"
      :items="userData"
    />

    <div class="info">
      Showing {{ (currentPage - 1) * perPage + 1 }} to
      {{ currentPage * perPage }} of
      50 entries
      <!-- {{ users.length }} entries -->
    </div>

    <pagination
      :currentPage="currentPage"
      :perPage="perPage"
      class="my-3"
      idControls="user-data-table"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
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
  computed: {
    ...mapGetters(['userData']),
  },
  created() {
    this.getUserData();
  },
  data() {
    return {
      currentPage: 1,
      perPage: 10,
      fields: [
        {
          key: 'user',
          sortable: true,
        },
        {
          key: 'sku',
          sortable: true,
        },
        {
          key: 'email',
          sortable: false,
        },
        {
          key: 'status',
          sortable: true,
        },
      ],
    };
  },
  methods: {
    ...mapActions(['getUserData']),
  },
};
</script>
