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
          <div v-if="menu.image === null">
            <b-form-file
              id="menu-image"
              v-model="menu.image"
              @change="loadImage"
              accept="image/jpeg, image/jpg, image/png"
              required
              plain
            ></b-form-file>
          </div>
          <div v-else>
            <b-img :src="menu.image" center :width="100"></b-img>
            <b-button
              size="sm"
              class="custom-btn-gray mt-2"
              @click="removePhoto"
            >Remove photo</b-button>
          </div>
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
import { mapActions, mapGetters } from 'vuex';
import previewImage from '../../../utils/fileHelper';
import api from '../../../api/api';

export default {
  name: 'MenuModal',
  computed: {
    ...mapGetters(['imagePreview']),
  },
  props: {
    title: {
      type: String,
      default: 'Add',
    },
  },
  data() {
    return {
      menu: {
        id: '',
        name: '',
        image: this.imagePreview,
        category: '',
        price: 0.0,
      },
    };
  },
  methods: {
    ...mapActions(['setImagePreview']),
    submitMenu() {
      const data = {
        name,
        image,
        category,
        price,
      };

      if (this.title === 'Add') {
        api.AddRestaurantMenu(this.$route.params.sku, data)
          .then((res) => {
            console.log(res);
            this.$route.push('/merchant/bistro');
          })
          .catch((err) => {
            console.log(err);
          });

        return;
      }

      api.EditRestaurantMenu(this.$route.params.sku, this.$route.params.id, data)
        .then((res) => {
          console.log(res);
          this.$route.push('/merchant/bistro');
        })
        .catch((err) => {
          console.log(err);
        });
    },
    loadImage(event) {
      const { files } = event.target;

      if (files && files[0]) {
        previewImage(files[0]);
      }
    },
    removePhoto() {
      this.setImagePreview(null);
    },
  },
};
</script>
