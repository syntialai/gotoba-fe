<template>
  <div class="payment-method-group">
    <b-form-group label="Stacked button style radios">
      <b-form-radio-group
        id="btn-radios-payment-method"
        buttons
        stacked
        name="radio-btn-stacked"
      >
        <b-form-radio
          class="w-100 btn btn-light"
          v-for="method in paymentMethods"
          :key="method.value"
          :value="method.value"
        >
          <div class="payment-name">
            {{ method.name }}
            <b-badge>
              <b-icon
                icon="chevron-right"
                class="icon icon-black-60"
              ></b-icon>
            </b-badge>
          </div>

          <b-form-radio-group
            :id="['btn-radios-' + method.value]"
            buttons
            stacked
            name="radio-btn-stacked"
            v-if="show"
            v-model="selectedMethod"
            :options="method.detail"
          >
          </b-form-radio-group>
        </b-form-radio>
      </b-form-radio-group>
    </b-form-group>
  </div>
</template>

<script>
export default {
  name: 'PaymentMethod',
  data() {
    return {
      selectedMethod: '',
      paymentMethods: [
        { text: 'Bank BCA', value: 'bca' },
        { text: 'Bank BRI', value: 'bri' },
        { text: 'Bank Mandiri', value: 'mandiri' },
        { text: 'Others', value: 'other' },
      ],
    };
  },
};
</script>
