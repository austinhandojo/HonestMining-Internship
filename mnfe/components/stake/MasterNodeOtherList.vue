<template>
  <div
    class="panel card-default box mb-20">
    <div class="card-heading">
      <h3 class="card-title">Other Masternodes</h3>
    </div>
    <div
      id="other-masternodes"
      class="card-body">
      <v-wait for="other_list_loading">
        <template 
          v-if="loading" 
        >
          <cube-spinner class="d-flex align-items-center justify-content-center" />
          <!-- <fold 
            :loading="loading"
            :color="color" /> -->
        </template>
        <template v-for="(row, index) in master_node_other">
          <div
            v-if="row.is_mn === true"
            :key="index"
            class="media-items"
          >
            <nuxt-link
              :to="`/join/${row.ticker}`"
              class="normal-link">
              <div class="media custom-box mb-10">
                <div class="media-left mr-1">
                  <img
                    :src="row.image"
                    class="media-object mr-5"
                    width="48"
                    height="48">
                </div>
                <div class="media-body">
                  <p class="media-heading weight-regular mb-0 font-bold">{{ row.name }} ({{ row.ticker }})</p>
                  <div class="row">
                    <div class="col-sm-6 color-black-min font-12 font-400">Reward Time</div>
                    <div class="col-sm-6 color-primary font-500 text-right">{{ row.reward_frequency }}</div>
                  </div>
                  <div class="row">
                    <div class="col-sm-6 color-black-min font-12 font-400">Annual ROI</div>
                    <div class="col-sm-6 color-primary font-500 text-right">{{ row.roi }}%</div>
                  </div>
                </div>
              </div>
            </nuxt-link>
          </div>
        </template>
      </v-wait>
    </div>
  </div>
</template>
<script>
  import CubeSpinner from '../../components/HmLoading';
  export default {
    name: 'MasterNodeOtherList',
    components: {
      CubeSpinner
    },
    props: {
      data: {
        type: Array,
        default: () => []
      }
    },

    data() {
      return {
        loading: true,
        color: '#05A2DE',
        master_node_other: []
      }
    },

    async created() {
      // start waiting
      await this.$wait.start('other_list_loading');

      let _self = this;
      setTimeout(function() {
        _self.loading = false;
        _self.master_node_other = _self.data
      }, 2000)

      // stop waiting
      this.$wait.end('other_list_loading');
    }
  }
</script>
<style scoped>
  .font-12{
    font-size: 12px;
  }
</style>
