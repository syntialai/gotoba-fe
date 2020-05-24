<template>
  <div class="confirm-modal">
    <b-modal
      id="confirm-modal"
      centered
      title="Are you sure?"
    >
      <div class="info font-color-black-60">
        {{ object }} will be removed permanently from this system.
      </div>

      <template
        v-slot:modal-footer="{ ok, cancel }"
        class="d-flex justify-content-between w-100 px-0"
      >
        <div class="w-50 m-0 px-1">
          <b-button
            class="w-100 btn-light border-gray font-color-black-60"
            @click="cancel()"
          >
            Cancel
          </b-button>
        </div>
        <div class="w-50 m-0 px-1">
          <b-button
            class="w-100 custom-btn custom-btn-red"
            @click="ok()"
          >
            OK
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'ConfirmModal',
  props: {
    object: String,
  },
};
</script>
