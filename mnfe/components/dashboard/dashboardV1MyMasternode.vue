<template>
  <div
    class="card card-default no-border card-dashboard-1 box mb-20"
    style="height: 300px;">
    <div class="card-heading">
      <h3 class="card-title">My Masternode</h3>
    </div>
    <div class="d-flex align-items-center justify-content-center card-body">
      <div
        v-if="myMasternodeFetching"
        class="my-masternode-loader">
        <cube-spinner-v2 size="small" />
      </div>

      <div
        v-if="!myMasternodeFetching && Array.isArray(myMasternode) && myMasternode.length && coins"
        style="flex: 1;"
      >
        <div class="scroll-box-custom">
          <div
            v-for="my in myMasternode"
            :key="my.id"
            class="d-flex align-items-center my-masternode-item mb-20"
          >
            <img
              :src="$lodash.get(coins.find(coin => coin.ticker === my.ticker), 'image')"
              :alt="my.ticker"
              class="my-masternode-image"
            >
            <div style="flex: 1;">
              <div class="d-flex justify-content-between align-items-center mb-5 flex-wrap">
                <strong class="my-masternode-title">{{ my.mn_name }}</strong>

                <div class="text-right font-13 my-masternode-text">
                  <div v-if="my.mn_status === 3">
                    The next reward distribution will be up to
                    <span
                      class="color-primary"
                    >{{ my.next_reward_time }}</span>
                  </div>
                  <div v-else>
                    Status
                    <span class="text-warning">
                      <template v-if="my.mn_status === 0">Collecting Collaterals</template>
                      <template v-if="my.mn_status === 1">Setting Up Masternode</template>
                      <template v-if="my.mn_status === 2">Registering on Blockchain</template>
                    </span>
                  </div>
                </div>
              </div>
              <div class="progress">
                <div
                  :style="{'width': my.mn_status === 3 ? (parseFloat(my.percentage) > 100 ? 100 : parseFloat(my.percentage)) + '%' : '0%', 'background-color': $lodash.get(coins.find(coin => coin.ticker === my.ticker), 'bar_color', '#05A2DE')}"
                  :aria-valuenow="my.mn_status === 3 ? (parseFloat(my.percentage) > 100 ? 100 : parseFloat(my.percentage)) : 0"
                  class="progress-bar progress-bar-striped"
                  role="progressbar"
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="text-right mt-15">
          <nuxt-link
            to="/stakefolio"
            class="color-primary">See Details</nuxt-link>
        </div>
      </div>

      <div v-else-if="!myMasternodeFetching && Array.isArray(myMasternode) && !myMasternode.length">
        <div class="text-center front-info mb-20">
          Hello,
          <strong>{{ user ? user.username : '' }}</strong>!
          <div>Welcome to Honest Mining. You have not join any master node yet.</div>
          <div class="font-600">
            <strong>Start growing your crypto assets now!</strong>
          </div>
        </div>
        <div class="text-center">
          <nuxt-link
            to="/join"
            class="btn-yellow border-radius-30px box-shadow"
          >JOIN MASTERNODE</nuxt-link>
        </div>
      </div>

      <div v-else-if="!myMasternodeFetching && (myMasternodeError || !coins)">
        <div class="my-masternode-error">
          <fetch-error
            :action="false"
            :message="$lang.print('global.FETCH_ERROR')" />
        </div>
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
      myMasternodeFetching: false
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

  async created() {
    if (!Array.isArray(this.coins)) {
      this.myMasternodeFetching = true;

      await this.$store.dispatch('fetchListCoin', {
        paginate: {
          current_page: 1,
          per_page: 10
        }
      });
    }

    if (!Array.isArray(this.myMasternode)) this.myMasternodeFetching = true;

    this.$store
      .dispatch('fetchMyMasternode', {
        search_key: '',
        paginate: {
          current_page: 1,
          per_page: 10
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
            per_page: 10
          }
        })
        .then(() => (this.myMasternodeFetching = false));
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~/assets/style/revs/mixins/_breakpoint.scss';

.my-masternode-item {
  &:last-child {
    margin-bottom: 0 !important;
  }
}

.my-masternode-image {
  width: 45px;
  height: 45px;
  object-fit: contain;
  margin-right: 15px;
}

@include breakpoint('to-md') {
  .my-masternode-title {
    flex-basis: 100%;
  }

  .my-masternode-text {
    flex-basis: 100%;
    text-align: left !important;
  }
}
</style>
