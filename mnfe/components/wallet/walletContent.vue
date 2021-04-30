<template>
  <div class="card card-v2 card-default box mb-20 text-gray-20">
    <div class="card-heading d-block d-md-flex justify-content-between align-items-start">
      <h3
        class="card-title text-uppercase pb-15-px pb-md-0-px"
      >{{ $lang.print('wallet.CARD_TITLE') }}</h3>
      <div class="d-flex align-items-start">
        <div class="border border-color-gray-10 p-2 border-radius-4-px ml-auto mr-4 flex-grow-1">
          <div class="mb-0 font-size-12-px font-size-md-14-px">{{ $lang.print('wallet.HOLDING') }}</div>
          <div class="m-0 font-size-12-px font-size-md-14-px text-right">
            <span class="font-size-14-px font-size-md-18-px text-primary">{{ walletTotal }}</span>
            HNST
          </div>
        </div>

        <button
          v-if="!$store.getters['v2_wallet/listError']"
          class="btn-base btn-primary btn-slim text-nowrap"
          data-toggle="modal"
          data-target="#voucherFormModal"
        >{{ $lang.print('wallet.VOUCHER_BTN') }}</button>
      </div>
    </div>

    <div class="card-body">
      <div
        v-if="!$store.getters['v2_wallet/listTimestamp']"
        class="d-flex justify-content-center align-items-center py-5"
      >
        <spinner-cube size="small" />
      </div>

      <div
        v-else-if="$store.getters['v2_wallet/listTimestamp'] && $store.getters['v2_wallet/listError']"
        class="d-flex justify-content-center align-items-center py-5"
      >
        <alert
          :message="$store.getters['v2_wallet/listErrorMessage'] || $lang.print('global.FETCH_ERROR')"
        />
      </div>

      <template
        v-else-if="$store.getters['v2_wallet/listTimestamp'] && !$store.getters['v2_wallet/listError']"
      >
        <div class="d-lg-flex justify-content-between align-items-end mb-20">
          <div class="d-flex justify-content-between align-items-center">
            <div class="form-check m-0">
              <input
                id="hide-balance"
                v-model="hideZeroBalance"
                type="checkbox"
                class="form-check-input"
              >
              <label
                class="form-check-label font-weight-normal font-size-13-px"
                for="hide-balance"
              >{{ $lang.print('wallet.HIDE_BALANCE') }}</label>
            </div>
          </div>
        </div>

        <div class="d-none d-lg-block table-responsive table-container table-wallet">
          <table class="table table-v2">
            <thead class="text-gray-20">
              <tr>
                <th class="font-weight-normal">{{ $lang.print('wallet.TABLE_COL_1') }}</th>
                <th class="font-weight-normal">{{ $lang.print('wallet.TABLE_COL_2') }}</th>
                <th class="font-weight-normal">{{ $lang.print('wallet.TABLE_COL_3') }}</th>
                <th class="font-weight-normal">{{ $lang.print('wallet.TABLE_COL_4') }}</th>
                <th class="font-weight-normal">{{ $lang.print('wallet.TABLE_COL_5') }}</th>
                <th class="text-center font-weight-normal">{{ $lang.print('wallet.TABLE_COL_6') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(wallet, index) in walletData"
                :key="index">
                <td class="text-nowrap">
                  <span>
                    <img
                      :src="$lodash.get(wallet, 'coin.image')"
                      width="30"
                      height="30"
                      class="object-fit-contain mr-2"
                      alt
                    >
                    <span
                      class="d-inline-flex align-items-center"
                      style="height: 30px;"
                    >{{ $lodash.get(wallet, 'coin.name', '-') }}</span>
                  </span>
                </td>
                <td class="text-nowrap">
                  {{ wallet.amount_available_rounded_localed }}
                  <span
                    class="text-gray-20"
                  >{{ wallet.coin.ticker }}</span>
                </td>
                <td class="text-nowrap">
                  {{ wallet.amount_mn_rounded_localed }}
                  <span
                    class="text-gray-20"
                  >{{ wallet.coin.ticker }}</span>
                </td>
                <td class="text-nowrap">
                  {{ wallet.total_balance_rounded_localed }}
                  <span
                    class="text-gray-20"
                  >{{ wallet.coin.ticker }}</span>
                </td>
                <td class="text-nowrap">
                  {{ wallet.hnst_value_rounded_localed }}
                  <span
                    class="text-gray-20"
                  >{{ wallet.coin.ticker }}</span>
                </td>
                <td class="text-center text-nowrap">
                  <nuxt-link
                    v-if="isDepositAllowed(wallet.coin)"
                    :to="`/wallet/deposit/${ $lodash.get(wallet, 'coin.ticker') }`"
                  >
                    <span
                      class="icon-table m-0"
                      title="Desposit">
                      <img
                        :src="$assets.walletDeposit"
                        :srcset="`${ $assets.walletDeposit_2x }`" >
                    </span>
                  </nuxt-link>

                  <span
                    v-else
                    class="icon-table disabled m-0"
                    title="Deposit disabled">
                    <img
                      :src="$assets.walletDepositGrayed"
                      :srcset="`${ $assets.walletDepositGrayed_2x }`"
                    >
                  </span>

                  <nuxt-link
                    v-if="isWdAllowed(wallet.coin)"
                    :to="`/wallet/withdraw/${ $lodash.get(wallet, 'coin.ticker') }`"
                  >
                    <span
                      class="icon-table"
                      title="Withdraw">
                      <img
                        :src="$assets.walletWithdraw"
                        :srcset="`${ $assets.walletWithdraw_2x }`" >
                    </span>
                  </nuxt-link>

                  <span
                    v-else
                    class="icon-table disabled"
                    title="Withdraw disabled">
                    <img
                      :src="$assets.walletWithdrawGrayed"
                      :srcset="`${ $assets.walletWithdrawGrayed_2x }`"
                    >
                  </span>
                </td>
              </tr>
              <tr
                v-if="!walletData.length"
                class="text-center">
                <td colspan="6">{{ $lang.print('global.EMPTY_TABLE') }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="d-lg-none">
          <accordion
            v-for="(wallet, index) in walletData"
            ref="acc"
            :key="index"
            class="py-2 border-bottom"
          >
            <div
              slot="panel"
              slot-scope="{ collapsed }">
              <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center text-nowrap w-40">
                  <img
                    :src="$lodash.get(wallet, 'coin.image')"
                    width="30"
                    height="30"
                    class="object-fit-contain mr-2"
                    alt
                  >
                  <span class="font-size-12-px">{{ $lodash.get(wallet, 'coin.name', '-') }}</span>
                </div>
                <div class="font-size-12-px">
                  <span class="text-default">{{ wallet.amount_available_rounded_localed }}</span>
                  {{ $lodash.get(wallet, 'coin.ticker') }}
                </div>
                <span
                  class="d-inline-block text-primary ml-auto pt-2"
                  @click="toggleAccordion(index)"
                >
                  <i
                    :class="collapsed ? 'fa-angle-up' : 'fa-angle-down'"
                    class="fas" />
                </span>
              </div>
            </div>
            <div
              slot="content"
              class="position-relative">
              <div class="d-flex pt-3">
                <span class="font-size-12-px w-40">{{ $lang.print('wallet.TABLE_COL_3') }}</span>
                <div class="font-size-12-px">
                  <span class="text-default">{{ wallet.amount_mn_rounded_localed }}</span>
                  {{ $lodash.get(wallet, 'coin.ticker') }}
                </div>
              </div>
              <div class="d-flex">
                <span class="font-size-12-px w-40">{{ $lang.print('wallet.TABLE_COL_4') }}</span>
                <div class="font-size-12-px">
                  <span class="text-default">{{ wallet.total_balance_rounded_localed }}</span>
                  {{ $lodash.get(wallet, 'coin.ticker') }}
                </div>
              </div>
              <div class="d-flex">
                <span class="font-size-12-px w-40">{{ $lang.print('wallet.TABLE_COL_5') }}</span>
                <div class="font-size-12-px">
                  <span class="text-default">{{ wallet.hnst_value_rounded_localed }}</span>
                  {{ $lodash.get(wallet, 'coin.ticker') }}
                </div>
              </div>
              <div
                class="d-flex position-absolute h-100 justify-content-center align-items-center"
                style="top: 0; right: 0;">
                <nuxt-link
                  v-if="isDepositAllowed(wallet.coin)"
                  :to="`/wallet/deposit/${ $lodash.get(wallet, 'coin.ticker') }`"
                >
                  <span
                    class="icon-table m-0"
                    title="Desposit">
                    <img
                      :src="$assets.walletDeposit"
                      :srcset="`${ $assets.walletDeposit_2x }`" >
                  </span>
                </nuxt-link>

                <span
                  v-else
                  class="icon-table disabled m-0"
                  title="Deposit disabled">
                  <img
                    :src="$assets.walletDepositGrayed"
                    :srcset="`${ $assets.walletDepositGrayed_2x }`"
                  >
                </span>

                <nuxt-link
                  v-if="isWdAllowed(wallet.coin)"
                  :to="`/wallet/withdraw/${ $lodash.get(wallet, 'coin.ticker') }`"
                >
                  <span
                    class="icon-table"
                    title="Withdraw">
                    <img
                      :src="$assets.walletWithdraw"
                      :srcset="`${ $assets.walletWithdraw_2x }`" >
                  </span>
                </nuxt-link>

                <span
                  v-else
                  class="icon-table disabled"
                  title="Withdraw disabled">
                  <img
                    :src="$assets.walletWithdrawGrayed"
                    :srcset="`${ $assets.walletWithdrawGrayed_2x }`"
                  >
                </span>
              </div>
            </div>
          </accordion>
        </div>

        <div class="pt-4">
          <nuxt-link
            class="text-primary font-italic font-size-12-px font-size-md-13-px"
            to="/tx"
            exact>
            <strong>{{ $lang.print('wallet.TX_LINK') }}</strong>
          </nuxt-link>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    update: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      hideZeroBalance: false
    };
  },

  computed: {
    walletData() {
      let data = this.$store.getters['v2_wallet/data'];

      data = data.map(item => {
        item.total_balance =
          parseFloat(item.amount_available) + parseFloat(item.amount_mn);

        item.hnst_value = item.total_balance * item.coin.price_hnst;

        item.amount_available_rounded_localed = this.$filters.numberFormat(
          item.amount_available,
          8,
          true
        );

        item.amount_mn_rounded_localed = this.$filters.numberFormat(
          item.amount_mn,
          8,
          true
        );

        item.total_balance_rounded_localed = this.$filters.numberFormat(
          item.total_balance,
          8,
          true
        );

        item.hnst_value_rounded_localed = this.$filters.numberFormat(
          item.hnst_value,
          8,
          true
        );

        return item;
      });

      if (this.hideZeroBalance) {
        data = data.filter(item => {
          return parseFloat(item.total_balance);
        });
      }

      return data;
    },

    walletTotal() {
      let total = this.$store.getters['v2_wallet/totalBalance'];

      return this.$filters.numberFormat(parseFloat(total), 8, true) || 0;
    },

    walletTotalBTC() {
      let total = this.$store.getters['v2_wallet/totalBalance'];

      let hnst = this.walletData.find(
        item => this.$lodash.get(item, 'coin.ticker') === 'HNST'
      );

      return (
        this.$filters.numberFormat(
          parseFloat(total) *
            parseFloat(this.$lodash.get(hnst, 'coin.price_btc', 0)),
          8,
          true
        ) || 0
      );
    }
  },

  watch: {
    update() {
      this.fetchData();
    }
  },

  created() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      this.$store.dispatch('v2_wallet/getList');
    },

    isDepositAllowed(coin) {
      if (!coin) coin = {};

      if (coin.disallow_deposit) return false;

      return true;
    },

    isWdAllowed(coin) {
      if (!coin) coin = {};

      if (coin.disallow_wd) return false;

      return true;
    },

    toggleAccordion(index) {
      this.$refs.acc.forEach((ref, refindex) => {
        if (index === refindex) {
          ref.toggle();
        } else {
          if (ref.$data.collapsed) ref.toggle('close');
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~/assets/style/revs/mixins/_breakpoint.scss';

input#hide-balance,
label {
  cursor: pointer;
}

.icon-table {
  margin-left: 8px;

  img {
    height: 22px !important;
    margin-top: -10px !important;
  }

  &.disabled {
    position: relative;
  }

  &.logo {
    margin: 0;

    img {
      margin: 0 !important;
    }
  }
}

@include breakpoint('~lg') {
  .table-wallet {
    table {
      table-layout: auto;
    }
  }
}
</style>
