<template>
  <div class="add-photo">
    <b-modal
      id="add-photo-modal"
      :title="title + ' Photo'"
      title-class="font-size-24"
      centered
      size="sm"
      @ok="submitPhoto"
      ok-title="SUBMIT"
      cancel-title="CANCEL"
    >
      <b-form @submit.stop.prevent="submitPhoto">
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
          <div v-if="image === null">
            <b-form-file
              id="photo-image"
              v-model="photo.image"
              @change="loadImage"
              accept="image/jpeg, image/jpg, image/png"
              required
              plain
            ></b-form-file>
          </div>
          <div v-else>
            <b-img
              :src="image"
              center
              :width="100"
            ></b-img>
            <b-button
              size="sm"
              class="custom-btn-gray mt-2"
              @click="removePhoto"
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
import { mapGetters } from 'vuex';
import previewImage from '../../../utils/fileHelper';
import api from '../../../api/api';

export default {
  name: 'PhotoModal',
  data() {
    return {
      photo: this.photos,
      image: null,
    };
  },
  computed: {
    ...mapGetters(['galleryPhoto']),
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
        image: this.image,
        show: true,
      };

      if (data.name === '' || data.title === '' || data.image === null) {
        return;
      }

      if (this.title === 'Add') {
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
      api.EditGalleryPhoto(this.$route.params.sku, data)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    loadImage(event) {
      const { files } = event.target;

      if (files && files[0]) {
        previewImage(files[0])
          .then((res) => {
            this.image = res;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    removePhoto() {
      this.photo.image = null;
    },
  },
};
</script>
