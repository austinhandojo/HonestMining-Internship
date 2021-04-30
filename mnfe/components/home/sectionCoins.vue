<template>
  <section 
    id="section-coins" 
    class="section-coins">
    <div class="container">
      <div class="card-rev bg-blue has-shadow shadow-blue">
        <div class="section-header d-lg-none">
          <h2 class="m-0 text-white text-center">
            Supported
            <strong>Coins</strong>
          </h2>
        </div>

        <div 
          :data-available="Boolean(coinData.length).toString()" 
          class="coins--label">
          <div class="section-header d-none d-lg-inline-block">
            <h2 class="m-0 text-white text-center">
              Supported
              <strong>Coins</strong>
            </h2>
          </div>

          <div class="label-item">
            <span>Required Collateral</span>
            <span>
              <em>in HNST</em>
            </span>
          </div>

          <div class="label-item">
            <span>Minimum contribution amount</span>
            <span>
              <em>in HNST</em>
            </span>
          </div>

          <div class="label-item">
            <span>
              Estimated Annual ROI
              <i
                class="info-icon fas fa-info"
                data-toggle="tooltip"
                data-theme="white"
                title="Estimated by historical data"
              />
            </span>
          </div>

          <div class="label-item">
            <span>
              Monthly Income
              <i
                class="info-icon fas fa-info"
                data-toggle="tooltip"
                data-theme="white"
                title="Estimated by historical data"
              />
            </span>
            <span>
              <em>in HNST</em>
            </span>
          </div>
        </div>

        <div class="coins--list overflow-hidden">
          <div
            v-if="coinFetching"
            class="d-flex justify-content-center align-items-center text-danger"
            style="height: 100%;"
          >
            <cube-spinner-v2 size="small"/>
          </div>

          <div 
            v-if="!coinFetching && coinData.length" 
            class="slider">
            <div 
              v-for="coin in coinData" 
              :key="coin.id" 
              class="list-item">
              <div class="item-row-0">
                <h4>{{ coin.name }}</h4>

                <img 
                  :src="coin.logo_homepage || coin.image" 
                  :alt="coin.ticker">
              </div>
              <div class="item-row-1">
                <span>{{ coin.needed_rounded }} {{ coin.ticker }}</span>
                <span>
                  <em>{{ coin.needed_eq }} HNST</em>
                </span>
              </div>
              <div class="item-row-2">
                <span>{{ coin.mn_min_rounded }} {{ coin.ticker }}</span>
                <span>
                  <em>{{ coin.mn_min_eq }} HNST</em>
                </span>
              </div>
              <div class="item-row-3">
                <span>{{ $filters.numberFormat(coin.roi, 2, true) }}%</span>
              </div>
              <div class="item-row-4">
                <span>{{ coin.monthly_income_rounded }} {{ coin.ticker }}</span>
                <span>
                  <em>{{ coin.monthly_income_eq }} HNST</em>
                </span>
              </div>
            </div>
          </div>

          <div
            v-if="!coinFetching && !coinData.length"
            class="d-flex justify-content-center align-items-center text-danger"
            style="height: 100%; color: white;"
          >Data is not available.</div>

          <div
            v-if="!coinFetching && coinData.length > 3"
            class="slider-prev"
            style="display: none;"
          >
            <i class="ion ion-ios-arrow-back"/>
          </div>
          <div 
            v-if="!coinFetching && coinData.length > 3" 
            class="slider-next">
            <i class="ion ion-ios-arrow-forward"/>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Homepage from '~/assets/js/homepage';

import globalComponents from '~/utils/GlobalComponents';

export default {
  mixins: [globalComponents],

  data() {
    return {
      coin: [],
      coinFetching: false
    };
  },

  computed: {
    coinData() {
      let data = JSON.parse(JSON.stringify(this.coin));

      data = data.filter(item => {
        return item.is_mn;
      });

      data = this.$lodash.orderBy(data, ['shown_index'], ['asc']);

      data = data.map(item => {
        item.needed_rounded = this.formatNumber(item.needed);
        item.mn_min_rounded = this.formatNumber(item.mn_min);
        item.needed_eq = this.formatNumber(item.needed * item.price_hnst);
        item.mn_min_eq = this.formatNumber(item.mn_min * item.price_hnst);
        item.monthly_income =
          (2592000 / item.reward_frequency_second) * item.reward_per_mn;
        item.monthly_income_rounded = this.$filters.numberFormat(
          item.monthly_income,
          2,
          true
        );
        item.monthly_income_eq = this.$filters.numberFormat(
          item.monthly_income * item.price_hnst,
          2,
          true
        );

        return item;
      });

      return data;
    }
  },

  async created() {
    this.coinFetching = true;

    try {
      let payload = {
        search_key: '',
        paginate: {
          current_page: 1,
          per_page: 100
        }
      };

      let { status, data } = await this.$axios.post('coin', payload);

      this.coin = data.data.coin;

      this.coinFetching = false;

      if (process.client) {
        await this.$nextTick();

        Homepage.coinsTable();
      }
    } catch (e) {
      this.coinFetching = false;

      console.log(`Coin data error: ${e.message}`);
    }
  },

  methods: {
    formatNumber(float) {
      if (!float) return 0;

      return this.$filters.numberFormat(float, 8, true);
    }
  }
};
</script>
