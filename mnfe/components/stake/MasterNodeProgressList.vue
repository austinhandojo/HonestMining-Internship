<template>
  <div class="mb-20">
    <div v-if="!data.length">
      master node not yet available
    </div>
    <div 
      v-for="(row, index) in data"
      :key="index"
      class="mb-30" >
      <div class="row mb-5">
        <div class="col-9 col-sm-10 col-custom-5 d-flex justify-content-between"><strong>{{ row.mn_name }}</strong> 
          <span class="text-right"> 
            
            Status 
            <span 
              :class="row.mn_status === 3 ? 'text-success' : 'text-warning'" 
              class="text-right">
              {{ mn_status(row.mn_status) }}
            </span> 
          </span>
        </div>
      </div>

      <!--start progress bar-->
      <div class="row row-custom-5">
        <div class="col-9 col-sm-10 col-custom-5">
          <div class="progress mt-5">
            <div
              :class="((row.seat_taken / row.total_seat) * 100) >= 100 ? 'full-booked' : ''"
              :style="{'width': ((row.seat_taken / row.total_seat) * 100) + '%', 'background-color': color ? color : '#05A2DE'}"
              :aria-valuenow="fixNumber(((row.total_seat - row.seat_available)/row.total_seat) * 100)"
              :aria-valuemin="0"
              :aria-valuemax="row.total_seat"
              class="progress-bar progress-bar-striped"
              role="progressbar"/>
          </div>
        </div>
        <div class="col-3 col-sm-2 col-custom-5 text-center">
          <span> {{ fixNumber((row.seat_taken / row.total_seat) * 100) }} %</span>
        </div>
      </div>
      <!--end quote-->

    </div>

  </div>
</template>
<style scoped>
.full-booked{
    background-color:#b4b4b4 !important;
  }
</style>

<script>
  import { MASTER_NODE_STATUS_COLLECTING_COLLATERALS, MASTER_NODE_STATUS_SETTING_UP_MASTERNODE, MASTER_NODE_STATUS_GENERATING_REWARDS, MASTER_NODE_STATUS_REGISTERING_ON_BLOCKCHAIN, MASTER_NODE_TYPE_INSTANT } from '../../utils/master_node/MasterNodeInterface';
  export default {
    name: 'MasterNodeProgressList',
    props: {
      data: {
        type: Array,
        default: () => []
      },
      color: {
        type: String,
        default: () => ''
      }
    },

    computed: {
      fixNumber() {
        return number => parseInt(number)
      },
      seat_available: function(){
        return (seat_taken, total_seat) => {
          return seat_taken / total_seat * 100 === 100 ? '' : `${seat_taken}/${total_seat}`
        }
      },
        // curent_seat: function(){
        //   return (seat_available, mn_type, total_seat, mn_status) => {
        //     return mn_status !== 3 && mn_type === MASTER_NODE_TYPE_INSTANT ? seat_available + '/' + total_seat : ''
        //   }
        // },
      mn_status: function(){
        return mn_status => {
          switch(mn_status) {
            case 0:
            return MASTER_NODE_STATUS_COLLECTING_COLLATERALS 
            case 1:
            return MASTER_NODE_STATUS_SETTING_UP_MASTERNODE
            case 2:
            return MASTER_NODE_STATUS_REGISTERING_ON_BLOCKCHAIN
            case 3:
            return MASTER_NODE_STATUS_GENERATING_REWARDS
            default :
            return ''
          }
        }
      }

    },

  };
</script>

<style scoped>

</style>
