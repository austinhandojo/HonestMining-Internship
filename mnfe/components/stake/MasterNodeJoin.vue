<template>
  <section>
    <div class="mt-20 text-center">
      <div
        class="row logo-tab-deposit justify-content-center align-items-center">
        <div class="col-sm-10 text-center">
          <div class="text-center font-500 mb-10">{{ page.title }}</div>
          <count-down
            :data="count_down"
            :start="is_count_down"
            @timeInterface="handleBookingExpired"/>
          <h2 class="color-primary font-500 mt-0 mb-15">{{ coin_needed }} {{ coin.ticker }} needed!</h2>
          <img
            :src="page.wallet_icon"
            class="mb-10"
            alt="">
          <div>Your {{ coin.ticker }} Wallet balance :</div>
          <div class="font-bold font-18">{{ coin_wallet }} {{ coin.ticker }}</div>
        </div>
        <div class="col-12 mt-20">
          <div 
            v-if="is_coin_lack" 
            class="color-red">You need {{ coin_lack }} more {{ coin.ticker }} to contribute or choose <a
              class="color-red text-underline"
              @click="tabOption">other payment option</a></div>
        </div>
      </div>
      <v-wait>
        <template slot="waiting">
          <div class="text-center mt-20">
            <a
              href="#"
              class="color-primary"
              @click="cancelTrade()">{{ page.button_trade_cancel }}</a>
            <b-button
              class="btn-primary border-radius-30px mr-5 ml-5"
              disabled>
              <b-spinner
                small
                type="grow"/>
              Loading...
            </b-button>
          </div>
        </template>

        <div class="text-center mt-30">
          <a
            :id="'cancel_join_'+booking.type+'_coin_'+coin.ticker"
            href="#"
            class="color-primary"
            @click="cancelJoin()">{{ page.button_join_cancel }}</a>
          <button
            :disabled="is_coin_lack"
            :id="'submit_join_'+booking.type+'_coin_'+coin.ticker"
            class="btn-primary border-radius-30px mr-5 ml-5"
            @click="requestJoinMasterNode()">{{ page.button_join_submit }}</button>
        </div>
      </v-wait>
    </div>
  </section>
</template>
<script>

  import { mapGetters, mapActions } from 'vuex'
  import CountDown from '../CountDown';
  import {
    DEFAULT_REQUEST_DECLINE,
    HTTP_INTERNAL_SERVER_ERROR,
    MASTER_NODE_BOOKING_SESSION_JOIN_EXPIRED,
    MASTER_NODE_TYPE_UNKNOWN
  } from '../../utils/Messages';
  import { MASTER_NODE_TYPE_INSTANT, MASTER_NODE_TYPE_SHARED } from '../../utils/master_node/MasterNodeInterface';

  const DECIMAL_LENGTH = 8;

  export default {
    name: 'MasterNodeJoin',
    components: { CountDown },
    props: {
      booking : {
        type: Object,
        default: () => {}
      },
      coin: {
        type: Object,
        default: () => {}
      },
      wallet_hnst: {
        type: Number,
        default: () => 0
      }
    },

    data() {
      return {
        page: {
          title: `Please finish your contribution before your booked seat is cancelled`,
          wallet_icon: `/img/img-wallet.png`,
          button_join_cancel: `Back or`,
          button_join_submit: `Submit`
        },
        is_count_down: true,

      }
    },

    computed: {
      ...mapGetters({
        wallet_header_getters : 'wallet',

        // client side rendering on-submit
        join_instant_getters  : 'join_instant_getters',
        join_shared_getters   : 'join_shared_getters'
      }),
      count_down: function() {
        return this.booking.expired_in ? this.booking.expired_in : 0;
      },
      /**
       *
       * @return {string}
       */
      receive_amount: function() {
        return parseFloat(Number(this.booking.seat * this.coin.coin_per_seat).toFixed(DECIMAL_LENGTH)) + ' ' + this.coin.ticker;
      },
      /**
       *
       * @return {string}
       */
      contribution_amount: function() {
        return parseFloat(Number(this.booking.hnst_needed).toFixed(DECIMAL_LENGTH)) + ' HNST';
      },
      /**
       *
       * @return {string}
       */
      coin_lack:function() {
        return parseFloat((this.booking.seat * this.coin.coin_per_seat) - this.coin_wallet).toFixed(DECIMAL_LENGTH)
      },

      coin_needed:function() {
        return this.booking.seat * this.coin.coin_per_seat
      },
      /**
       *
       * @return {*}
       *
       * NOTED:
       * wallet get from wallet header(ssr)
       * if wallet change from get manual(get from this component), make sure you have action to get wallet and set state to wallet_header_getters
       */
      coin_wallet: function() {
        //TODO: make sure wallet error has been handle properly
        if (Array.isArray(this.wallet_header_getters)) {
          let coin_wallet = this.wallet_header_getters.filter(data => {
            return data.coin.ticker === this.coin.ticker
          });

          if (coin_wallet && coin_wallet.length > 0) return coin_wallet[0].amount_available;
        } else {
          console.info('wallet must be array')
        }

        return 0;
      },
      /**
       *
       * @return {boolean}
       */
      is_coin_lack: function() {
        return this.coin_wallet < this.booking.seat
      },
      
    },

    methods: {
      ...mapActions({
        fetchJoinInstantAction  : 'fetchJoinInstantAction',
        fetchJoinSharedAction   : 'fetchJoinSharedAction'

      }),

      async requestJoinMasterNode() {

        if (await this.joinValidation() !== true) return false ;

        // start waiting
        this.$wait.start('join');

        // handle request trade instant
        if (this.booking.type === MASTER_NODE_TYPE_INSTANT) return this.requestJoinInstant();

        // handle request trade shared
        if (this.booking.type === MASTER_NODE_TYPE_SHARED) return this.requestJoinShared();

        return this.handleHttpError(MASTER_NODE_TYPE_UNKNOWN);
      },

      async joinValidation() {
        // TODO: validate before request join here
        return true;
      },

      /**
       *
       * @return {Promise<*>}
       */
      async requestJoinInstant() {
        let http_error = await this.fetchJoinInstantAction(this.generateRequestJoin());

        // is gateway ok ?
        if (http_error) return await this.handleHttpError(http_error);

        // getters init
        let { status, data, message, error_message, created_at } = this.join_instant_getters;

        // has been decline ?
        if (status === false) return await this.handleDecline(data, error_message, created_at);
        this.$bvModal.show('modal-success-join-instant')
        return await this.handleSuccess(message, data);
      },

      /**
       *
       * @return {Promise<*>}
       */
      async requestJoinShared() {
        let http_error = await this.fetchJoinSharedAction(this.generateRequestJoin());

        // is gateway ok ?
        if (http_error) return await this.handleHttpError(http_error);

        // getters init
        let { status, data, message, error_message, created_at } = this.join_shared_getters;

        // has been decline ?
        if (status === false) return await this.handleDecline(data, error_message, created_at);
        this.$bvModal.show('modal-success-join-shared')
        return await this.handleSuccess(message, data);
      },

      /**
       *
       * @return object { session_name }
       */
      generateRequestJoin() {
        return {
          session_name: this.booking.session_name
        }
      },

      cancelJoin(){
        this.$emit('joinInterface', false)
      },

      /**
       *
       * HANDLE RESPONSE
       * ***************************************************************************************************************
       */

      /**
       *
       * @param http_error (bad gateway code: 5XX)
       */
      async handleHttpError(http_error) {

        //TODO handle bad gateway properly

        this.$toast.error(HTTP_INTERNAL_SERVER_ERROR);

        // send event to parent
        this.$emit('joinInterface', {});

        // stop waiting
        return this.$wait.end('join');
      },

      /**
       *
       * @param message
       * @param data
       */
      async handleSuccess(message, data) {

        //TODO: handle success properly

        // send event to parent
        this.$emit('joinInterface', true);

        // call modal success
       
        this.is_count_down = false;

        // stop waiting
        return this.$wait.end('join');
      },

      /**
       *
       * @param data
       * @param message_error
       * @param created_at
       * @returns {Promise<void>}
       *
       * code: 4XX
       */
      async handleDecline(data, message_error, created_at) {

        //TODO: handle decline properly

        // send event to parent
        this.$emit('joinInterface', {});

        // stop waiting
        this.$wait.end('join');

        // set error message decline
        this.$toast.error(message_error || DEFAULT_REQUEST_DECLINE);

      },

      /**
       *
       */
      handleBookingExpired() {
        this.$emit('joinInterface', false);
        this.$toast.error(MASTER_NODE_BOOKING_SESSION_JOIN_EXPIRED);
        return true;
      },

      tabOption(){
        return this.$emit('joinInterface', 0)
      }
    }

  }
</script>
