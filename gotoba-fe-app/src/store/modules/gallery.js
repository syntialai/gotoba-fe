/* eslint-disable no-shadow */
import api from '../../api/api';
import * as Types from '../types';

const state = {
  galleryData: [],
};

const actions = {
  getGalleryData({ commit }) {
    commit(Types.SET_GALLERY_DATA);

    api.GetGalleryPhotos()
      .then((res) => {
        commit(Types.SET_GALLERY_DATA, res);
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
};

const mutations = {
  // eslint-disable-next-line space-before-function-paren
  [Types.SET_GALLERY_DATA](state, res) {
    state.galleryData = res.data;
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
