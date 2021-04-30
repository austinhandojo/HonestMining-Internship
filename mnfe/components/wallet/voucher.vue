<template>
  <div>
    <modal
      id="voucherFormModal"
      :title="$lang.print('wallet.VOUCHER_MODAL_TITLE')"
      size="small"
      @hidden="clearInput"
    >
      <form
        novalidate="novalidate"
        autocomplete="off"
        @submit.prevent>
        <div class="form-group mb-15">
          <label
            class="font-weight-normal text-gray-20 font-size-12-px font-size-md-14-px"
          >{{ $lang.print('wallet.VOUCHER_CODE_LABEL') }}</label>
          <input
            v-model="voucher_code"
            type="text"
            class="form-control text-primary placeholder-text-primary"
            name="voucher_code"
            placeholder="000 000"
          >
          <span
            v-if="voucher_error.code"
            class="form-error d-block font-size-12-px font-size-md-14-px">{{ voucher_error.code }}</span>
        </div>

        <div class="form-group mb-15">
          <label
            class="font-weight-normal text-gray-20 font-size-12-px font-size-md-14-px"
          >{{ $lang.print('wallet.VOUCHER_SERIAL_LABEL') }}</label>
          <input
            v-model="voucher_serial"
            type="text"
            class="form-control text-primary placeholder-text-primary"
            name="voucher_serial"
            placeholder="000 000"
          >
          <span
            v-if="voucher_error.serial"
            class="form-error d-block font-size-12-px font-size-md-14-px">{{ voucher_error.serial }}</span>
        </div>

        <div class="text-center mt-30 d-flex justify-content-between">
          <button
            :disabled="voucher_send"
            type="button"
            class="btn-base btn-primary btn-outline btn-slim flex-grow-1 w-50"
            data-dismiss="modal"
          >{{ $lang.print('wallet.VOUCHER_BTN_CANCEL') }}</button>&nbsp;&nbsp;
          <button
            :disabled="voucher_send"
            :class="{'btn-loader': voucher_send}"
            type="button"
            class="btn-base btn-primary btn-slim flex-grow-1 w-50"
            @click.prevent="submitVoucher()"
          >{{ voucher_send ? `${ $lang.print('global.LOADING') }...` : $lang.print('wallet.VOUCHER_BTN_SUBMIT') }}</button>
        </div>
      </form>
    </modal>

    <!-- Modal success. -->
    <modal
      id="voucherSuccessModal"
      :content="$lang.print('wallet.VOUCHER_SUCCESS_TEXT')"
      :salute="$lang.print('wallet.VOUCHER_SUCCESS_SALUTE')"
      type="success"
      @hidden="$router.push('/tx')"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      voucher_code: '',
      voucher_serial: '',
      voucher_error: {
        code: '',
        serial: ''
      },
      voucher_send: false
    };
  },

  methods: {
    clearInput() {
      this.voucher_code = '';
      this.voucher_serial = '';
      this.voucher_error.code = '';
      this.voucher_error.serial = '';
    },

    async submitVoucher() {
      this.voucher_error.code = '';
      this.voucher_error.serial = '';

      if (!this.voucher_code) {
        this.voucher_error.code = this.$lang.print('wallet.VOUCHER_CODE_ERROR');
      }

      if (!this.voucher_serial) {
        this.voucher_error.serial = this.$lang.print(
          'wallet.VOUCHER_SERIAL_ERROR'
        );
      }

      if (this.voucher_error.code || this.voucher_error.serial) return;

      this.voucher_send = true;

      this.$global.screenFreeze();

      try {
        let res = await this.$store.dispatch('postRedeemVoucher', {
          code: this.voucher_code,
          serial: this.voucher_serial
        });

        if (res.status === true) {
          $('#voucherFormModal').modal('toggle');

          $('#voucherSuccessModal').modal('toggle');
        } else {
          this.voucher_error.serial = res.error_message;
        }
      } catch (e) {
        this.voucher_error.serial = this.$lang.print(
          'wallet.VOUCHER_MISC_ERROR'
        );
      }

      this.$global.screenUnfreeze();

      this.voucher_send = false;
    }
  }
};
</script>
