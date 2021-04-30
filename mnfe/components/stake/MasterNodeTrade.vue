<template>
  <section>
    <div class="mt-20 text-center">
      <div class="text-center font-500 mb-10">Please finish your contribution before your booked seat is cancelled</div>
      <count-down
        :data="count_down"
        :start="is_count_down"
        @timeInterface="handleBookingExpired"/>

      <div
        class="row mb-20 logo-tab-deposit justify-content-center align-items-center">
        <div class="row col-12 tab-deopsit-container">
          <div class="col-5 col-sm-3 text-center">
            <img
              class="mb-10"
              src="/img/logo-mini.png"
              alt="">
            <div>{{ page.subtitle_contribution }}</div>
            <div class="font-bold color-primary">{{ contribution_amount }} {{ page.reference_coin }}</div>
          </div>
          <div class="col-2 col-sm-1">
            <i class="fas fa-arrow-right font-18"/>
          </div>
          <div class="col-5 col-sm-3">
            <img
              :src="coin.image"
              class="mb-10"
              alt="">
            <div>{{ page.subtitle_receive }}</div>
            <div class="font-bold color-primary">{{ receive_amount }}</div>
          </div>
        </div>
        <div class="color-black-min col-12 mt-20">{{ page.notice_wallet_balance }} <span class="font-500 color-black">{{ hnst_wallet }} {{ page.reference_coin }}</span>
        </div>
        <div
          v-if="isCoinLack"
          class="color-red mt-5 w-100">You need {{ coin_lack }} more HNST to contribute or choose
          <a
            class="color-red text-underline"
            @click="tabOption">other payment option</a></div>
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
              :id="'cancel_join_'+booking.type+'_hnst_'+coin.ticker"
              href="#"
              class="color-primary"
              @click="cancelTrade()">{{ page.button_trade_cancel }}</a>
            <button
              :disabled="isCoinLack"
              :id="'submit_join_'+booking.type+'_hnst_'+coin.ticker"
              class="btn-primary border-radius-30px mr-5 ml-5"
              @click="requestTrade()"
            >
              {{ page.button_trade_submit }}
            </button>
          </div>
        </v-wait>
      </div>
    </div>
  </section>
</template>
<script>

  import { mapGetters, mapActions } from 'vuex'
  import {
    DEFAULT_REQUEST_DECLINE, HTTP_INTERNAL_SERVER_ERROR, MASTER_NODE_BOOKING_SESSION_TRADE_EXPIRED,
    MASTER_NODE_TYPE_UNKNOWN
  } from '../../utils/Messages';
  import CountDown from '../CountDown';

  const DECIMAL_LENGTH = 8;
  const REFERENCE_COIN = `HNST`;
  const TYPE_INSTANT = 'instant';
  const TYPE_SHARED = 'shared';

  export default {
    name: 'MasterNodeTrade',
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

        //TODO: make sure all copy writing not hard code at template

        page: {
          subtitle_contribution: `Contribution Amount`,
          subtitle_receive: `Receive Amount`,

          reference_coin: REFERENCE_COIN,

          notice_wallet_balance: `Your ${REFERENCE_COIN} wallet balance :`,
          button_trade_cancel : `Back or`,
          button_trade_submit: `Submit`
        },
        is_count_down: true,
      }
    },

    computed: {
      ...mapGetters({
        // server side rendering (SSR) on middleware/layout
        wallet_header_getters : 'wallet',

        // client side rendering on-submit
        trade_instant_getters : 'trade_instant_getters',
        trade_shared_getters  : 'trade_shared_getters'
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
       * @return {number}
       */
      contribution_amount: function() {
        return parseFloat(Number(this.booking.hnst_needed).toFixed(DECIMAL_LENGTH));
      },
      /**
       *
       * @return {string}
       */
      coin_lack:function() {
        return parseFloat(this.booking.hnst_needed - this.hnst_wallet).toFixed(DECIMAL_LENGTH)
      },
      /**
       *
       * @return {*}
       *
       * NOTED:
       * wallet get from wallet header(ssr)
       * if wallet change from get manual(get from this component), make sure you have action to get wallet and set state to wallet_header_getters
       */
      hnst_wallet: function() {

        //TODO: make sure wallet error has been handle properly

        if (Array.isArray(this.wallet_header_getters)) {
          let hnst_wallet = this.wallet_header_getters.filter(data => {
            return data.coin.ticker === this.page.reference_coin
          });

          if (hnst_wallet && hnst_wallet.length > 0) return hnst_wallet[0].amount_available;
        } else {
          console.info('wallet must be array')
        }

        return 0;
      },
      /**
       *
       * @return {boolean}
       */
      isCoinLack: function() {
        return this.hnst_wallet < this.booking.hnst_needed
      }
    },



    methods: {
      ...mapActions({

        // client side rendering on-submit
        fetchTradeInstantAction  : 'fetchTradeInstantAction',
        fetchTradeSharedAction   : 'fetchTradeSharedAction'
      }),

      /**
       *
       * @return {Promise<*>}
       */
      async requestTrade() {

        if (this.tradeValidation() !== true) return false ;

        // start waiting
        this.$wait.start('trade');

        // handle request trade instant
        if (this.booking.type === TYPE_INSTANT) return this.requestTradeInstant();

        // handle request trade shared
        if (this.booking.type === TYPE_SHARED) return this.requestTradeShared();

        return this.handleHttpError(MASTER_NODE_TYPE_UNKNOWN);
      },

      /**
       *
       * @return {Promise<*>}
       */
      async requestTradeInstant() {
        let http_error = await this.fetchTradeInstantAction(this.generateRequestTrade());

        // is gateway ok ?
        if (http_error) return await this.handleHttpError(http_error);

        // getters init
        let { status, data, message, error_message, created_at } = this.trade_instant_getters;

        // has been decline ?
        if (status === false) return await this.handleDecline(data, error_message, created_at);
        this.$bvModal.show('modal-success-join-instant')

        return await this.handleSuccess(message, data);
      },


      /**
       *
       * @return {Promise<*>}
       */
      async requestTradeShared() {
        let http_error = await this.fetchTradeSharedAction(this.generateRequestTrade());

        // is gateway ok ?
        if (http_error) return await this.handleHttpError(http_error);

        // getters init
        let { status, data, message, error_message, created_at } = this.trade_shared_getters;

        // has been decline ?
        if (status === false) return await this.handleDecline(data, error_message, created_at);
        this.$bvModal.show('modal-success-join-shared')

        return await this.handleSuccess(message, data);
      },

      /**
       *
       * @return boolean
       */
      tradeValidation() {
        return true;
      },

      /**
       *
       * @return object { session_name }
       */
      generateRequestTrade() {
        return {
          session_name: this.booking.session_name
        }
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
        this.$emit('tradeInterface', {});

        // stop waiting
        return this.$wait.end('trade');
      },

      /**
       *
       * @param message
       * @param data
       */
      async handleSuccess(message, data) {

        //TODO: handle success properly

        // call modal success
        
        // send event to parent
        this.$emit('tradeInterface', data);

        this.is_count_down = false;

        // stop waiting
        return this.$wait.end('trade');
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
        this.$emit('tradeInterface', {});

        // stop waiting
        this.$wait.end('trade');

        // set error message decline
        this.$toast.error(message_error || DEFAULT_REQUEST_DECLINE);

      },

      handleBookingExpired() {
        this.$emit('tradeInterface', false);
        this.$toast.error(MASTER_NODE_BOOKING_SESSION_TRADE_EXPIRED);
      },

      async cancelTrade() {
        return this.$emit('tradeInterface', false);
      },

      tabOption(){
        return this.$emit('tradeInterface', 1)
      }
  }

  }
</script>
