<template>
  <div class="card card-default box mb-20 no-border card-dashboard-8">
    <div class="card-heading">
      <h3 class="card-title">Masternode Information</h3>
    </div>
    <div class="card-body">
      <div
        v-if="coinFetching"
        class="dashboard-mninfo-loader d-flex justify-content-center align-items-center"
        style="height: 218px;"
      >
        <cube-spinner-v2 size="small"/>
      </div>

      <div
        v-if="!coinFetching && Array.isArray(coins)"
        class="table-container"
        style="min-height: 218px;"
      >
        <table class="table table-v2 color">
          <thead>
            <tr>
              <th>Icon</th>
              <th>Coin</th>
              <th>Annual ROI</th>
              <th>Price (BTC)</th>
              <th>Collateral</th>
              <th>Frequency</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(coin, index) in coins.filter(coin => coin.is_mn)"
              :key="index">
              <td>
                <img
                  :src="coin.image"
                  style="width: 24px; height: 24px; object-fit: contain;">
              </td>
              <td>{{ coin.name }}</td>
              <td class="text-left">{{ coin.roi }}%</td>
              <td class="text-left">{{ $filters.numberFormat(coin.price_btc, 8, true) || '-' }}</td>
              <td class="text-left">{{ $filters.numberFormat(coin.needed, 8, true) || '-' }}</td>
              <td>{{ coin.reward_frequency }}</td>
            </tr>
            <tr v-if="!coins.length">
              <td
                class="text-center"
                colspan="6">No data found.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        v-if="!coinFetching && !Array.isArray(coins)"
        class="dashboard-mninfo-error d-flex justify-content-center align-items-center"
        style="height: 218px;"
      >
        <fetch-error
          :action="false"
          :message="$lang.print('global.FETCH_ERROR')"
        />
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
      coinFetching: false
    };
  },

  computed: {
    coins() {
      return this.$store.state.coin.coin;
    }
  },

  created() {
    if (!Array.isArray(this.coins)) {
      this.coinFetching = true;

      this.$store
        .dispatch('fetchListCoin', {
          paginate: {
            current_page: 1,
            per_page: 10
          }
        })
        .then(() => (this.coinFetching = false));
    }
  }
};
</script>
