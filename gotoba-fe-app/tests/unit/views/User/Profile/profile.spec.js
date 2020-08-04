import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import Profile from '@/views/User/Profile/Profile.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Profile.vue', () => {
  const expectedData = {
    userName: 'Syntia',
    userImage: '/image/SYNT_0003',
  };

  let getters;
  let store;
  // eslint-disable-next-line no-unused-vars
  let wrapper;

  beforeEach(() => {
    getters = {
      userName: () => 'Syntia',
      userImage: () => '/image/SYNT_0003',
    };
    store = new Vuex.Store({
      getters,
    });
    wrapper = shallowMount(Profile, {
      data() {
        return {
          menuAccount: [
            {
              name: 'Edit Profile', icon: 'user-edit', link: '/profile/edit',
            },
            {
              name: 'History', icon: 'history', link: '/history',
            },
          ],
          menuAbout: [
            {
              name: 'Terms and Condition', icon: 'list-alt', link: '/terms-and-condition',
            },
            {
              name: 'Privacy Policy', icon: 'user-shield', link: '/privacy-policy',
            },
            {
              name: 'Help Centre', icon: 'question-circle', link: '/faq',
            },
          ],
        };
      },
      localVue,
      store,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('Check actions called when created', () => {
    expect(getters.userName()).toMatch(expectedData.userName);
    expect(getters.userImage()).toMatch(expectedData.userImage);
  });
});
