<template>
  <form 
    novalidate="novalidate" 
    @submit.prevent>
    <div class="form-group form-v2-group">
      <label>Voucher Code</label>
      <input 
        v-model="voucher_code" 
        name="voucher_code" 
        type="text" 
        class="form-control">
      <small 
        v-if="voucher_error.code" 
        class="form-error">{{ voucher_error.code }}</small>
    </div>

    <div class="form-group form-v2-group">
      <label>Serial Number</label>
      <input 
        v-model="voucher_serial" 
        name="voucher_serial" 
        type="text" 
        class="form-control">
      <small 
        v-if="voucher_error.serial" 
        class="form-error">{{ voucher_error.serial }}</small>
    </div>

    <div class="text-center mt-30">
      <button
        :disabled="voucher_send"
        type="button"
        class="btn-primary btn-fw btn-outline btn-slim border-radius-30px"
        data-dismiss="modal"
      >Close</button>&nbsp;&nbsp;
      <button
        :disabled="voucher_send"
        type="button"
        class="btn-primary btn-fw btn-slim border-radius-30px"
        @click.prevent="submitVoucher()"
      >Redeem</button>
    </div>
  </form>
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
    async submitVoucher() {
      this.voucher_error.code = '';
      this.voucher_error.serial = '';

      if (!this.voucher_code) {
        this.voucher_error.code = 'Voucher code must be filled in.';
      }

      if (!this.voucher_serial) {
        this.voucher_error.serial = 'Voucher serial must be filled in.';
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
          this.$emit('voucher-sent', res.message);
        } else {
          this.voucher_error.serial = res.error_message;
        }
      } catch (e) {
        this.voucher_error.serial = 'Something went wrong!';
      }

      this.$global.screenUnfreeze();

      this.voucher_send = false;
    }
  }
};
</script>
