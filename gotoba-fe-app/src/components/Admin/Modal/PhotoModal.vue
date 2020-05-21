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
          id="photo-file-group"
          label="Photo"
          label-for="photo-file"
        >
          <b-form-file
            id="photo-file"
            v-model="photo.file"
            required
            plain
          ></b-form-file>
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
import api from '../../../api/api';

export default {
  name: 'PhotoModal',
  data() {
    return {
      photo: {
        title: '',
        file: null,
        description: '',
      },
    };
  },
  props: {
    title: {
      type: String,
      default: 'Add',
    },
  },
  methods: {
    submitPhoto() {
      let data = {
        name: this.title,
        title: this.title,
        description: this.description,
        image: this.file,
        show: true,
      };

      api.PostGalleryPhoto(data)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.submitPhoto();
  },
};
</script>
