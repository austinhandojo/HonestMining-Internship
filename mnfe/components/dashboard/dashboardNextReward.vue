<template>
  <div class="card card-v2 card-default box mb-20">
    <div class="card-heading d-flex justify-content-between align-items-center">
      <h3 class="card-title text-uppercase">My Next Rewards</h3>
      <nuxt-link
        class="card-link"
        to="/stakefolio"
        exact>
        <i class="ion ion-ios-arrow-round-forward"/>
      </nuxt-link>
    </div>

    <div class="card-body">
      <div
        v-if="myMasternodeFetching"
        class="py-4">
        <spinner-cube size="small"/>
      </div>

      <div
        v-else-if="!myMasternodeFetching && Array.isArray(myMasternode) && !myMasternode.length"
        class="bg-ocean text-center p-40"
      >
        <p class="text-primary font-size-7">
          <strong>
            You Haven't Join Any Masternode Yet,
            <br>Start Staking Today!
          </strong>
        </p>

        <nuxt-link
          class="btn-base btn-primary"
          to="/join"
          exact>Join Now</nuxt-link>
      </div>

      <div
        v-else-if="!myMasternodeFetching && Array.isArray(myMasternode) && myMasternode.length && coins"
      >
        <div
          v-for="(my, index) in myMasternode.slice(0, 3)"
          :key="my.id"
          :class="{'mb-3': index !== myMasternode.length - 1}"
          class="d-flex align-items-center"
        >
          <img
            :src="$lodash.get(coins.find(coin => coin.ticker === my.ticker), 'image')"
            :alt="my.ticker"
            width="50"
            height="50"
            class="object-fit-contain mr-3"
          >
          <div style="flex: 1;">
            <div class="d-flex justify-content-between align-items-center mb-5 flex-wrap">
              <h4 class="m-0 p-0 font-weight-normal font-size-13-px">
                {{ my.mn_name }}
                <span
                  v-if="my.last_payout_time"
                >(last reward distribution {{ $filters.dateFormat(my.last_payout_time, 'DD/MM/YYYY HH:mm') }})</span>
              </h4>

              <div class="text-right font-size-13-px">
                <div
                  v-if="my.mn_status === 3"
                >Est. {{ my.next_reward_time }} to next reward distribution</div>
                <div v-else>
                  Status
                  <span class="text-warning">
                    <template v-if="my.mn_status === 0">Collecting Collaterals</template>
                    <template v-else-if="my.mn_status === 1">Setting Up Masternode</template>
                    <template v-else-if="my.mn_status === 2">Registering on Blockchain</template>
                    <template v-else>Unknown</template>
                  </span>
                </div>
              </div>
            </div>
            <div class="progress progress-bar-mini">
              <div
                :style="{'width': (progressBar[index] || 0) + '%', 'background-color': $lodash.get(coins.find(coin => coin.ticker === my.ticker), 'bar_color', '#05A2DE')}"
                :aria-valuenow="progressBar[index] || 0"
                class="progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
              />
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="!myMasternodeFetching && (myMasternodeError || !coins)">
        <div class="py-5">
          <alert
            :action="false"
            :message="$lang.print('global.FETCH_ERROR')"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myMasternodeFetching: false,
      progressBar: []
    };
  },

  computed: {
    user() {
      return this.$store.state.user.user;
    },

    coins() {
      return this.$store.state.coin.coin;
    },

    myMasternode() {
      return this.$store.state.masternode.my_masternode;
    },

    myMasternodeError() {
      return typeof this.$store.state.masternode.my_masternode_error ===
        'string'
        ? this.$store.state.masternode.my_masternode_error
        : null;
    }
  },

  watch: {
    myMasternode: {
      handler(val) {
        if (!Array.isArray(val)) return;

        setTimeout(() => {
          this.progressBar = [];

          val.forEach(item => {
            if (item.mn_status === 3) {
              this.progressBar.push(
                parseFloat(item.percentage) > 100
                  ? 100
                  : parseFloat(item.percentage)
              );
            } else {
              this.progressBar.push(0);
            }
          });
        });
      },
      deep: true,
      immediate: true
    }
  },

  async created() {
    if (!Array.isArray(this.coins)) {
      this.myMasternodeFetching = true;

      await this.$store.dispatch('fetchListCoin', {
        paginate: {
          current_page: 1,
          per_page: 3
        }
      });
    }

    if (!Array.isArray(this.myMasternode)) this.myMasternodeFetching = true;

    this.$store
      .dispatch('fetchMyMasternode', {
        search_key: '',
        paginate: {
          current_page: 1,
          per_page: 3
        }
      })
      .then(() => {
        this.myMasternodeFetching = false;
      });
  },

  methods: {
    refetch() {
      this.myMasternodeFetching = true;

      this.$store
        .dispatch('fetchMyMasternode', {
          search_key: '',
          paginate: {
            current_page: 1,
            per_page: 3
          }
        })
        .then(() => (this.myMasternodeFetching = false));
    }
  }
};
</script>
