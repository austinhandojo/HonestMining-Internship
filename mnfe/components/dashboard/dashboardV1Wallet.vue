<template>
  <div class="card card-default box mb-20 card-dashboard-2 no-border">
    <div class="card-heading">
      <h3 class="card-title">Wallet</h3>
    </div>
    <div class="card-body">
      <div 
        v-if="walletFetching" 
        class="dashboard-wallet-loader" 
        style="height: 222px;">
        <cube-spinner-v2 size="small" />
      </div>

      <div v-if="!walletFetching && wallet.length">
        <div class="dashboard-wallet-list">
          <div
            v-for="(wallet, index) in wallet"
            :key="index"
            class="dashboard-wallet-item d-flex align-items-center mb-15"
          >
            <img 
              :src="$lodash.get(wallet, 'coin.image')" 
              class="dashboard-wallet-image" >
            <span
              class="dashboard-wallet-amount"
            >{{ $filters.numberFormat(wallet.amount_available, 8, true) }} {{ wallet.coin.ticker }}</span>
            <div class="dashboard-wallet-links text-nowrap">
              <nuxt-link :to="`/wallet/deposit/${wallet.coin.ticker}`">
                <img
                  :src="$assets.walletDeposit"
                  :srcset="`${ $assets.walletDeposit_2x } 2x`"
                  alt="Deposit"
                >
              </nuxt-link>

              <nuxt-link :to="`/wallet/withdraw/${wallet.coin.ticker}`">
                <img
                  :src="$assets.walletWithdraw"
                  :srcset="`${ $assets.walletWithdraw_2x } 2x`"
                  alt="Withdraw"
                >
              </nuxt-link>
            </div>
          </div>
        </div>
        <div class="d-flex mt-20">
          <nuxt-link 
            to="/wallet" 
            class="ml-auto">See all</nuxt-link>
        </div>
      </div>

      <div
        v-if="!walletFetching && !wallet.length"
        class="dashboard-wallet-error d-flex justify-content-center align-items-center"
        style="height: 222px; padding: 0 20px;"
      >
        <fetch-error 
          :action="false" 
          :message="$lang.print('global.FETCH_ERROR')" 
          type="danger" />
      </div>
    </div>
  </div>
</template>

<script>
import globalComponents from '~/utils/GlobalComponents';

export default {
  mixins: [globalComponents],

  data() {
    return {
      walletFetching: false
    };
  },

  computed: {
    wallet() {
      return this.$store.getters['v2_wallet/data'].slice(0, 4);
    }
  },

  created() {
    if (!this.wallet.length) this.walletFetching = true;

    this.$store
      .dispatch('fetchListWallet', {
        options: {
          search_key: '',
          filter_by: {
            is_mn: ''
          },
          order_by: ['shown_index', 'asc']
        },
        paginate: {
          current_page: 1,
          per_page: 50
        }
      })
      .then(() => (this.walletFetching = false));
  }
};
</script>

<style lang="scss" scoped>
.dashboard-wallet-item {
  &:last-child {
    margin-bottom: 0 !important;
  }
}

.dashboard-wallet-image {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.dashboard-wallet-amount {
  margin-left: auto;
  margin-right: 15px;
}

.dashboard-wallet-links {
  img {
    width: 20px;
    height: 20px;
    object-fit: contain;
  }
}
</style>
