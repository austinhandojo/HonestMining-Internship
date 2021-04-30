<template>
  <div>
    <div
      v-if="!$store.getters['tx/rewardTimestamp']"
      class="d-flex justify-content-center align-items-center min-height-300"
    >
      <spinner-cube size="small" />
    </div>

    <div
      v-else-if="$store.getters['tx/rewardTimestamp'] && $store.getters['tx/rewardError']"
      class="d-flex justify-content-center align-items-center min-height-300"
    >
      <alert
        :message="$store.getters['tx/rewardErrorMessage'] || $lang.print('global.FETCH_ERROR')"
      />
    </div>

    <div v-else-if="$store.getters['tx/rewardTimestamp'] && !$store.getters['tx/rewardError']">
      <div
        class="d-none d-lg-block table-responsive table-container table-transaction mh-300 mh-md-250"
      >
        <table 
          ref="table" 
          class="table table-v2">
          <thead class="text-gray-20">
            <tr>
              <th class="font-weight-normal">{{ $lang.print('tx.TX_REWARD_TABLE_COL_1') }}</th>
              <th class="font-weight-normal">{{ $lang.print('tx.TX_REWARD_TABLE_COL_2') }}</th>
              <th class="font-weight-normal">{{ $lang.print('tx.TX_REWARD_TABLE_COL_4') }}</th>
              <th class="font-weight-normal">{{ $lang.print('tx.TX_REWARD_TABLE_COL_5') }}</th>
              <th class="font-weight-normal">{{ $lang.print('tx.TX_REWARD_TABLE_COL_6') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="(trans, index) in transData" 
              :key="index">
              <td
                class="text-nowrap"
              >{{ $filters.dateFormat(trans.date, 'DD-MM-YYYY HH:mm:ss') || '-' }}</td>
              <td class="text-nowrap">{{ trans.detail || '-' }}</td>

              <td class="text-nowrap">
                <span>{{ $filters.numberFormat(trans.staked_coins, 8, true) || 0 }}</span>
                <span class="text-gray-20">{{ trans.ticker }}</span>
              </td>
              <td class="text-nowrap">
                <span>{{ $filters.numberFormat(trans.reward.replace( /[A-Z]/g, ''), 8, true) || 0 }}</span>
                <span class="text-gray-20">{{ trans.ticker }}</span>
              </td>
              <td class="text-right">
                <span 
                  class="d-inline-block cursor-pointer px-3" 
                  @click="openDetailModal(index)">
                  <i class="fas fa-search text-primary" />
                </span>
              </td>
            </tr>
            <tr 
              v-if="!transData.length" 
              class="text-center">
              <td colspan="6">{{ $lang.print('global.EMPTY_TABLE') }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="d-lg-none">
        <div class="d-flex font-size-12-px text-gray-20 py-3 border-bottom">
          <div class="w-45">{{ $lang.print('tx.TX_REWARD_TABLE_COL_1') }}</div>
          <div>{{ $lang.print('tx.TX_REWARD_TABLE_COL_5') }}</div>
        </div>
        <accordion
          v-for="(trans, index) in transData"
          ref="acc"
          :key="index"
          class="py-3 border-bottom"
        >
          <div 
            slot="panel" 
            slot-scope="{ collapsed }">
            <div class="d-flex align-items-center font-size-12-px text-gray-20">
              <div
                class="w-45 text-default"
              >{{ $filters.dateFormat(trans.date, 'DD-MM-YYYY HH:mm:ss') || '-' }}</div>
              <div>
                <span
                  class="text-default"
                >{{ $filters.numberFormat(trans.reward.replace( /[A-Z]/g, ''), 8, true) || 0 }}</span>
                {{ trans.ticker }}
              </div>

              <span 
                class="d-inline-block text-primary ml-auto" 
                @click="toggleAccordion(index)">
                <i 
                  :class="collapsed ? 'fa-angle-up' : 'fa-angle-down'" 
                  class="fas" />
              </span>
            </div>
          </div>
          <div 
            slot="content" 
            class="position-relative font-size-12-px text-gray-20">
            <div class="d-flex pt-3">
              <span class="w-45">{{ $lang.print('tx.TX_REWARD_TABLE_COL_2') }}</span>
              <div>
                <span class="text-default">{{ trans.detail || '-' }}</span>
              </div>
            </div>
            <div class="d-flex">
              <span class="w-45">{{ $lang.print('tx.TX_REWARD_TABLE_COL_4') }}</span>
              <div>
                <span
                  class="text-default"
                >{{ $filters.numberFormat(trans.staked_coins, 8, true) || 0 }}</span>
                {{ trans.ticker }}
              </div>
            </div>
            <div
              class="position-absolute h-100 d-flex align-items-center pt-3"
              style="top: 0; right: 0;"
            >
              <span
                class="d-inline-block cursor-pointer px-2 font-size-5"
                @click="openDetailModal(index)"
              >
                <i class="fas fa-search text-primary" />
              </span>
            </div>
          </div>
        </accordion>
      </div>

      <table-pagination 
        :data="table.pagination" 
        class="mt-3" 
        @change-page="changePage($event)" />
    </div>

    <detail-modal :data="modalData" />
  </div>
</template>

<script>
import Mixin from './mixin';

import TxRewardModal from '~/components/tx/txRewardModal';

export default {
  components: {
    'detail-modal': TxRewardModal
  },

  mixins: [Mixin],

  props: {
    filter: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      table: {
        pagination: {
          count: 0,
          current: 1,
          perpage: 10,
          result: 0,
          total: 0
        }
      },
      modal: null
    };
  },

  computed: {
    transData() {
      return this.$store.getters['tx/rewardData'];
    },

    modalData() {
      return this.transData[this.modal] || {};
    }
  },

  watch: {
    filter: {
      handler() {
        this.toggleAccordion();
        this.fetchData();
      },
      immediate: true,
      deep: true
    }
  },

  created() {
    this.setPaginate();
  },

  methods: {
    setPaginate() {
      let paginate = this.$store.getters['tx/rewardPaginate'];

      this.table.pagination.count = paginate.count;
      this.table.pagination.current = paginate.current_page;
      this.table.pagination.result = this.transData.length;
      this.table.pagination.total = paginate.total_data;
    },

    fetchData(page = 1) {
      this.$store
        .dispatch('tx/getReward', {
          filter: {
            coin: this.filter.coin || [],
            date: {
              start_date:
                this.$filters.dateFormat(
                  this.filter.date.from,
                  'YYYYMMDDHHmmss',
                  'YYYY-MM-DD'
                ) || '',
              end_date:
                this.isToday(this.filter.date.to) ||
                this.$filters.dateFormat(
                  this.filter.date.to,
                  'YYYYMMDDHHmmss',
                  'YYYY-MM-DD'
                ) ||
                ''
            }
          },
          paginate: {
            current_page: page,
            per_page: this.table.pagination.perpage
          }
        })
        .then(() => this.setPaginate());
    },

    async changePage(event) {
      this.toggleAccordion();
      this.fetchData(event.page);
    },

    async openDetailModal(index) {
      this.modal = index;

      await this.$nextTick();

      $('#txRewardModal').modal('toggle');
    }
  }
};
</script>
