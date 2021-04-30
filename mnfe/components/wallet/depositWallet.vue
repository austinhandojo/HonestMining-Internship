<template>
  <div
    v-if="wallet.length"
    class="card card-v2 card-default box mb-20">
    <div class="card-heading pb-md-2">
      <h3 class="card-title text-uppercase">Wallet Balance</h3>
    </div>
    <div class="card-body">
      <div class="wallet-wrapper">
        <div
          v-for="item in wallet"
          :key="item.coin.id"
          class="wallet-item">
          <img
            :src="item.coin.image"
            :alt="item.coin.name">
          <h5>{{ item.coin.ticker }}</h5>
          <span>{{ $filters.numberFormat(item.amount_available, 8, true) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    filter: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    wallet() {
      let data = Object.freeze(this.$store.state.wallet.wallet);

      if (!this.filter.length) return data;

      return data.filter(item =>
        this.filter.includes(this.$lodash.get(item, 'coin.ticker'))
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.wallet-wrapper {
  .wallet-item {
    display: flex;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #dee2e6;

    &:last-child {
      border: 0;
    }

    & > img {
      height: 40px;
      width: 40px;
      object-fit: contain;
    }

    & > h5 {
      margin: 0;
      margin-left: 20px;
    }

    & > span {
      display: inline-block;
      margin-left: auto;
      font-size: 1.2em;
    }
  }
}
</style>
