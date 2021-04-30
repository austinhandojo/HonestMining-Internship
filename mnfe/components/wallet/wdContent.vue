<template>
  <div>
    <!-- Header. -->
    <general-header :ticker="$route.params.ticker" />

    <div class="row text-gray-20">
      <div class="col-lg-6 border-0 border-md-right border-color-gray-10 border-right-style-dotted">
        <!-- Wd amount input. -->
        <div class="form-group wd-form-item mb-4 position-relative">
          <div
            :class="{'pb-4': withdrawal_amount_error}"
            class="d-block d-md-flex align-items-center"
          >
            <label
              class="font-weight-normal w-100 w-md-50 font-size-12-px font-size-md-14-px"
            >{{ $lang.print('wallet.WD_AMOUNT_LABEL') }}</label>
            <div class="w-100 position-relative">
              <input
                :placeholder="$filters.numberFormat(info.wd_min, 8) || 0"
                v-model="withdrawal_amount"
                type="tel"
                class="form-control text-right w-100 text-primary placeholder-text-primary"
                @keypress="$filters.inputCheckNumber($event)"
                @change="checkAmount()"
              >
              <div class="font-size-13-px text-nowrap wd-form-ticker">{{ coin.ticker }}</div>
              <div
                v-if="withdrawal_amount_error"
                class="form-error font-size-12-px font-size-md-13-px w-100 position-absolute"
              >{{ withdrawal_amount_error }}</div>
            </div>
          </div>
        </div>

        <!-- Wd fee. -->
        <div class="form-group wd-form-item mb-0">
          <div class="d-flex align-items-center">
            <label
              class="font-weight-normal flex-grow-1 font-size-12-px font-size-md-14-px"
            >{{ $lang.print('wallet.WD_FEE_LABEL') }}</label>
            <div class="text-right">
              <span>({{ $filters.numberFormat(info.wd_fee, 8, true) }} {{ coin.ticker }})</span>
            </div>
          </div>
        </div>

        <hr class="border-color-gray-10 my-4 border-top-style-dotted" >

        <!-- Total received input. -->
        <div class="form-group wd-form-item mb-0 position-relative">
          <div
            :class="{'pb-4': total_withdrawal_error}"
            class="d-block d-md-flex align-items-center"
          >
            <label
              class="font-weight-normal w-100 w-md-50 font-size-12-px font-size-md-14-px"
            >{{ $lang.print('wallet.WD_TOTAL_LABEL') }}</label>
            <div class="w-100 position-relative">
              <input
                v-model="totalReceived"
                placeholder="0"
                type="tel"
                class="form-control text-right w-100 text-primary placeholder-text-primary"
                @keypress="$filters.inputCheckNumber($event)"
                @change="checkAmount()"
              >
              <div class="font-14 text-nowrap wd-form-ticker">{{ coin.ticker }}</div>
              <div
                v-if="total_withdrawal_error"
                class="form-error font-size-12-px font-size-md-13-px w-100 position-absolute"
              >{{ total_withdrawal_error }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <hr class="d-block d-md-none border-color-gray-10 my-4 border-top-style-dotted" >

        <!-- Address input. -->
        <div class="form-group wd-form-item mb-4 position-relative">
          <div
            :class="{'pb-4': address_error}"
            class="d-block d-md-flex align-items-center">
            <label
              class="font-weight-normal w-100 w-md-50 font-size-12-px font-size-md-14-px"
            >{{ $lang.print('wallet.WD_ADDRESS_LABEL') }}</label>
            <div class="w-100">
              <input
                v-model="address_value"
                :placeholder="`${ coin.ticker } ${ $lang.print('wallet.ADDRESS') }`"
                type="text"
                class="form-control w-100 text-primary placeholder-text-primary"
                style="padding-right: 12px !important"
              >

              <div
                v-if="address_error"
                class="form-error font-size-12-px font-size-md-13-px w-100 position-absolute"
              >{{ address_error }}</div>
            </div>
          </div>
        </div>

        <!-- Memo input. -->
        <div
          v-if="coin.is_use_memo"
          class="form-group wd-form-item mb-4 position-relative">
          <div
            :class="{'pb-4': memo_error}"
            class="d-md-flex align-items-center">
            <label class="font-weight-normal w-100 w-md-50">
              <div class="form-check m-0">
                <input
                  id="memo-cb"
                  v-model="use_memo"
                  type="checkbox"
                  class="form-check-input" >
                <label
                  class="form-check-label font-weight-normal"
                  for="memo-cb"
                >{{ $lang.print('wallet.WD_MEMO_LABEL') }}</label>
              </div>
            </label>
            <div
              :class="{'invisible': !use_memo}"
              class="w-100 position-relative">
              <input
                v-model="memo_value"
                :placeholder="`${ coin.ticker } ${ $lang.print('wallet.MEMO') }`"
                type="text"
                class="form-control text-primary placeholder-text-primary w-100"
                style="padding-right: 12px !important"
              >

              <div
                v-if="memo_error"
                class="wd-form-error font-13 text-danger w-100"
              >{{ memo_error }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Notice. -->
    <div class="bg-gray-5 mt-md-4 mb-4 p-3 border-radius-4-px font-size-12-px font-size-md-14-px">
      <div class="font-weight-bold mb-3 text-uppercase font-size-14-px">{{ $lang.print('wallet.NOTICE_TITLE') }}</div>

      <div class="text-default">
        <ul class="pl-4 m-0">
          <li
            v-for="n in 5"
            :key="n"
            v-html="$lang.print('wallet.WD_NOTICE_LIST_' + n, {t: coin.ticker})"
          />
        </ul>
      </div>
    </div>

    <!-- Wd button. -->
    <div class="text-right">
      <div v-if="!pre_wd_post || pre_wd_post">
        <button
          :disabled="!dataWdIsOk || pre_wd_post"
          :class="{'btn-loader': pre_wd_post}"
          type="button"
          class="btn-base btn-primary btn-slim"
          @click="validateData()"
        >{{ pre_wd_post ? `${ $lang.print('global.LOADING') }...` : $lang.print('wallet.WD_BUTTON', {t: coin.ticker}) }}</button>
      </div>
    </div>

    <!-- Modal confirm. -->
    <modal-wd-confirm
      :data="pre_wd_data"
      @post-wd-error="wdError($event)"
      @post-wd-success="wdSuccess($event)"
    />

    <!-- Modal error. -->
    <modal
      id="wdErrorModal"
      :content="modalErrorContent"
      :salute="modalErrorTitle"
      type="error" />

    <!-- Modal success. -->
    <modal
      id="wdSuccessModal"
      :content="modalSuccessContent"
      :salute="modalSuccessTitle"
      type="success"
      @hidden="$router.push('/tx')"
    />
  </div>
</template>

<script>
import GeneralHeader from '~/components/wallet/generalHeader';
import ModalWdConfirm from '~/components/wallet/modalWdConfirm';

export default {
  components: {
    'general-header': GeneralHeader,
    'modal-wd-confirm': ModalWdConfirm
  },

  data() {
    return {
      withdrawal_amount: '',
      withdrawal_amount_error: '',
      total_withdrawal_error: '',
      address_value: '',
      address_error: '',
      memo_value: '',
      memo_error: '',
      use_memo: false,

      pre_wd_post: false,
      pre_wd_data: {},

      modalErrorTitle: '',
      modalErrorContent: '',

      modalSuccessTitle: '',
      modalSuccessContent: ''
    };
  },

  computed: {
    coin() {
      return (
        this.$store.getters['v2_coin/show'] ||
        this.$store.getters['v2_coin/getCoin'](this.$route.params.ticker)
      );
    },

    info() {
      return this.$store.getters['v2_wallet/wdInfoData'] || {};
    },

    totalWithdrawal() {
      let amount = parseFloat(this.withdrawal_amount) || 0;

      amount = parseFloat(amount.toFixed(8));

      return this.$filters.numberFormat(amount, 8);
    },

    totalReceived: {
      set(val) {
        if (!val && val !== 0) return (this.withdrawal_amount = '');

        let amount = parseFloat(val) + parseFloat(this.info.wd_fee);

        if (isNaN(amount)) return (this.withdrawal_amount = '');

        this.withdrawal_amount = amount;
      },

      get() {
        let received = this.info
          ? parseFloat(this.totalWithdrawal) - parseFloat(this.info.wd_fee)
          : 0;

        received = parseFloat(received.toFixed(8));

        if (received > 0) {
          return this.$filters.numberFormat(received, 8);
        } else if (this.withdrawal_amount === '') {
          return '';
        } else {
          return 0;
        }
      }
    },

    dataWdIsOk() {
      if (
        !this.withdrawal_amount ||
        this.withdrawal_amount < parseFloat(this.info.wd_min)
      ) {
        return false;
      }

      if (!this.address_value) {
        return false;
      }

      return true;
    }
  },

  async mounted() {
    await this.$nextTick();

    $('.wd-form-item').each((index, item) => {
      let $this = $(item);

      let $ticker = $this.find('.wd-form-ticker');

      if (!$ticker.length) return;

      let ticker_width = $ticker.width();

      $this
        .find('.form-control')
        .css('padding-right', `${ticker_width + 17}px`);
    });
  },

  destroyed() {
    this.$store.dispatch('v2_wallet/clearWd');
  },

  methods: {
    checkAmount() {
      this.withdrawal_amount_error = '';
      this.total_withdrawal_error = '';

      if (!this.withdrawal_amount || this.withdrawal_amount === '0') {
        return (this.withdrawal_amount_error =
          'Please fill in the Withdrawal Amount');
      }

      if (
        isNaN(this.withdrawal_amount) ||
        !parseFloat(this.withdrawal_amount)
      ) {
        return (this.withdrawal_amount_error = 'Please fill in valid number');
      }

      if (this.withdrawal_amount < parseFloat(this.info.wd_min)) {
        return (this.withdrawal_amount_error = `Minimum Withdrawal ${this.$filters.numberFormat(
          this.info.wd_min,
          8
        )} ${this.coin.ticker}`);
      }

      if (this.totalReceived <= 0) {
        return (this.total_withdrawal_error = 'Must be greater than zero');
      }

      if (this.totalWithdrawal > this.info.available_balance) {
        return (this.total_withdrawal_error =
          'Oops! You do not have enough amount');
      }
    },

    async validateData() {
      this.checkAmount();

      this.address_error = '';
      this.memo_error = '';

      if (!this.address_value)
        this.address_error = this.$lang.print('wallet.WD_ERROR_ADDRESS');

      if (this.use_memo && !this.memo_value)
        this.memo_error = this.$lang.print('wallet.WD_ERROR_MEMO');

      if (
        this.withdrawal_amount_error ||
        this.total_withdrawal_error ||
        this.address_error ||
        this.memo_error
      )
        return;

      this.pre_wd_post = true;

      this.$global.screenFreeze();

      let input = {
        coin_id: parseInt(this.coin.id),
        amount: parseFloat(this.totalReceived),
        coin_address: this.address_value,
        memo: ''
      };

      if (this.use_memo) input.memo = this.memo_value;

      let { status, data } = await this.$store.dispatch(
        'v2_wallet/postPreWd',
        input
      );

      if (status === 200) {
        this.pre_wd_data = {
          ...data.data,
          ...{
            wd_amount: this.withdrawal_amount,
            wd_total: this.totalReceived,
            wd_address: this.address_value,
            wd_memo: this.memo_value,
            wd_use_memo: this.use_memo
          }
        };

        await this.$nextTick();

        $('#confirmation').modal('toggle');
      } else {
        if (Array.isArray(data)) {
          data.forEach(item => {
            if (item.field === 'amount')
              this.withdrawal_amount_error = item.message;
            if (item.field === 'memo') this.memo_error = item.message;
          });
        } else {
          this.modalErrorTitle = this.$lang.print('global.SORRY');
          this.modalErrorContent = data.error_message;

          await this.$nextTick();

          $('#wdErrorModal').modal();
        }
      }

      this.pre_wd_post = false;

      this.$global.screenUnfreeze();
    },

    async wdError($event) {
      this.modalErrorTitle = this.$lang.print('global.SORRY');
      this.modalErrorContent = $event;

      await this.$nextTick();

      $('#wdErrorModal').modal();
    },

    async wdSuccess($event) {
      this.modalSuccessTitle = this.$lang.print('global.CONGRATULATE');
      this.modalSuccessContent = this.$lang.print(
        'wallet.WD_MODAL_SUCCESS_MSG',
        {
          t: this.coin.ticker,
          a: $event
        }
      );

      this.withdrawal_amount = '';
      this.address_value = '';
      this.memo_value = '';

      await this.$nextTick();

      $('#wdSuccessModal').modal();
    }
  }
};
</script>

<style lang="scss" scoped>
.wd-form-item {
  position: relative;

  .form-control {
    padding-right: 65px;
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
