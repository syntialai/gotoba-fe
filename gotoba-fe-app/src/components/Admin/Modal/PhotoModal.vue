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
      <ValidationObserver>
        <b-form @submit.stop.prevent="submitPhoto">
          <ValidationProvider
            name="Title"
            rules="required"
            v-slot="validationContext"
          >
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
                :state="getValidationState(validationContext)"
                aria-describedby="photo-title-feedback-msg"
              ></b-form-input>
              <b-form-invalid-feedback id="photo-title-feedback-msg">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>

          <ValidationProvider
            name="Photo"
            rules="required"
            v-slot="validationContext"
          >
            <b-form-group
              id="photo-image-group"
              label="Photo"
              label-for="photo-image"
            >
              <div v-if="!photo.image || photo.image === null">
                <b-form-file
                  id="photo-image"
                  v-model="photo.image"
                  @change="loadImage"
                  accept="image/jpeg, image/jpg, image/png"
                  required
                  plain
                  :state="getValidationState(validationContext)"
                  aria-describedby="photo-image-feedback-msg"
                ></b-form-file>
                <b-form-invalid-feedback id="photo-image-feedback-msg">
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </div>
              <div v-else>
                <b-img
                  :src="photo.image"
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
          </ValidationProvider>

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
      </ValidationObserver>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { alert } from '../../../utils/tool';
import getValidationState from '../../../utils/validation';
import previewImage from '../../../utils/fileHelper';
import api from '../../../api/api';

export default {
  name: 'PhotoModal',
  computed: {
    ...mapGetters(['galleryPhoto']),
  },
  created() {
    if (this.title === 'Edit') {
      this.getGalleryPhoto(this.$route.params.sku);
    } else {
      this.setGalleryPhoto({});
    }
  },
  props: {
    title: {
      type: String,
      default: 'Add',
    },
  },
  data() {
    return {
      photo: {
        title: '',
        description: '',
        image: null,
      },
    };
  },
  methods: {
    ...mapActions(['getGalleryPhoto', 'setGalleryPhoto']),

    getValidationState,

    submitPhoto() {
      const data = {
        name: this.photo.title,
        title: this.photo.title,
        description: this.photo.description,
        image: this.photo.image,
        show: true,
      };

      if (data.title === '' || data.image === null) {
        return;
      }

      if (this.title === 'Add') {
        api.PostGalleryPhoto(data)
          .then((res) => {
            if (!res.error) {
              alert('added photo', true);
              return;
            }
            alert('to add photo', false);
          })
          .catch((err) => {
            console.log(err);
            alert('to add photo', false);
          });

        return;
      }

      api.EditGalleryPhoto(this.$route.params.sku, data)
        .then((res) => {
          if (!res.error) {
            alert('updated photo', true);
            return;
          }
          alert('to update photo', false);
        })
        .catch((err) => {
          console.log(err);
          alert('to update photo', false);
        });
    },

    loadImage(event) {
      const { files } = event.target;

      if (files && files[0]) {
        previewImage(files[0])
          .then((res) => {
            this.photo.image = res.toString();
          })
          .catch((err) => {
            console.log(err);
            alert('to show photo', false);
          });
      }
    },

    removePhoto() {
      this.photo.image = null;
    },
  },
  watch: {
    galleryPhoto() {
      this.photo = { ...this.galleryPhoto };
    },
  },
};
</script>
