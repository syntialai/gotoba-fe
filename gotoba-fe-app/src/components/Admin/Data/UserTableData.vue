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

    <template v-slot:cell(status)="data">
      <b-badge :variant="data.value === 'active'? 'success' : 'danger'">
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
    toCapitalize,
  },
};
</script>
