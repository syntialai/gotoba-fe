<template>
  <div class="cart">
    <Navigation title="Cart" />

    <div class="order-items p-2">
      <div
        class="w-100 border-bottom-gray-young d-flex justify-content-between"
      >
        <div class="title"><h3>Order Item(s)</h3></div>
        <div class="select-all font-color-black-60">
          <a href="">Select all</a>
        </div>
      </div>
      <div class="order-items-group">
        <div class="order-item-detail"
          v-for="item in items"
          :key="item.name.toLowerCase().replace(' ','-')"
        >
          <b-form-checkbox>
            <div class="order-item-info">
              <OrderItems
                :name="item.name"
                :image="item.image"
                :price="item.price"
                :discountPrice="item.discountPrice"
              />
              <b-button-group size="sm">
                <b-button @click="subItem">-</b-button>
                <b-button :class="['item-'+item.name+'-count']">1</b-button>
                <b-button @click="addItem">+</b-button>
              </b-button-group>
            </div>
          </b-form-checkbox>
        </div>
      </div>
    </div>

    <BottomNavPayment
      totalItem="1"
      totalPrice="100000"
      innerButton="CHECKOUT"
    />
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue';
import BottomNavPayment from '@/components/BottomNavPayment.vue';

export default {
  name: 'Cart',
  component: {
    Navigation,
    BottomNavPayment,
  },
  method: {
    addItem() {

    },
    subItem() {

    },
  }
};
</script>
