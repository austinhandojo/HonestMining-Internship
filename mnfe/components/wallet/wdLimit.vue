<template>
  <div class="card card-v2 card-default box mb-20">
    <div class="card-heading">
      <h3 class="card-title text-uppercase">Withdrawal Daily Limit</h3>
    </div>
    <div class="card-body">
      <div class="font-size-12-px font-size-md-13-px text-right">
        <strong class="text-default">
          {{ $filters.numberFormat(info.withdrawed, 8, true) || 0 }}
          <span class="text-gray-20">HNST</span>
        </strong>
        <span class="text-gray-20">/</span>
        {{ $filters.numberFormat(info.maxDailyLimit, 8, true) }}
        <span class="text-gray-20">HNST</span>
      </div>
      <div class="mt-2">
        <div class="progress">
          <div
            :style="`width: ${ progress }%`"
            :aria-valuenow="progress"
            class="progress-bar bg-primary"
            role="progressbar"
            aria-valuemin="0"
            aria-valuemax="100"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    info() {
      return this.$store.getters['v2_wallet/wdInfoData'];
    },

    progress() {
      return (
        (parseFloat(this.info.withdrawed) /
          parseFloat(this.info.maxDailyLimit)) *
        100
      );
    }
  }
};
</script>
