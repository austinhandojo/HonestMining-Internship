<template>
  <div class="d-none d-lg-flex align-items-start header-balance">
    <div class="bal-item pl-0">
      <span class="bal-title">HM Masternodes</span>
      <div class="bal-value">{{ hmMasternodes }}</div>
    </div>
    <div class="bal-item">
      <span class="bal-title">Total Stakes (BTC)</span>
      <div class="bal-value">{{ totalStake }}</div>
    </div>
    <div class="bal-item pr-0">
      <span class="bal-title">1 HNST / BTC</span>
      <div class="bal-value">{{ hnstBtc }}</div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    hmMasternodes() {
      return this.$store.state.masternode.information.master_node_running || 0;
    },

    totalStake() {
      return (
        this.$filters.numberFormat(
          this.$store.state.masternode.information.total_stake_btc,
          8,
          true
        ) || 0
      );
    },

    hnstBtc() {
      return (
        this.$filters.numberFormat(
          this.$store.state.masternode.information.hnst_btc,
          8,
          true
        ) || 0
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~/assets/style/revs/_variables.scss';

.header-balance {
  .bal-item {
    color: white;
    padding: 0 6px;
    position: relative;

    .bal-title {
      font-size: 80%;
    }

    .bal-value {
      background: white;
      border-radius: 4px;
      color: $color-primary;
      padding: 0 5px;
      text-align: right;
      width: 100px;
    }

    &:not(:last-child) {
      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        right: 0;
        height: calc(100% - 6px);
        width: 1px;
        background: rgba(white, 0.9);
      }
    }
  }
}
</style>
