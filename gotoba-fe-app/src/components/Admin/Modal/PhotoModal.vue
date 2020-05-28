<template>
  <div class="add-photo">
    <b-modal
      id="add-photo-modal"
      :title="title + ' Photo'"
      title-class="font-size-24"
      centered
      size="sm"
      ok-title="SUBMIT"
      cancel-title="CANCEL"
    >
      <b-form @submit="submitPhoto">
        <b-form-group
          id="photo-title-group"
          label="Title"
          label-for="photo-title"
        >
          <b-form-input
            id="photo-title"
            v-model="photo.title"
            type="text"
            class="border-gray"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="photo-image-group"
          label="Photo"
          label-for="photo-image"
        >
          <div v-if="photo.image === null">
            <b-form-file
              id="photo-image"
              v-model="photo.image"
              required
              plain
            ></b-form-file>
          </div>
          <div v-else>
            <img :src="photo.image">
            <b-button
              class="custom-btn-gray-young"
              @click="photo.image = null"
            >Remove photo</b-button>
          </div>
        </b-form-group>

        <b-form-group
          id="photo-description-group"
          label="Description"
          label-for="photo-description"
        >
          <b-form-textarea
            id="photo-description"
            v-model="photo.description"
            rows="5"
            max-rows="6"
            class="border-gray"
          ></b-form-textarea>
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import previewImage from '../../../utils/fileHelper';
import api from '../../../api/api';

export default {
  name: 'PhotoModal',
  data() {
    return {
      photo: this.photos,
    };
  },
  props: {
    title: {
      type: String,
      default: 'Add',
    },
    photos: {
      type: Object,
      default: () => (
        {
          title: '',
          image: null,
          description: '',
        }
      ),
    },
  },
  methods: {
    submitPhoto() {
      const data = {
        name: this.photo.title,
        title: this.photo.title,
        description: this.photo.description,
        image: this.photo.file,
        show: true,
      };

      if (title === 'Add') {
        api.PostGalleryPhoto(data)
          .then((res) => {
            console.log(res);
            this.$router.push({ path: '/admin/gallery' });
          })
          .catch((err) => {
            console.log(err);
          });
        return;
      }
      api.EditGalleryPhoto(sku, data)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    previewImage,
  },
  mounted() {
    this.submitPhoto();
  },
};
</script>
