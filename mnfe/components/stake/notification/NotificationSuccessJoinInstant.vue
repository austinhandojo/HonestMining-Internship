<template>
  <section>
    <div class="row justify-content-center">
      <div class="col-md-10 col-lg-8 img-join-success">
        <img
          class="w-100 mb-20"
          src="/img/success-join.png"
          alt="">
      </div>
      <div class="col-md-10">
        <div class="mb-20 text-center">
          <h3 class="color-primary mb-10">JOIN SUCCESSFUL</h3>
          <div class="color-black-min line-height-normal bg-primary-min p-20 border-radius-5px mb-20">
            <!-- We have successfully stake your {{ seat * coin_per_seat }} {{ ticker }} -->
            Your Deposit of {{ contribute }} {{ coin.ticker }} was successfully processed
          </div>
          
          <template v-for="(row, index) in join_instant">
            <div 
              :key="index" >
              <div  
                class="row mb-10">
                <div class="col-6 font-500 text-left">Contract Number</div>
                <div class="col-6 text-right font-300">{{ row.contract_no }}</div>
              </div>
              <div class="row mb-10">
                <div class="col-6 font-500 text-left">Masternode</div>
                <div class="col-6 text-right font-300">{{ row.mn_name }}</div>
              </div>
              <div class="row mb-10">
                <div class="col-6 font-500 text-left">Join Date</div>
                <div class="col-6 text-right font-300">{{ moment(row.join_date,'YYYYMMDDHHmmss').format('DD/MM/YYYY HH:mm') }}</div>
              </div>  
              <hr >
            </div>           
          </template>
          
        </div>
        <div class="text-center">
          <!-- Back to <nuxt-link to="/mn/choose">Join Masternode</nuxt-link>
          or go to  -->
          <nuxt-link to="/stakefolio">Check My Masternode</nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import moment from 'moment'
  export default {
    name: 'NotificationSuccessJoinInstant',
    props: {
      image: {
        type: String,
        default: () => '/img/error-masternode.png'
      },
    },
    data() {
      return {
      }
    },
    computed: {
      ...mapGetters({
        join_instant_getters: 'join_instant_getters',
        trade_instant_getters: 'trade_instant_getters',
        coins_getters: 'coins_getters',
        stake_booking_getters: 'stake_booking_getters'
      }),
      join_instant: function(){
        let {status, data} = this.join_instant_getters
        if (status){
          return Array.isArray(data) ? data : []
        }

        return Array.isArray(this.trade_instant_getters.data) ? this.trade_instant_getters.data : []
      },
      booking: function(){
        if (typeof this.stake_booking_getters !== 'object'){
          return {}
        }
        return typeof this.stake_booking_getters.data === 'object' ? this.stake_booking_getters.data :{}
      },
      coin: function(){
        if (typeof this.coins_getters !== 'object'){
          return {}
        }
        if (typeof this.coins_getters.data !== 'object'){
          return {}
        }
        return Array.isArray(this.coins_getters.data.coin) && this.coins_getters.data.coin.length > 0 ? this.coins_getters.data.coin[0] : {}
      },
      contribute: function(){
        return this.booking.seat * this.coin.coin_per_seat
      },
    },
    methods: {
      moment(...args) {
        return moment(...args);
      },
      refreshPage(){
        location.reload();
      }
    }
    
  }
</script>
