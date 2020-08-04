import { shallowMount } from '@vue/test-utils';
import CardPromotion from '@/components/Merchant/Card/CardPromotion.vue';

describe('CardPromotion.vue', () => {
  it('Check cardPromotion rendered', () => {
    const wrapper = shallowMount(CardPromotion);
    expect(wrapper.isVueInstance()).toBe(true);
  });
});
