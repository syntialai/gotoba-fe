<template>
  <b-table
    :fields="fields"
    :items="items"
    :per-page="perPage"
    responsive="sm"
  >
    <template v-slot:cell(user)="data">
      <div class="d-flex align-items-center">
        <div class="user-img">
          <img
            :src="data.value.image"
            :alt="data.items"
            width="40px"
            height="40px"
          >
        </div>
        <div class="user-name">
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
  computed: {
    fields: [
      {
        key: 'user',
        sortable: true,
      },
    ],
    items: [],
  },
  methods: {
    toCapitalize,
  },
};
</script>
