<template>
  <div>
    <div
      v-if="!$store.getters['tx/swapTimestamp']"
      class="d-flex justify-content-center align-items-center min-height-300"
    >
      <spinner-cube size="small" />
    </div>

    <div
      v-else-if="$store.getters['tx/swapTimestamp'] && $store.getters['tx/swapError']"
      class="d-flex justify-content-center align-items-center min-height-300"
    >
      <alert :message="$store.getters['tx/swapErrorMessage'] || $lang.print('global.FETCH_ERROR')" />
    </div>

    <div v-else-if="$store.getters['tx/swapTimestamp'] && !$store.getters['tx/swapError']">
      <div class="table-responsive table-container table-transaction mh-300 mh-md-250">
        <table
          ref="table"
          class="table table-v2">
          <thead>
            <tr>
              <th>{{ $lang.print('tx.TX_SWAP_TABLE_COL_1') }}</th>
              <th>{{ $lang.print('tx.TX_SWAP_TABLE_COL_2') }}</th>
              <th>{{ $lang.print('tx.TX_SWAP_TABLE_COL_3') }}</th>
              <th>{{ $lang.print('tx.TX_SWAP_TABLE_COL_4') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(trans, index) in transData"
              :key="index">
              <td
                class="text-nowrap"
              >{{ $filters.dateFormat(trans.date, 'DD-MM-YYYY HH:mm:ss') || '-' }}</td>
              <td
                class="text-nowrap"
              >{{ $filters.numberFormat(trans.from_amount, 8, true) || '-' }} {{ trans.from_coin || '-' }}</td>
              <td
                class="text-nowrap"
              >{{ $filters.numberFormat(trans.to_amount, 8, true) || '-' }} {{ trans.to_coin || '-' }}</td>
              <td
                class="text-nowrap"
              >{{ $filters.numberFormat(trans.rate, 8, true) || '-' }} {{ trans.from_coin || '-' }}/{{ trans.to_coin || '-' }}</td>
            </tr>
            <tr
              v-if="!transData.length"
              class="text-center">
              <td colspan="4">{{ $lang.print('global.EMPTY_TABLE') }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <table-pagination
        :data="table.pagination"
        class="mt-3"
        @change-page="changePage($event)" />
    </div>
  </div>
</template>

<script>
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
      return this.$store.getters['tx/swapData'];
    }
  },

  watch: {
    filter: {
      handler() {
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
      let paginate = this.$store.getters['tx/swapPaginate'];

      this.table.pagination.count = paginate.count;
      this.table.pagination.current = paginate.current_page;
      this.table.pagination.result = this.transData.length;
      this.table.pagination.total = paginate.total_data;
    },

    fetchData(page = 1) {
      this.$store
        .dispatch('tx/getSwap', {
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
      this.fetchData(event.page);
    }
  }
};
</script>
