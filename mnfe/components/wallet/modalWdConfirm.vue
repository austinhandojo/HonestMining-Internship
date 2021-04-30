<template>
  <modal
    id="confirmation"
    :title="$lang.print('wallet.WD_MODAL_CONFIRM_TITLE')"
    @hidden="clearInput"
  >
    <!-- Coin image and name. -->
    <div class="text-center mb-3 px-3">
      <img
        :src="coin.image"
        :alt="coin.ticker"
        width="80"
        height="80"
        class="object-fit-contain mb-3"
      >
      <h2 class="m-0 font-size-6 text-primary text-uppercase">{{ coin.name }} ({{ coin.ticker }})</h2>
    </div>

    <!-- Address and memo. -->
    <div class="text-center mb-4 px-3">
      <div class="mb-2">
        <span
          class="text-gray-20 font-size-12-px font-size-md-14-px"
        >{{ $lang.print('wallet.WD_ADDRESS_LABEL') }}</span>
        <br >
        <strong>{{ data.wd_address }}</strong>
      </div>
      <div v-if="data.wd_use_memo">
        <span
          class="text-gray-20 font-size-12-px font-size-md-14-px"
        >{{ $lang.print('wallet.WD_MEMO_LABEL') }}</span>
        <br >
        <strong>{{ data.wd_memo }}</strong>
      </div>
    </div>

    <!-- Wd amount. -->
    <div
      class="d-flex align-items-center justify-content-between mb-2 px-3 font-size-12-px font-size-md-14-px"
    >
      <div class="text-gray-20">{{ $lang.print('wallet.WD') }}</div>
      <div class="text-right">
        {{ $filters.numberFormat(data.wd_amount, 8, true) || 0 }}
        <span
          class="text-gray-20"
        >{{ coin.ticker }}</span>
      </div>
    </div>

    <!-- Wd fee. -->
    <div
      class="d-flex align-items-center justify-content-between mb-3 px-3 font-size-12-px font-size-md-14-px"
    >
      <div class="text-gray-20">{{ $lang.print('wallet.WD_FEE_LABEL') }}</div>
      <div class="text-right text-gray">
        (
        <span
          class="text-default"
        >{{ $filters.numberFormat($lodash.get(data, 'data.feeInfo.original_amount'), 8, true) || 0 }}</span>
        <span class="text-gray-20">{{ coin.ticker }}</span>)
      </div>
    </div>

    <!-- Wd total. -->
    <div
      class="d-flex align-items-center justify-content-between mb-4 font-weight-bold px-3 text-gray-20 font-size-12-px font-size-md-14-px"
    >
      <div>{{ $lang.print('wallet.WD_TOTAL_LABEL') }}</div>
      <div class="text-right">
        <span class="text-primary">{{ totalReceived }}</span>
        {{ coin.ticker }}
      </div>
    </div>

    <!-- 2fa input. -->
    <div
      :class="{'mb-4': g2fa_token_error}"
      class="form-group mb-2 px-3 d-md-flex align-items-center position-relative"
    >
      <label
        class="font-weight-normal w-100 w-md-25 font-size-12-px font-size-md-14-px text-gray-20"
      >{{ $lang.print('wallet.WD_2FA_LABEL') }}</label>
      <div class="position-relative flex-fill">
        <input
          v-model="g2fa_token"
          placeholder="000000"
          type="tel"
          class="form-control w-100 text-primary placeholder-text-primary"
          @keypress="$filters.inputCheckNumber($event, false, 6)"
        >
        <div
          v-if="g2fa_token_error"
          class="form-error font-size-12-px font-size-md-13-px position-absolute"
        >{{ g2fa_token_error }}</div>
      </div>
    </div>

    <!-- Internal note. -->
    <div
      v-if="$lodash.get(data, 'data.feeInfo.is_internal')"
      class="px-3 pt-2">
      <div class="text-primary font-size-12-px font-size-md-13-px">
        <i v-html="$lang.print('wallet.WD_MODAL_CONFIRM_INTERNAL_NOTE')" />
      </div>
    </div>

    <!-- Notice. -->
    <div class="px-3">
      <div class="bg-gray-5 mt-4 mb-4 p-3 border-radius-4-px font-size-12-px font-size-md-14-px">
        <div class="font-weight-bold mb-3 text-uppercase font-size-14-px">{{ $lang.print('wallet.NOTICE_TITLE') }}</div>

        <div class="text-default">{{ $lang.print('wallet.WD_MODAL_CONFIRM_NOTICE') }}</div>
      </div>
    </div>

    <!-- Buttons. -->
    <div class="d-flex justify-content-center mx-md-5 px-3">
      <button
        :disabled="wdPost"
        type="button"
        class="btn-base btn-primary btn-outline mr-4 flex-fill px-0"
        data-dismiss="modal"
      >{{ $lang.print('global.CANCEL') }}</button>
      <button
        :disabled="wdPost"
        :class="{'btn-loader': wdPost}"
        class="btn-base btn-primary px-0 flex-fill"
        @click="postWd()"
      >{{ wdPost ? `${ $lang.print('global.LOADING') }...` : $lang.print('wallet.WD_BUTTON', {t: coin.ticker}) }}</button>
    </div>
  </modal>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      isShown: false,
      wdPost: false,
      g2fa_token: '',
      g2fa_token_error: ''
    };
  },

  computed: {
    coin() {
      return this.$store.getters['v2_coin/getCoin'](this.$route.params.ticker);
    },

    totalReceived() {
      return (
        (this.data.wd_amount || 0) -
        this.$lodash.get(this.data, 'data.feeInfo.original_amount', 0)
      );
    }
  },

  methods: {
    async postWd() {
      this.g2fa_token_error = '';

      if (!this.g2fa_token) {
        this.g2fa_token_error = this.$lang.print(
          'global.INPUT_2FA_ERROR_EMPTY'
        );

        return;
      }

      this.wdPost = true;

      this.$global.screenFreeze();

      let input = {
        coin_id: parseInt(this.coin.id),
        amount: parseFloat(this.totalReceived),
        coin_address: this.data.wd_address,
        token2fa: this.g2fa_token.toString(),
        memo: ''
      };

      if (this.data.wd_use_memo) {
        input.memo = this.data.wd_memo;
      }

      let { status, data } = await this.$store.dispatch(
        'v2_wallet/postWd',
        input
      );

      if (status === 200) {
        $('#confirmation').modal('toggle');

        this.$emit('post-wd-success', this.totalReceived);
      } else {
        if (data.service === 'two_factor_authenticate') {
          this.g2fa_token_error = this.$lang.print('global.INPUT_2FA_ERROR');
        } else {
          $('#confirmation').modal('toggle');

          this.$emit('post-wd-error', data.error_message);
        }
      }

      this.wdPost = false;

      this.$global.screenUnfreeze();
    },

    clearInput() {
      this.g2fa_token = '';
      this.g2fa_token_error = '';
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~/assets/style/revs/_variables.scss';

hr {
  height: 1px;
  border-top: 1px solid $color-border;
  margin: 10px 0;
}

.wd-form-item {
  position: relative;

  .form-control {
    padding-right: 60px;
  }

  .wd-form-ticker {
    position: absolute;
    top: 0;
    right: 10px;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .wd-form-error {
    position: absolute;
    top: 100%;
    right: 0;
  }
}
</style>
