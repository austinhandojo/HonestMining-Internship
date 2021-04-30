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
          <!-- <h4 class="color-primary mb-10">YOU’RE NOW PARTICIPATING IN SHARED </h4> -->

          <div class="color-black-min line-height-normal bg-primary-min p-20 border-radius-5px mb-20">
            <!-- {{ booking }} XXXXXX {{ coin }} -->
            <!-- We have successfully stake your {{ seat * coin_per_seat }} {{ ticker }} -->
            We have successfully put your stake of {{ contribute }} {{ coin.ticker }} on the Shared Masternode. We will notify you when your Shared Masternode meets the requirement and start generating reward.
          </div>
          
          <hr>
        </div>
        <div class="text-center">
          <!-- Back to <nuxt-link to="/mn/choose">Join Masternode</nuxt-link>
          or go to  -->
          <nuxt-link to="/stakefolio">Check stakefolio</nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
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
        join_shared_getters: 'join_shared_getters',
        stake_booking_getters: 'stake_booking_getters',
        coins_getters: 'coins_getters'
      }),
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
  }
</script>
