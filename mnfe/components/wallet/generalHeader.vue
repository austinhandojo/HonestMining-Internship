<template>
  <div 
    v-if="coin.ticker" 
    class="border-bottom border-color-gray-10 pb-4 mb-4">
    <div class="row align-items-center flex-nowrap">
      <div class="col-6">
        <div class="d-flex align-items-center mb-md-0">
          <img
            :src="coin.image"
            :alt="coin.ticker"
            class="object-fit-contain mr-3 square-50 square-md-70"
          >
          <h2 class="m-0 text-uppercase font-size-5">{{ coin.name }}</h2>
        </div>
      </div>

      <div 
        v-if="showBalance" 
        class="col-6 d-flex justify-content-end">
        <div class="border border-color-gray-10 p-2 border-radius-4-px text-gray-20">
          <div class="font-size-12-px font-size-md-14-px">{{ $lang.print('wallet.BALANCE') }}</div>
          <div class="text-right">
            <span class="font-size-14-px font-size-md-18-px text-primary">
              {{ $filters.numberFormat($store.getters['v2_wallet/getWalletCoin'](coin.ticker).amount_available, 8, true) || '-' }}
              <span
                class="font-size-12-px font-size-md-14-px text-gray-20"
              >{{ coin.ticker }}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    ticker: {
      type: [String, Number],
      default: null
    },

    showBalance: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    coin() {
      return this.$store.getters['v2_coin/getCoin'](this.ticker) || {};
    }
  }
};
</script>
