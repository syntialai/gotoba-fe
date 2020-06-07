<template>
  <div class="bistro-promotion">
    <card-promotion :detail="detail" />
  </div>
</template>

<script>
import CardPromotion from '../../../components/Merchant/Card/CardPromotion.vue';

export default {
  name: 'SpotPromotion',
  components: {
    CardPromotion,
  },
  data() {
    return {
      detail: {
        title: '',
        image: null,
        info: '',
      },
    };
  },
};
</script>
