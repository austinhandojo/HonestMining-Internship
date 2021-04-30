<template>
  <div>
    <div
      v-if="!$store.getters['tx/walletTimestamp']"
      class="d-flex justify-content-center align-items-center min-height-300"
    >
      <spinner-cube size="small" />
    </div>

    <div
      v-else-if="$store.getters['tx/walletTimestamp'] && $store.getters['tx/walletError']"
      class="d-flex justify-content-center align-items-center min-height-300"
    >
      <alert
        :message="$store.getters['tx/walletErrorMessage'] || $lang.print('global.FETCH_ERROR')"
      />
    </div>

    <div v-else-if="$store.getters['tx/walletTimestamp'] && !$store.getters['tx/walletError']">
      <div
        class="d-none d-lg-block table-responsive table-container table-transaction mh-300 mh-md-250"
      >
        <table
          ref="table"
          class="table table-v2">
          <thead class="text-gray-20">
            <tr>
              <th class="font-weight-normal">{{ $lang.print('tx.TX_WALLET_TABLE_COL_1') }}</th>
              <th class="font-weight-normal">{{ $lang.print('tx.TX_WALLET_TABLE_COL_2') }}</th>
              <th class="font-weight-normal">{{ $lang.print('tx.TX_WALLET_TABLE_COL_3') }}</th>
              <th class="font-weight-normal">{{ $lang.print('tx.TX_WALLET_TABLE_COL_4') }}</th>
              <th class="font-weight-normal">{{ $lang.print('tx.TX_WALLET_TABLE_COL_5') }}</th>
              <th class="font-weight-normal">{{ $lang.print('tx.TX_WALLET_TABLE_COL_6') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(trans, index) in transData"
              :key="index">
              <td
                class="text-nowrap"
              >{{ $filters.dateFormat(trans.date, 'DD-MM-YYYY HH:mm:ss') || '-' }}</td>
              <td class="text-nowrap">{{ trans.activity || '-' }}</td>
              <td class="text-nowrap">
                <span
                  v-if="$filters.numberFormat(Math.abs(trans.amount), 8) < 0"
                >({{ $filters.numberFormat(Math.abs(trans.amount), 8, true) }})</span>
                <span v-else>{{ $filters.numberFormat(Math.abs(trans.amount), 8, true) }}</span>
                <span class="text-gray-20">{{ trans.ticker }}</span>
              </td>
              <td class="text-nowrap">
                <span
                  class="d-inline-block align-middle text-ellipsis"
                  style="width: 200px;"
                >{{ trans.address || '-' }}</span>
              </td>
              <td class="text-nowrap">
                <span
                  :ref="'with-addr-' + index"
                  :class="{'cursor-pointer': trans.tx && !trans.tx.includes('INT_')}"
                  class="d-inline-block align-middle text-ellipsis"
                  style="width: 200px;"
                >{{ trans.tx ? (trans.tx.includes('INT_') ? $lang.print('tx.INT') : trans.tx ) : '-' }}</span>
              </td>
              <td class="text-nowrap">
                <span :class="{'text-success': trans.status === 'complete'}">{{ trans.status }}</span>
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
          <div class="w-30">{{ $lang.print('tx.TX_WALLET_TABLE_COL_2') }}</div>
          <div class="w-40">{{ $lang.print('tx.TX_WALLET_TABLE_COL_3') }}</div>
          <div>{{ $lang.print('tx.TX_WALLET_TABLE_COL_6') }}</div>
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
              <div class="w-30 text-default">{{ trans.activity || '-' }}</div>
              <div class="w-40">
                <span class="text-default">{{ $filters.numberFormat(trans.amount, 8, true) || 0 }}</span>
                {{ trans.ticker }}
              </div>
              <div class="text-default">
                <span :class="{'text-success': trans.status === 'complete'}">{{ trans.status }}</span>
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
              <span class="w-30">{{ $lang.print('tx.TX_WALLET_TABLE_COL_1') }}</span>
              <div>
                <span
                  class="text-default"
                >{{ $filters.dateFormat(trans.date, 'DD-MM-YYYY HH:mm:ss') || '-' }}</span>
              </div>
            </div>
            <div class="d-flex">
              <span class="w-30">{{ $lang.print('tx.TX_WALLET_TABLE_COL_4') }}</span>
              <div class="w-50 flex-grow-0">
                <span class="d-block text-default text-ellipsis w-100">{{ trans.address || '-' }}</span>
              </div>
            </div>
            <div class="d-flex">
              <span class="w-30">{{ $lang.print('tx.TX_WALLET_TABLE_COL_5') }}</span>
              <div class="w-50 flex-grow-0">
                <span
                  class="d-block text-default text-ellipsis w-100"
                >{{ trans.tx ? (trans.tx.includes('INT_') ? $lang.print('tx.INT') : trans.tx ) : '-' }}</span>
              </div>
            </div>
          </div>
        </accordion>
      </div>

      <table-pagination
        :data="table.pagination"
        class="mt-3"
        @change-page="changePage($event)" />
    </div>
  </div>
</template>

<script>
import Custom from '~/assets/js/custom';
import Mixin from './mixin';

export default {
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
      }
    };
  },

  computed: {
    transData() {
      return this.$store.getters['tx/walletData'];
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

  beforeDestroy() {
    this.transactionClipboardDestroy();
  },

  methods: {
    async setPaginate() {
      let paginate = this.$store.getters['tx/walletPaginate'];

      this.table.pagination.count = paginate.count;
      this.table.pagination.current = paginate.current_page;
      this.table.pagination.result = this.transData.length;
      this.table.pagination.total = paginate.total_data;

      await this.$nextTick();

      if (process.client) {
        await this.transactionClipboardDestroy();

        this.transactionClipboard();
      }
    },

    fetchData(page = 1) {
      return this.$store
        .dispatch('tx/getWallet', {
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

    transactionClipboard() {
      this.transData.forEach((item, index) => {
        if (!this.$refs['with-addr-' + index][0] || !item.tx) return;

        if (item.tx.includes('INT_')) return;

        if (window['walletTransClipboard' + index])
          window['walletTransClipboard' + index].destroy();

        window['walletTransClipboard' + index] = Custom.clipboard(
          this.$refs['with-addr-' + index][0],
          item.tx,
          () => {
            this.$notification.default(this.$lang.print('tx.COPY_TX_SUCCESS'));
          },
          () => {
            this.$notification.default(this.$lang.print('tx.COPY_TX_ERROR'));
          }
        );
      });
    },

    transactionClipboardDestroy() {
      return new Promise(resolve => {
        this.transData.forEach((item, index) => {
          if (window['walletTransClipboard' + index])
            window['walletTransClipboard' + index].destroy();
        });

        resolve();
      });
    },

    async changePage(event) {
      this.toggleAccordion();
      this.fetchData(event.page);
    }
  }
};
</script>
