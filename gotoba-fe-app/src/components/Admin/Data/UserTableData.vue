<template>
  <b-table
    :fields="fields"
    :items="items"
    :per-page="perPage"
    responsive="sm"
    class="bg-white"
  >
    <template v-slot:cell(user)="data">
      <div class="d-flex align-items-center">
        <div class="user-img">
          <img
            :src="data.value.image"
            :alt="data.items"
            class="border-circle"
            width="40px"
            height="40px"
          >
        </div>
        <div class="user-name ml-3">
          {{ toCapitalize(data.value.name) }}
        </div>
      </div>
    </template>

    <template v-slot:cell(status)="data">
      <b-badge href="" :variant="data.value === 'active'? 'success' : 'danger'">
        {{ data.value }}
      </b-badge>
    </template>
  </b-table>
</template>

<script>
import { toCapitalize } from '../../../utils/filter';

export default {
  name: 'UserTableData',
  props: {
    perPage: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
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
      items: [
        {
          user: {
            image: 'https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg',
            name: 'user one',
          },
          status: 'active',
          sku: 'USER_0001_0001',
          email: 'user_one@gmail.com',
        },
        {
          user: {
            image: 'https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg',
            name: 'user two',
          },
          status: 'blocked',
          sku: 'USER_0001_0002',
          email: 'user_two@gmail.com',
        },
      ],
    };
  },
  methods: {
    toCapitalize,
  },
};
</script>
