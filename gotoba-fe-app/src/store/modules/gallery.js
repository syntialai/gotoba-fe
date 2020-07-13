/* eslint-disable no-shadow */
import api from '../../api/api';
import * as Types from '../types';

const state = {
  galleryData: [],
  galleryPhoto: {},
};

const actions = {
  getGalleryData({ commit }) {
    commit(Types.SET_GALLERY_DATA);

    api.GetGalleryPhotos()
      .then((res) => {
        commit(Types.SET_GALLERY_DATA, res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getGalleryPhoto({ commit }, sku) {
    commit(Types.SET_GALLERY_PHOTO);

    api.GetGalleryPhotosBySku(sku)
      .then((res) => {
        commit(Types.SET_GALLERY_PHOTO, res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  removeGalleryPhoto({ commit }, sku) {
    commit(Types.REMOVE_GALLERY_PHOTO);

    api.RemoveGalleryPhoto(sku)
      .then((res) => {
        commit(Types.REMOVE_GALLERY_PHOTO, res);
        console.log(`Successfully delete photo with sku: ${sku}`);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

const getters = {
  galleryData: (state) => state.galleryData,
  galleryPhoto: (state) => state.galleryPhoto,
};

const mutations = {
  // eslint-disable-next-line space-before-function-paren
  [Types.SET_GALLERY_DATA](state, res) {
    state.galleryData = res;
  },

  [Types.SET_GALLERY_PHOTO](state, res) {
    state.galleryPhoto = res;
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
