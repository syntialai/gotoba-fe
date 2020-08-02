<template>
  <div class="card-payment">
    <b-card class="box-shadow mb-2 border-square-10 bg-white">
      <b-row no-gutters class="p-2">
        <b-col md="6" class="mb-2">
          <div class="expiry-date">
            Valid before <span class="semibold">{{ expiryDate }}</span>
          </div>
          <order-items
            :name="item.title"
            :image="item.image"
            :price="item.price"
            :quantity="item.quantity"
            :discountPrice="item.discount"
          />
        </b-col>
        <b-col md="6">
          <div
            v-if="pay"
            class="button-list d-flex justify-content-between flex-md-column-reverse"
          >
            <b-button
              class="custom-btn-red"
              @click="rejectOrder"
            >REJECT</b-button>
            <b-button
              class="custom-btn-green"
              @click="acceptOrder"
            >ACCEPT</b-button>
          </div>
          <div v-else>
            <div
              :class="'border-top-gray-young pt-2 semibold font-color-'
              + (status[0] ? 'green' : 'red')"
            >
              {{ status[1] }}
            </div>
          </div>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { formatDate } from '../../../utils/filter';
import { alert } from '../../../utils/tool';
import api from '../../../api/api';
import OrderItems from '../../User/OrderItems.vue';

export default {
  name: 'CardPayment',
  components: {
    OrderItems,
  },
  props: {
    item: Object,
    pay: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    expiryDate() {
      return formatDate(new Date(this.item.expiredDate));
    },
    status() {
      if (this.item.status === 3) {
        return [true, 'ACCEPTED'];
      }
      return [false, 'REJECTED'];
    },
  },
  methods: {
    ...mapActions([
      'addItineraryOrderCount',
      'addRestaurantOrderCount',
      'getMerchantOrderData',
    ]),
    async acceptOrder() {
      try {
        const res = await api.ApproveOrder(this.item.sku);
        if (!res.error) {
          if (this.item.category === 'restaurant') {
            this.addRestaurantOrderCount();
            this.getMerchantOrderData();
            alert('accepted order', true);
            return;
          }
          this.addItineraryOrderCount();
          this.getMerchantOrderData();
          alert('accepted order', true);
          return;
        }
        alert('accept order', false);
      } catch (err) {
        alert('accept order', false);
      }
    },
    async rejectOrder() {
      try {
        const res = await api.RejectOrder(this.item.sku);
        if (!res.error) {
          this.getMerchantOrderData();
          alert('rejected order', true);
          return;
        }
        alert('reject order', false);
      } catch (err) {
        alert('reject order', false);
      }
    },
  },
};
</script>
