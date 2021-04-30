<template>
  <modal
    id="txRewardModal"
    title="Reward Detail">
    <div class="d-flex align-items-center mb-4">
      <img
        :src="coin.image"
        class="square-50 object-fit-contain mr-3" >
      <span class="text-primary font-size-5">{{ data.detail }}</span>
    </div>

    <div class="bg-ocean p-3 font-size-13-px mb-4 border-radius-4-px">
      <div class="d-flex justify-content-between">
        <span>Contract No.</span>
        <span>{{ data.contract || '-' }}</span>
      </div>
      <div class="d-flex justify-content-between">
        <span>Start Date</span>
        <span>{{ $filters.dateFormat(data.start_join_date, 'DD-MM-YYYY HH:mm:ss') || '-' }}</span>
      </div>
      <div class="d-flex justify-content-between">
        <span>Distribution Date</span>
        <span>{{ $filters.dateFormat(data.date, 'DD-MM-YYYY HH:mm:ss') || '-' }}</span>
      </div>
      <div class="d-flex justify-content-between">
        <span>Stacked Coins</span>
        <span>{{ $filters.numberFormat(data.amount, 8, true) || 0 }} {{ data.ticker }}</span>
      </div>
    </div>

    <div class="font-size-13-px">
      <div class="d-flex justify-content-between">
        <span>Reward</span>
        <span>{{ $filters.numberFormat(baseReward.value, 8, true) || 0 }} {{ baseReward.ticker }}</span>
      </div>
      <div class="d-flex justify-content-between">
        <span>Payout Fee</span>
        <span>{{ $filters.numberFormat(payoutFee.value, 8, true) || 0 }} {{ payoutFee.ticker }}</span>
      </div>
    </div>

    <div class="border-top mt-4 pt-4 mb-4">
      <div class="d-flex justify-content-between font-weight-bold">
        <span>Total Reward Received</span>
        <span
          class="text-primary"
        >{{ $filters.numberFormat(totalReward.value, 8, true) || 0 }} {{ totalReward.ticker }}</span>
      </div>
    </div>

    <div class="text-center pt-4">
      <button
        type="button"
        class="btn-base btn-primary"
        data-dismiss="modal"
      >{{ $lang.print('global.CLOSE') }}</button>
    </div>
  </modal>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    coin() {
      return this.$store.getters['v2_coin/getCoin'](this.data.ticker) || {};
    },

    baseReward() {
      try {
        let arr = this.data.reward.split(' ');

        let value =
          this.totalReward.ticker === this.payoutFee.ticker
            ? this.totalReward.value + this.payoutFee.value
            : this.totalReward.value;

        return {
          value: parseFloat(value),
          ticker: this.totalReward.ticker
        };
      } catch (e) {
        return {
          value: 0,
          ticker: ''
        };
      }
    },

    totalReward() {
      try {
        let arr = this.data.reward.split(' ');

        return {
          value: parseFloat(arr[0]),
          ticker: arr[1]
        };
      } catch (e) {
        return {
          value: 0,
          ticker: ''
        };
      }
    },

    payoutFee() {
      try {
        let arr = this.data.payout_fee.split(' ');

        return {
          value: parseFloat(arr[0]),
          ticker: arr[1]
        };
      } catch (e) {
        return {
          value: 0,
          ticker: ''
        };
      }
    }
  }
};
</script>
