<template>
  <section 
    id="section-masternode" 
    class="section-masternode">
    <div class="container">
      <div class="section-header d-inline-block">
        <h2>
          Honest Mining
          <strong>Masternodes</strong>
        </h2>
      </div>

      <div class="row">
        <div class="col-lg-6">
          <div
            id="masternode-info-1"
            class="card-rev very-condensed bg-blue has-shadow position-relative"
          >
            <span class="d-inline-flex align-items-center text-white">
              Total Hosted Masternode
              <i
                class="info-icon fas fa-info"
                data-toggle="tooltip"
                data-theme="white"
                title="Estimated by historical data"
              />
            </span>

            <div class="card-number text-white">{{ mnData.master_node_running || 0 }}</div>
          </div>
        </div>

        <div class="col-lg-6">
          <div
            id="masternode-info-2"
            class="card-rev very-condensed bg-blue has-shadow position-relative"
          >
            <span class="d-inline-flex align-items-center text-white">
              Total Value of Hosted Nodes (BTC)
              <i
                class="info-icon fas fa-info"
                data-toggle="tooltip"
                data-theme="white"
                title="Estimated by historical data"
              />
            </span>

            <div
              class="card-number text-white"
            >{{ $filters.numberFormat(mnData.total_stake_btc) || 0 }}</div>
          </div>
        </div>

        <div class="col-lg-12">
          <div 
            id="masternode-graphic" 
            class="card-rev very-condensed has-shadow position-relative">
            <span class="d-inline-flex align-items-center text-primary">Masternode Performance</span>

            <div class="mn-graphic">
              <div class="graphic-main">
                <div
                  v-for="(data, index) in percentData.filter(item => item.persentage)"
                  :key="index"
                  :style="`flex-basis: ${ data.persentage }%; background-color: ${ data.chart_color }`"
                  class="graphic-portion"
                />
              </div>
              <div class="graphic-label">
                <div
                  v-for="(data, index) in percentData.filter(item => item.persentage)"
                  :key="index"
                  :style="`flex-basis: ${ data.persentage }%;`"
                  class="graphic-portion"
                >
                  <span>{{ data.name }}</span>
                  <br>
                  <span>{{ $filters.numberFormat(data.persentage, 2, true) }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      percentData: [],
      mnData: {}
    };
  },

  async created() {
    try {
      let { status, data } = await this.$axios.post('mn/percentage');

      this.percentData = data.data;
    } catch (e) {
      console.log(`Percent data error: ${e.message}`);
    }

    try {
      let { status, data } = await this.$axios.post('mn/information');

      this.mnData = data.data;
    } catch (e) {
      console.log(`MN Information error: ${e.message}`);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~/assets/style/revs/_variables.scss';
@import '~/assets/style/revs/mixins/_breakpoint.scss';

.section-masternode {
  padding-top: 8.75rem;
  padding-bottom: 8.5rem;
  background-color: $color-font-light-60;
  margin: 0 !important;
}

.info-icon {
  display: inline-block;
  width: 1.1rem;
  height: 1.1rem;
  border: 1px solid white;
  border-radius: 50%;
  text-align: center;
  line-height: 1rem;
  font-size: 0.6rem;
  margin-left: 0.5rem;
  color: white;
}

.card-number {
  font-size: 3rem;
}

#masternode-graphic {
  margin-top: 2rem;
}

.mn-graphic {
  margin-top: 1.25rem;
}

.graphic-main,
.graphic-label {
  padding: 0.5rem;
  display: flex;
  background-color: $color-font-light-60;
  border-radius: 50px;

  .graphic-portion {
    height: 1.5rem;

    &:first-child {
      border-radius: 30px 0 0 30px;
    }

    &:last-child {
      border-radius: 0 30px 30px 0;
    }
  }
}

.graphic-label {
  background-color: transparent;
  border-radius: 0;

  .graphic-portion {
    height: auto;
    border-radius: 0 !important;
    color: $color-primary;

    span:last-child {
      font-size: 1.5rem;
    }
  }
}

@include breakpoint('to-sm') {
  .section-masternode {
    padding-top: 5rem;
    padding-bottom: 5.5rem;
  }

  #masternode-info-1 {
    margin-bottom: 2rem;
  }

  .graphic-label {
    .graphic-portion {
      padding-right: 5px;
    }
  }
}
</style>
