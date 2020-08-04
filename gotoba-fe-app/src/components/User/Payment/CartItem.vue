<template>
  <div class="cart-item mb-3">
    <div class="d-flex">
      <b-img :src="imageUrl" />
      <div class="cart-item__info pl-3">
        <div>
          <div class="item__name font-color-black-87 d-block">
            {{ ticket.title }}
          </div>
          <div class="mb-2 d-flex">
            <div
              :class="{ 'strikethrough': ticket.discount > 0 }"
            >
              {{ formatPrice(ticket.price) }}
            </div>
            <div v-if="ticket.discount > 0" class="pl-1 discount-price font-color-red semibold">
              {{ formatPrice(ticket.price - ticket.discount) }}
            </div>
          </div>
        </div>
        <div class="d-flex mt-3">
          <div class="edit-cart-data">
            <b-form-spinbutton
              id="item"
              class="border-gray"
              v-model="itemCount"
              @change="updateQuantity"
              min="1"
              max="50"
            />
          </div>
          <div class="delete-cart-data ml-3">
            <b-button @click="removeOrder(ticket.sku)" class="custom-btn-gray">
              <span class="icon-white">
                <b-icon icon="trash"></b-icon>
              </span>
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import api from '../../../api/api';
import { toast } from '../../../utils/tool';
import { formatPrice } from '../../../utils/filter';

export default {
  name: 'CartItem',
  props: {
    ticket: Object,
  },
  computed: {
    imageUrl() {
      return api.imageUrl(this.ticket.image);
    },
  },
  data() {
    return {
      itemCount: this.ticket.quantity,
    };
  },
  methods: {
    ...mapActions(['removeOrder']),
    formatPrice,
    async updateQuantity() {
      this.$emit('update:quantity', this.itemCount);

      const data = { ...this.ticket };
      data.quantity = this.itemCount;

      try {
        await api.EditOrderDetail(this.ticket.sku, data);
        toast('Updated cart item!');
      } catch (err) {
        console.log(err);
        toast('Error while adding ticket');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
img {
  width: 60px;
  height: 60px;

  @media screen and (min-width: 425px) {
    width: 80px;
    height: 80px;
  }

  @media screen and (min-width: 768px) {
    width: 100px;
    height: 100px;
  }
}

.cart-item__size {
  height: 60px;

  @media screen and (min-width: 425px) {
    height: 80px;
  }

  @media screen and (min-width: 768px) {
    height: 100px;
  }
}
</style>
