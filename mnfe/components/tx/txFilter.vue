<template>
  <div
    class="d-flex flex-wrap justify-content-between align-items-center py-3 mb-md-3 border-bottom border-color-gray-10"
  >
    <div
      id="tx-filter-list"
      class="d-flex flex-wrap order-1 order-md-0 w-100 w-md-auto pt-1 pt-md-0"
    >
      <div
        v-for="ticker in $store.getters['tx/filterCoin']"
        :key="ticker"
        class="d-flex align-items-center font-size-13-px font-italic cursor-pointer border-right pr-2 mr-2 mt-2 mt-md-0"
        @click="removeCoin(ticker)"
      >
        <span class="mr-2">{{ ticker }}</span>
        <i class="ion ion-ios-close font-size-6 text-primary" />
      </div>
      <div
        v-if="$store.getters['tx/filterDate'].from && $store.getters['tx/filterDate'].to"
        class="d-flex align-items-center font-size-13-px font-italic cursor-pointer border-right pr-2 mr-2 mt-2 mt-md-0"
        @click="clearDate()"
      >
        <span
          class="mr-2"
        >{{ $filters.dateFormat($store.getters['tx/filterDate'].from, 'DD-MM-YYYY', 'YYYY-MM-DD') }} to {{ $filters.dateFormat($store.getters['tx/filterDate'].to, 'DD-MM-YYYY', 'YYYY-MM-DD') }}</span>
        <i class="ion ion-ios-close font-size-6 text-primary" />
      </div>
    </div>
    <div class="d-flex justify-content-end order-0 order-md-1 w-100 w-md-auto">
      <div
        v-if="$store.getters['tx/filterCoin'].length || ($store.getters['tx/filterDate'].from && $store.getters['tx/filterDate'].to)"
        class="d-inline-block cursor-pointer text-primary px-20-px mr-2 text-underline"
        @click="clearFilter()"
      >Clear</div>

      <!-- TX Filter mobile. -->
      <div
        class="d-inline-block d-lg-none border border-color-primary border-radius-4-px px-20-px text-primary"
        @click="openFilterModal()"
      >Filter</div>

      <!-- TX Filter Desktop. -->
      <div class="d-none d-lg-block">
        <dropdown 
          ref="filter" 
          label="Filter" 
          classes="w-300-px w-md-350-px" 
          @show="syncFilter()">
          <div class="mb-3 text-gray-20">
            <span
              class="d-block font-size-14-px border-bottom border-color-primary border-bottom-style-dotted pb-2 mb-2"
            >Coin</span>

            <div class="row">
              <div class="col-4 flex-grow-1">
                <div class="form-check m-0">
                  <input
                    id="check-all"
                    v-model="filter.coin_all"
                    type="checkbox"
                    class="form-check-input"
                  >
                  <label
                    :class="{'text-default': filter.coin_all}"
                    for="check-all"
                    class="form-check-label font-size-11-px font-italic user-select-none font-weight-normal"
                  >All</label>
                </div>
              </div>
              <div
                v-for="coin in $store.getters['v2_coin/list']"
                :key="coin.id"
                class="col-4 flex-grow-1"
              >
                <div class="form-check m-0">
                  <input
                    :id="`check-${coin.ticker}`"
                    v-model="filter.coin[coin.ticker]"
                    type="checkbox"
                    class="form-check-input"
                  >
                  <label
                    :for="`check-${coin.ticker}`"
                    :class="{'text-default': filter.coin[coin.ticker]}"
                    class="form-check-label font-size-11-px font-italic user-select-none font-weight-normal"
                  >{{ coin.ticker }}</label>
                </div>
              </div>
            </div>
          </div>
          <div class="mb-3 text-gray-20">
            <span
              class="d-block font-size-14-px border-bottom border-color-primary border-bottom-style-dotted mb-2 pb-2"
            >Date</span>

            <div class="row">
              <div class="col-12 flex-grow-1">
                <div class="form-check m-0">
                  <input
                    id="check-date-all"
                    v-model="filter.date_all"
                    type="checkbox"
                    class="form-check-input"
                  >
                  <label
                    :class="{'text-default': filter.date_all}"
                    for="check-date-all"
                    class="form-check-label font-size-11-px font-italic user-select-none font-size-normal"
                  >All</label>
                </div>
              </div>
              <div class="col-12 flex-grow-1">
                <div class="form-check m-0">
                  <input
                    id="check-from"
                    :checked="!filter.date_all"
                    type="checkbox"
                    class="form-check-input"
                    style="z-index: 1;"
                    @change="setDateAll($event)"
                  >
                  <div class="ml-10-px ml-md-0-px form-check-label">
                    <div class="row">
                      <div class="col-12 col-md-6 d-flex align-items-center mb-1 mb-md-0 pr-md-0">
                        <label
                          :class="{'text-default': !filter.date_all}"
                          for="check-from"
                          class="d-block font-size-11-px font-italic m-0 user-select-none w-50-px w-md-auto flex-shrink-0 mr-md-1 font-weight-normal"
                        >From</label>
                        <div class="d-flex form-group m-0 overflow-hidden flex-grow-1">
                          <input
                            v-model="filter.date.from"
                            :disabled="filter.date_all"
                            type="date"
                            class="form-control font-size-11-px px-1 py-0 h-auto text-primary"
                            required
                          >
                        </div>
                      </div>
                      <div class="col-12 col-md-6 d-flex align-items-center pl-md-0">
                        <span
                          :class="{'text-default': !filter.date_all}"
                          class="d-block font-size-11-px font-italic mx-md-1 w-50-px w-md-auto flex-shrink-0"
                        >to</span>
                        <div class="d-flex form-group m-0 overflow-hidden flex-grow-1">
                          <input
                            v-model="filter.date.to"
                            :disabled="filter.date_all"
                            type="date"
                            class="form-control font-size-11-px px-1 py-0 h-auto text-primary"
                            required
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="pt-3 d-flex justify-content-end">
            <div 
              class="d-flex w-100" 
              style="max-width: 200px;">
              <button
                type="button"
                class="btn-base btn-primary btn-outline w-100 mr-2 btn-sm"
                @click="$refs['filter'].toggle('hide')"
              >Close</button>
              <button 
                type="button" 
                class="btn-base btn-primary w-100 btn-sm" 
                @click="save()">Done</button>
            </div>
          </div>
        </dropdown>
      </div>
    </div>

    <!-- TX Filter Modal. -->
    <modal id="txFilterMobile">
      <div class="py-3 position-relative">
        <span
          class="d-block position-absolute text-gray-20"
          style="top: 0; right: 0;"
          data-dismiss="modal"
        >
          <i class="fas fa-times" />
        </span>

        <div class="mb-4 text-gray-20">
          <span
            class="d-block font-size-12-px border-bottom border-color-primary border-bottom-style-dotted pb-3 mb-3"
          >Coin</span>

          <div class="row">
            <div class="col-4 flex-grow-1">
              <div class="form-check m-0">
                <input
                  id="check-all"
                  v-model="filter.coin_all"
                  type="checkbox"
                  class="form-check-input"
                >
                <label
                  :class="{'text-default': filter.coin_all}"
                  for="check-all"
                  class="form-check-label font-size-12-px font-italic user-select-none font-weight-normal"
                >All</label>
              </div>
            </div>
            <div
              v-for="coin in $store.getters['v2_coin/list']"
              :key="coin.id"
              class="col-4 flex-grow-1"
            >
              <div class="form-check m-0">
                <input
                  :id="`check-${coin.ticker}`"
                  v-model="filter.coin[coin.ticker]"
                  type="checkbox"
                  class="form-check-input"
                >
                <label
                  :for="`check-${coin.ticker}`"
                  :class="{'text-default': filter.coin[coin.ticker]}"
                  class="form-check-label font-size-12-px font-italic user-select-none font-weight-normal"
                >{{ coin.ticker }}</label>
              </div>
            </div>
          </div>
        </div>
        <div class="mb-4 text-gray-20">
          <span
            class="d-block font-size-12-px border-bottom border-color-primary border-bottom-style-dotted mb-3 pb-3"
          >Date</span>

          <div class="row">
            <div class="col-12 flex-grow-1">
              <div class="form-check m-0">
                <input
                  id="check-date-all"
                  v-model="filter.date_all"
                  type="checkbox"
                  class="form-check-input"
                >
                <label
                  :class="{'text-default': filter.date_all}"
                  for="check-date-all"
                  class="form-check-label font-size-12-px font-italic user-select-none font-size-normal"
                >All</label>
              </div>
            </div>
            <div class="col-12 flex-grow-1">
              <div class="form-check m-0">
                <input
                  id="check-from"
                  :checked="!filter.date_all"
                  type="checkbox"
                  class="form-check-input"
                  style="z-index: 1;"
                  @change="setDateAll($event)"
                >
                <div class="ml-10-px ml-md-0-px form-check-label">
                  <div class="row">
                    <div class="col-6 col-md-6 mb-1 mb-md-0 pr-2">
                      <label
                        :class="{'text-default': !filter.date_all}"
                        for="check-from"
                        class="d-block font-size-12-px font-italic m-0 user-select-none w-50-px w-md-auto flex-shrink-0 mr-md-1 font-weight-normal"
                      >From</label>
                      <div class="d-flex form-group m-0 overflow-hidden flex-grow-1">
                        <input
                          v-model="filter.date.from"
                          :disabled="filter.date_all"
                          type="date"
                          class="form-control font-size-11-px px-1 py-0 h-auto text-primary"
                          required
                        >
                      </div>
                    </div>
                    <div class="col-6 col-md-6 pl-2">
                      <span
                        :class="{'text-default': !filter.date_all}"
                        class="d-block font-size-12-px font-italic mx-md-1 w-50-px w-md-auto flex-shrink-0"
                      >to</span>
                      <div class="d-flex form-group m-0 overflow-hidden flex-grow-1">
                        <input
                          v-model="filter.date.to"
                          :disabled="filter.date_all"
                          type="date"
                          class="form-control font-size-12-px px-1 py-0 h-auto text-primary"
                          required
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="pt-4 d-flex justify-content-end">
          <button 
            type="button" 
            class="btn-base btn-primary" 
            @click="save()">Done</button>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import Moment from 'moment';

export default {
  data() {
    return {
      filter: {
        coin_all: true,
        date_all: true,
        coin: {},
        date: {
          form: null,
          to: null
        }
      }
    };
  },

  watch: {
    'filter.coin_all'(val) {
      if (val) {
        Object.keys(this.filter.coin).forEach(key => {
          this.$set(this.filter.coin, key, false);
        });
      } else {
        let check = Object.keys(this.filter.coin).find(
          key => this.filter.coin[key]
        );

        if (!check)
          this.filter.coin[
            this.$store.getters['v2_coin/list'][0].ticker
          ] = true;
      }
    },

    'filter.coin': {
      handler(val) {
        let check = Object.keys(val).find(key => val[key]);

        if (check) this.filter.coin_all = false;
      },
      deep: true
    },

    'filter.date_all'(val) {
      if (val) {
        this.filter.date.from = null;
        this.filter.date.to = null;
      } else {
        let from_def = '20190101';
        let to_def = Moment().format('YYYYMMDD');

        this.filter.date.from = this.$filters.dateFormat(
          from_def,
          'YYYY-MM-DD'
        );

        this.filter.date.to = this.$filters.dateFormat(to_def, 'YYYY-MM-DD');
      }
    }
  },

  created() {
    this.$store.getters['v2_coin/list'].forEach(coin => {
      this.$set(this.filter, 'coin', {
        ...this.filter.coin,
        [coin.ticker]: false
      });
    });
  },

  destroyed() {
    this.$store.dispatch('tx/filterReset');
  },

  methods: {
    setDateAll(event) {
      this.filter.date_all = event.target.checked ? false : true;
    },

    async save() {
      this.$store.dispatch('tx/filterSet', this.filter);

      this.$refs['filter'].toggle('hide');
      $('#txFilterMobile').modal('hide');

      await this.$nextTick();

      this.$emit('update', {
        coin: this.$store.getters['tx/filterCoin'],
        date: this.$store.getters['tx/filterDate']
      });
    },

    async removeCoin(ticker) {
      this.$set(this.filter.coin, ticker, false);

      await this.$nextTick();

      this.save();
    },

    async clearDate() {
      this.filter.date.from = null;
      this.filter.date.to = null;

      await this.$nextTick();

      this.save();
    },

    async clearFilter() {
      this.$store.getters['v2_coin/list'].forEach(coin => {
        this.$set(this.filter.coin, coin.ticker, false);
      });

      this.filter.date.from = null;
      this.filter.date.to = null;

      await this.$nextTick();

      this.save();
    },

    syncFilter() {
      this.$store.getters['v2_coin/list'].forEach(coin => {
        this.$set(this.filter.coin, coin.ticker, false);
      });

      this.$store.getters['tx/filterCoin'].forEach(ticker => {
        this.$set(this.filter.coin, ticker, true);
      });

      this.filter.coin_all = this.$store.getters['tx/filterCoin'].length
        ? false
        : true;

      this.filter.date.from = this.$store.getters['tx/filterDate'].from;
      this.filter.date.to = this.$store.getters['tx/filterDate'].to;

      this.filter.date_all =
        this.$store.getters['tx/filterDate'].from &&
        this.$store.getters['tx/filterDate'].to
          ? false
          : true;
    },

    openFilterModal() {
      $('#txFilterMobile').modal('toggle');
    }
  }
};
</script>

<style lang="scss" scoped>
#tx-filter-list {
  & > div:last-child {
    border: 0 !important;
    padding: 0 !important;
  }
}
</style>
