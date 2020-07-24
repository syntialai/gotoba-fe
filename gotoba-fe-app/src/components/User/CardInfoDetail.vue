<template>
  <div class="card-description-detail">
    <b-aspect aspect="16:9">
      <b-img
        :src="imageUrl"
        :alt="'Image-' + info.title"
        class="w-100"
      ></b-img>
    </b-aspect>
    <div class="info mt-3 mb-2 p-3 bg-white">
      <div class="title">
        <div class="category-info font-size-12">
          {{ category }}
        </div>
        <h5>
          {{ info.title }}
        </h5>
      </div>
      <div class="important-info mt-3">
        <div class="price-info">
          <div class="font-size-14">
            <font-awesome-icon
              icon="tag"
              class="icon-gradient"
            ></font-awesome-icon>
            <span class="pl-2">Starts from</span>
          </div>
          <div class="pl-4">
            <span class="price-total bold font-color-accent-orange">
              {{ total }}
            </span>
            <span class="price strikethrough font-size-14 pl-2">
              {{ price }}
            </span>
          </div>
        </div>
        <div class="date-info mt-2">
          <div class="font-size-14">
            <font-awesome-icon
              icon="calendar-check"
              class="icon-gradient"
            ></font-awesome-icon>
            <span class="pl-2">Valid before</span>
          </div>
          <div class="expired-date semibold pl-4">
            {{ expiredDate }}
          </div>
        </div>
      </div>
    </div>
    <div class="description p-3 bg-white mb-5 mt-2">
      <h6>Description</h6>
      <p class="mt-3">
        {{ info.description }}
      </p>
    </div>
  </div>
</template>

<script>
import { formatPrice, formatDate, toCapitalize } from '../../utils/filter';
import api from '../../api/api';

export default {
  name: 'CardInfoDetail',
  props: {
    info: Object,
  },
  computed: {
    imageUrl() {
      return api.imageUrl(this.info.image);
    },
    price() {
      return formatPrice(this.info.price, true, true);
    },
    total() {
      return formatPrice(this.info.price - this.info.discount, true, true);
    },
    expiredDate() {
      return formatDate(new Date(this.info.expiredDate));
    },
    category() {
      return toCapitalize(this.info.category);
    },
  },
};
</script>
