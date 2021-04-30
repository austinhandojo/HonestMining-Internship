<template>
  <div class="card card-v2 card-default box mb-20">
    <div class="card-heading d-flex align-items-center justify-content-between">
      <h3 class="card-title text-uppercase">Wallet</h3>

      <nuxt-link
        class="card-link"
        to="/wallet"
        exact>
        <i class="ion ion-ios-arrow-round-forward"/>
      </nuxt-link>
    </div>
    <div class="card-body">
      <div
        v-if="walletFetching"
        class="py-4">
        <spinner-cube size="small"/>
      </div>

      <div v-else-if="!walletFetching && wallet.length">
        <div
          v-for="(item, index) in wallet.slice(0, 4)"
          :key="index"
          :class="{'mb-3 border-bottom pb-3': index !== wallet.slice(0, 4).length - 1}"
          class="d-flex align-items-center"
        >
          <img
            :src="$lodash.get(item, 'coin.image')"
            width="30"
            height="30"
            class="object-fit-contain flex-shrink-0"
          >
          <span
            class="d-block px-3 w-100"
          >{{ $filters.numberFormat(item.amount_available, 8, true) }} {{ item.coin.ticker }}</span>
          <div class="text-nowrap">
            <nuxt-link :to="`/wallet/deposit/${item.coin.ticker}`">
              <img
                :src="$assets.walletDeposit"
                :srcset="`${ $assets.walletDeposit_2x } 2x`"
                alt="Deposit"
                width="20"
                height="20"
                class="object-fit-contain"
              >
            </nuxt-link>

            <nuxt-link :to="`/wallet/withdraw/${item.coin.ticker}`">
              <img
                :src="$assets.walletWithdraw"
                :srcset="`${ $assets.walletWithdraw_2x } 2x`"
                alt="Withdraw"
                width="20"
                height="20"
                class="object-fit-contain"
              >
            </nuxt-link>
          </div>
        </div>
      </div>

      <div
        v-else-if="!walletFetching && !wallet.length"
        class="py-5">
        <alert
          :action="false"
          :message="$lang.print('global.FETCH_ERROR')"
          type="danger"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      walletFetching: false
    };
  },

  computed: {
    wallet() {
      return this.$store.getters['v2_wallet/data'];
    }
  },

  created() {
    if (!this.wallet.length) this.walletFetching = true;

    this.$store
      .dispatch('v2_wallet/getList')
      .then(() => (this.walletFetching = false));
  }
};
</script>
