<template>
  <div class="menu-modal">
    <b-modal
      id="add-menu-modal"
      :title="title + ' Restaurant Menu'"
      title-class="font-size-24"
      centered
      size="sm"
      ok-title="SUBMIT"
      cancel-title="CANCEL"
    >
      <b-form @submit="submitMenu">
        <b-form-group
          id="menu-name-group"
          label="Name"
          label-for="menu-name"
        >
          <b-form-input
            id="menu-name"
            v-model="menu.name"
            type="text"
            class="border-gray"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="menu-image-group"
          label="Photo"
          label-for="menu-image"
        >
          <b-form-file
            id="menu-image"
            v-model="menu.image"
            required
            plain
          ></b-form-file>
        </b-form-group>

        <b-form-group
          id="menu-category-group"
          label="Category"
          label-for="menu-category"
        >
          <b-form-select
            v-model="menu.category"
            :options="categoryOptions"
          ></b-form-select>
        </b-form-group>

        <b-form-group
          id="menu-price-group"
          label="Price"
          label-for="menu-price"
        >
          <b-form-input
            id="menu-price"
            v-model="menu.price"
            type="text"
            required
            class="border-gray"
          ></b-form-input>
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import api from '../../../api/api';

export default {
  name: 'MenuModal',
  props: {
    title: {
      type: String,
      default: 'Add',
    },
  },
  data() {
    return {
      sku: '',
      menu: {
        id: '',
        name: '',
        image: null,
        category: '',
        price: 0.0,
      },
    };
  },
  methods: {
    submitMenu() {
      const data = {
        name,
        image,
        category,
        price,
      };

      if (this.title === 'Add') {
        api.AddRestaurantMenu(this.sku, data)
          .then((res) => {
            console.log(res);
            this.$route.push('/merchant/bistro');
          })
          .catch((err) => {
            console.log(err);
          });

        return;
      }

      api.EditRestaurantMenu(this.sku, this.menu.id, data)
        .then((res) => {
          console.log(res);
          this.$route.push('/merchant/bistro');
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
