<template>
  <li 
    id="wallet-dropdown" 
    :class="{'dropdown': wallets.length}" 
    class="nav-item">
    <a 
      v-if="!wallets.length" 
      class="nav-link nav-muted" 
      @click.prevent>
      <img 
        :src="$assets.iconWallet" 
        class="header-dropdown-icon" 
        alt="Icon Wallet">
    </a>
    <a
      v-else
      href="#"
      class="nav-link dropdown-toggle has-notif"
      data-toggle="dropdown"
      role="button"
      aria-haspopup="true"
      aria-expanded="false"
    >
      <img 
        :src="$assets.iconWallet" 
        class="header-dropdown-icon" 
        alt="Icon Wallet">
    </a>
    <div class="dropdown-menu dropdown-md dropdown-md-right dropdown-replace">
      <div class="media-items custom">
        <div class="media">
          <div class="content w-100 d-flex justify-content-between align-items-center">
            <small>Balance</small>
            <small>
              Est. Value:
              <span class="text-primary">{{ totalWalletHeader }} HNST</span>
            </small>
          </div>
        </div>
        <div 
          v-for="(item, index) in wallets" 
          :key="index" 
          class="media">
          <div class="content w-100 d-flex justify-content-between align-items-center">
            <div>{{ item.amount_available_formated_localed }} {{ item.coin.ticker }}</div>
            <div class="d-flex">
              <nuxt-link
                v-if="!item.coin.disallow_deposit"
                :to="`/wallet/deposit/${ item.coin.ticker}`"
              >
                <img
                  :src="$assets.walletDeposit"
                  :srcset="`${ $assets.walletDeposit_2x } 2x`"
                  class="icon-wallet"
                  alt="Deposit"
                >
              </nuxt-link>

              <span v-else>
                <img
                  :src="$assets.walletDepositGrayed"
                  :srcset="`${ $assets.walletDepositGrayed_2x } 2x`"
                  class="icon-wallet"
                  alt="Deposit disabled"
                >
              </span>

              <nuxt-link
                v-if="!item.coin.disallow_wd"
                :to="`/wallet/withdraw/${ item.coin.ticker }`"
              >
                <img
                  :src="$assets.walletWithdraw"
                  :srcset="`${ $assets.walletWithdraw_2x } 2x`"
                  class="icon-wallet"
                  alt="Withdraw"
                >
              </nuxt-link>

              <span v-else>
                <img
                  :src="$assets.walletWithdrawGrayed"
                  :srcset="`${ $assets.walletWithdrawGrayed_2x } 2x`"
                  class="icon-wallet"
                  alt="Withdraw disabled"
                >
              </span>
            </div>
          </div>
        </div>
        <div 
          v-if="page.nav !== 'wallet'" 
          class="media">
          <div class="content w-100 d-flex justify-content-center align-items-center">
            <nuxt-link 
              to="/wallet" 
              class="text-primary" 
              exact>
              <small>Show Detail</small>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import Spark from '~/assets/js/spark';

export default {
  props: {
    page: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    wallets() {
      let data = this.$store.getters['v2_wallet/data'];

      data = data.map(item => {
        item.amount_available_formated_localed = this.$filters.numberFormat(
          item.amount_available,
          8,
          true
        );

        return item;
      });

      data = data.filter(item => item.amount_available > 0);

      return data;
    },

    totalWalletHeader() {
      let total = this.$store.getters['v2_wallet/totalBalance'];

      return this.$filters.numberFormat(total, 2, true) || 0;
    }
  },

  watch: {
    wallets: {
      async handler(after, before) {
        await this.$nextTick();

        if (process.client && !before.length) Spark.generalFunctions();
      },
      deep: true
    }
  },

  async mounted() {
    await this.$nextTick();

    $('#wallet-dropdown').on('show.bs.dropdown', () =>
      this.$store.dispatch('v2_wallet/getList')
    );
  }
};
</script>

<style lang="scss" scoped>
.icon-wallet {
  height: 20px;
  width: auto;
  margin-left: 8px;
}
</style>
