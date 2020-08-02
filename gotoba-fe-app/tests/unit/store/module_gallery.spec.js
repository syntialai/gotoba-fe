import api from '@/api/api';
import * as Types from '@/store/types';
import gallery from '@/store/modules/gallery';

jest.mock('@/api/api', () => ({
  GetGalleryPhotos: jest.fn(),
  GetGalleryPhotosBySku: jest.fn(),
  RemoveGalleryPhoto: jest.fn(),
}));

const store = gallery;

describe('Gallery modules', () => {
  const data = {
    state: {
      galleryData: [],
      galleryPhoto: {},
    },
    getters: {
      galleryData: [{
        sku: 'PHOT_0001',
      }],
      galleryPhoto: {
        sku: 'PHOT_0001',
      },
    },
  };

  it('Getters', () => {
    const state = {
      ...data.getters,
    };

    expect(store.getters.galleryData(state)).toStrictEqual(state.galleryData);
    expect(store.getters.galleryPhoto(state)).toStrictEqual(state.galleryPhoto);
  });

  it('Mutations', () => {
    const state = {
      ...data.state,
    };
    const res = {
      ...data.getters,
    };

    store.mutations[Types.SET_GALLERY_DATA](state, res.galleryData);
    store.mutations[Types.SET_GALLERY_PHOTO](state, res.galleryPhoto);

    expect(state.galleryData).toStrictEqual(res.galleryData);
    expect(state.galleryPhoto).toStrictEqual(res.galleryPhoto);

    store.mutations[Types.REMOVE_GALLERY_PHOTO](state, data.getters.galleryData[0].sku);
    expect(state.galleryData).toStrictEqual([]);
  });

  describe('Actions', () => {
    let commit;

    beforeEach(() => {
      commit = jest.fn();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('getGalleryData - success', async () => {
      api.GetGalleryPhotos.mockResolvedValue({
        data: data.getters.galleryData,
      });

      await store.actions.getGalleryData({ commit });

      expect(commit).toHaveBeenCalledTimes(2);
      expect(commit).toHaveBeenCalledWith(
        Types.SET_GALLERY_DATA,
        data.getters.galleryData,
      );
    });

    it('getGalleryData - error', async () => {
      api.GetGalleryPhotos.mockRejectedValue(new Error());

      await store.actions.getGalleryData({ commit });

      expect(commit).toHaveBeenCalledTimes(1);
    });

    it('getGalleryPhoto - success', async () => {
      api.GetGalleryPhotosBySku.mockResolvedValue({
        data: data.getters.galleryPhoto,
      });

      await store.actions.getGalleryPhoto({ commit }, data.getters.galleryPhoto.sku);

      expect(commit).toHaveBeenCalledTimes(2);
      expect(commit).toHaveBeenCalledWith(
        Types.SET_GALLERY_PHOTO,
        data.getters.galleryPhoto,
      );
    });

    it('getGalleryPhoto - error', async () => {
      api.GetGalleryPhotosBySku.mockRejectedValue(new Error());

      await store.actions.getGalleryPhoto({ commit }, data.getters.galleryPhoto.sku);

      expect(commit).toHaveBeenCalledTimes(1);
    });

    it('setGalleryPhoto', () => {
      store.actions.setGalleryPhoto({ commit }, data.getters.galleryPhoto);

      expect(commit).toHaveBeenCalledTimes(1);
      expect(commit).toHaveBeenCalledWith(
        Types.SET_GALLERY_PHOTO,
        data.getters.galleryPhoto,
      );
    });

    it('Remove gallery photo - success', async () => {
      api.RemoveGalleryPhoto.mockResolvedValue({
        code: 200,
        status: 'OK',
      });

      await store.actions.removeGalleryPhoto({ commit }, data.getters.galleryPhoto.sku);

      expect(commit).toHaveBeenCalledTimes(2);
      expect(commit).toHaveBeenCalledWith(
        Types.REMOVE_GALLERY_PHOTO,
        data.getters.galleryPhoto.sku,
      );
    });

    it('Remove gallery photo - error promise', async () => {
      api.RemoveGalleryPhoto.mockResolvedValue({
        status: 404,
        error: 'Not Found',
      });

      await store.actions.removeGalleryPhoto({ commit }, data.getters.galleryPhoto.sku);

      expect(commit).toHaveBeenCalledTimes(1);
    });

    it('Remove gallery photo - error', async () => {
      api.RemoveGalleryPhoto.mockRejectedValue(new Error());

      await store.actions.removeGalleryPhoto({ commit }, data.getters.galleryPhoto.sku);

      expect(commit).toHaveBeenCalledTimes(1);
    });
  });
});
