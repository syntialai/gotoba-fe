<template>
  <b-table
    :id="id"
    :fields="fields"
    :items="items"
    :current-page="currentPage"
    :per-page="perPage"
    responsive="sm"
    class="bg-white"
  >
    <template v-slot:cell(user)="data">
      <div class="d-flex align-items-center">
        <div class="user-img">
          <b-avatar
            :src="data.value.image"
            :alt="data.items"
            width="40px"
            height="40px"
          />
        </div>
        <div class="user-name ml-3">
          {{ toCapitalize(data.value.name) }}
        </div>
      </div>
    </template>

    <template v-slot:cell(status)="{ item }">
      <b-badge
        :variant="item.status === 'active'? 'success' : 'danger'"
        @click="confirmModal(item.status, item.sku)"
      >
        {{ item.status }}
      </b-badge>
    </template>
  </b-table>
</template>

<script>
import { mapActions } from 'vuex';
import api from '../../../api/api';
import { setAlert } from '../../../utils/tool';
import { toCapitalize } from '../../../utils/filter';

export default {
  name: 'UserTableData',
  props: {
    currentPage: Number,
    perPage: {
      type: Number,
      default: 10,
    },
    fields: Array,
    items: Array,
    id: String,
  },
  methods: {
    ...mapActions(['getMerchantData', 'getUserData']),
    toCapitalize,
    getStatus(status) {
      if (status === 'active') {
        return 'blocked';
      }
      return 'active';
    },
    async changeStatus(status, sku) {
      let res;
      try {
        if (status === 'blocked') {
          res = await api.BlockUser(sku);
        } else {
          res = await api.ActivateUser(sku);
        }

        this.callAlert(res);
      } catch (err) {
        setAlert('change user status', false);
      }
    },
    callAlert(res) {
      if (!res.error) {
        setAlert('changed user status', true);
        this.getUserData();
        this.getMerchantData();
      } else {
        setAlert('change user status', false);
      }
    },
    confirmModal(status, sku) {
      const statusInv = this.getStatus(status);

      this.$bvModal.msgBoxConfirm(`User with sku ${sku} will be ${statusInv}.`, {
        title: 'Change user status',
        size: 'sm',
        okVariant: 'danger',
        okTitle: 'YES',
        cancelVariant: 'outline-secondary',
        cancelTitle: 'NO',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true,
      })
        .then((value) => {
          if (value) {
            this.changeStatus(statusInv, sku);
          }
        });
    },
  },
};
</script>
