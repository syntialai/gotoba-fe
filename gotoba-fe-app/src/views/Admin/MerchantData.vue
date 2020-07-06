<template>
  <div class="merchant-data">
    <show-data-count
      :perPage="perPage"
      class="my-3"
    />

    <user-table-data
      id="merchant-data-table"
      class="my-2"
      :perPage="perPage"
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
      idControls="merchant-data-table"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Pagination from '../../components/Partial/Pagination.vue';
import ShowDataCount from '../../components/Admin/Data/ShowDataCount.vue';
import UserTableData from '../../components/Admin/Data/UserTableData.vue';

export default {
  name: 'MerchantData',
  components: {
    Pagination,
    ShowDataCount,
    UserTableData,
  },
  computed: {
    ...mapGetters(['merchantData']),
  },
  created() {
    this.getMerchantData();
  },
  data() {
    return {
      currentPage: 1,
      perPage: 10,
    };
  },
  methods: {
    ...mapActions(['getMerchantData']),
  },
};
</script>
