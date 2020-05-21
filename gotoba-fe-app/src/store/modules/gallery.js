/* eslint-disable no-shadow */
import api from '../../api/api';
import * as Types from '../types';

const state = {
  galleryData: [],
};

const actions = {
  getGalleryData({ commit }) {
    commit(Types.GET_GALLERY_DATA);

    api.GetGalleryPhotos()
      .then((res) => {
        commit(Types.GET_GALLERY_DATA, res);
      });
  },
};

const getters = {
  galleryData: (state) => state.galleryData,
};

const mutations = {
  // eslint-disable-next-line space-before-function-paren
  [Types.GET_GALLERY_DATA](state, res) {
    state.galleryData = res.data;
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
