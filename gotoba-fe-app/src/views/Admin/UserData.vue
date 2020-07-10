<template>
  <div class="user-data">
    <show-data-count
      :perPage.sync="perPage"
      class="my-3"
    />

    <user-table-data
      :id="'user-data-table'"
      class="my-2"
      v-if="userData"
      :perPage="perPage"
      :currentPage="currentPage"
      :fields="fields"
      :items="items"
    />

    <div class="info" v-if="userData">
      Showing {{ dataStart }} to {{ dataEnd }} of {{ userData.length }} entries
    </div>

    <pagination
      v-if="userData"
      :currentPage.sync="currentPage"
      :perPage="perPage"
      :rows="userData.length"
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

    dataStart() {
      return (this.currentPage - 1) * this.perPage + 1;
    },
    dataEnd() {
      const end = this.currentPage * this.perPage;

      if (end > this.userData.length) {
        return this.userData.length;
      }

      return end;
    },

    items() {
      return this.userData.map((data) => ({
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
