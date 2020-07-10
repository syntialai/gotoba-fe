<template>
  <div class="merchant-data">
    <show-data-count
      :perPage="perPage"
      class="my-3"
    />

    <user-table-data
      id="merchant-data-table"
      class="my-2"
      v-if="merchantDatas"
      :perPage="perPage"
      :fields="fields"
      :items="items"
    />

    <div class="info" v-if="merchantDatas">
      Showing {{ dataStart }} to {{ dataEnd }} of {{ merchantDatas.length }} entries
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
    ...mapGetters(['merchantDatas']),

    dataStart() {
      return (this.currentPage - 1) * this.perPage + 1;
    },
    dataEnd() {
      return this.currentPage * this.perPage;
    },

    items() {
      return this.merchantDatas.map((data) => ({
        user: {
          image: data.image || '',
          name: data.nickname,
        },
        status: data.status,
        sku: data.sku,
        email: data.email,
      }));
    },
  },
  created() {
    this.getMerchantData();
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
    ...mapActions(['getMerchantData']),
  },
};
</script>
