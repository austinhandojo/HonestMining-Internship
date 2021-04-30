<template>
  <div class="card card-v2 card-default box mb-20">
    <div class="card-body">
      <div class="d-flex justify-content-between">
        <div class="pr-4">
          <strong class="font-size-7">Hi, {{ user.username }}</strong>
          <br>
          <nuxt-link
            class="text-primary"
            to="/join"
            exact>What Do You Want to Stake Today?</nuxt-link>
        </div>
        <div class="align-self-end text-right flex-shrink-0">
          <span class="text-gray">Here's Your Current Holdings</span>
          <br>
          <strong
            :class="(walletTotal + walletTotalBTC).length > 20 ? 'font-size-6' : 'font-size-7'"
            class="text-primary"
          >{{ walletTotal }} HNST ({{ walletTotalBTC }} BTC)</strong>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user.user;
    },

    walletTotal() {
      let total = this.$store.getters['v2_wallet/totalBalance'];

      return this.$filters.numberFormat(parseFloat(total), 8, true) || '0';
    },

    walletTotalBTC() {
      let total = this.$store.getters['v2_wallet/totalBalance'];

      let hnst = this.$store.getters['v2_wallet/data'].find(
        item => this.$lodash.get(item, 'coin.ticker') === 'HNST'
      );

      return (
        this.$filters.numberFormat(
          parseFloat(total) *
            parseFloat(this.$lodash.get(hnst, 'coin.price_btc', 0)),
          8,
          true
        ) || '0'
      );
    }
  }
};
</script>
