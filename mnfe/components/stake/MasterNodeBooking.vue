<template>
  <section>
    <div class="mb-10">Put the amount of seats you want to book</div>
    
    <div class="row mb-10 align-items-center">
      <div class="col-sm-4">
        <input
          v-model="input.seat"
          class="inputSpinnerCustom"
          type="number"
          min="0"
          max="150"
          step="1"
          style="display: none;"
        >
        <div class="input-group">
          <div class="input-group-prepend">
            <button
              :disabled="is_min_seat"
              style="min-width: 2.5em"
              class="btn-decrement"
              type="button"
              @click="handleInputSeatIncrement"
            >
              <strong>-</strong>
            </button>
          </div>
          <input
            v-model="input.seat"
            type="text"
            style="text-align: center"
            class="form-control"
            @change="handleInputSeat">
          <div class="input-group-append">
            <button
              :disabled="is_max_seat"
              style="min-width: 2.5em"
              class="btn-decrement"
              type="button"
              @click="handleInputSeatDecrement"
            >
              <strong>+</strong>
            </button>
          </div>
        </div>
      </div>

      <div class="col-sm-8">
        seats <strong>(Limited seats! {{ seat_available }} seats left)</strong>
      </div>
    </div>
    <div class="mb-15">
      <div class="form-check d-none">
        <input
          id="exampleCheck1"
          type="checkbox"
          class="form-check-input"
        >
        <label
          class="form-check-label font-300"
          for="exampleCheck1">
          Join with max balance
        </label>
      </div>

    </div>
    <master-node-term-condition
      :data="fee"
      :type="type"/>
    <v-wait>
      <template slot="waiting">
        <div class="text-center">
          <b-button 
            class="btn-primary border-radius-30px next-step"
            disabled>
            <b-spinner 
              small 
              type="grow"/>
            Loading...
          </b-button>
        </div>
      </template>

      <div class="text-center">
        <button
          :disabled="is_allow_booking"
          :id="'next_join_mn_'+coin.ticker+'_'+type"
          type="submit"
          class="btn-primary border-radius-30px next-step"
          @click="requestBookingMasterNode()" >Next</button>
      </div>
    </v-wait>
    <!-- The modal -->
    
  </section>
</template>

<script>

  import { mapGetters, mapActions } from 'vuex'
  import MasterNodeTermCondition from './MasterNodeTermCondition';
  import {
    DEFAULT_REQUEST_DECLINE,
    HTTP_INTERNAL_SERVER_ERROR,
    MASTER_NODE_BOOKING_SEAT_NOT_ENOUGH
  } from '../../utils/Messages';
  import NotificationError from './notification/NotificationError';
  import { MASTER_NODE_TYPE_INSTANT, MASTER_NODE_TYPE_SHARED } from '../../utils/master_node/MasterNodeInterface';

  export default {
    name: 'MasterNodeBooking',
    components: { NotificationError, MasterNodeTermCondition },
    props: {
      seat_available: {
        type: Number,
        default: () => 0
      },
      fee: {
        type: Object,
        default: () => {}
      },
      type: {
        type: String,
        default: () => MASTER_NODE_TYPE_INSTANT
      },
      coin: {
        type: Object,
        default: () => {}
      },
    },

    data() {
      return {
        input: {
          seat: 0
        },
        notification: {
          show: false,
          title: ``,
          message: ``,
          image: ``,
          data: ``
        }
      }
    },

    computed: {
      ...mapGetters({

        // client side rendering on-submit
        stake_booking_getters: 'stake_booking_getters'
      }),
      is_max_seat: function() {
        return this.seat_available === this.input.seat
      },
      is_min_seat: function() {
        return this.input.seat === 0
      },
      is_allow_booking: function(){
        return typeof this.coin === 'object' && this.coin.disallow_join_hnst && this.coin.disallow_join_coin
      }
    },

    methods: {
      ...mapActions({

        // client side rendering on-submit
        fetchMasterNodeBookingAction  : 'fetchMasterNodeBookingAction'
      }),

      /**
       *
       * @return {Promise<*>}
       */
      async requestBookingMasterNode() {

        if (await this.bookingValidation() !== true) return;

        // start waiting
        this.$wait.start('booking');

        // handle request
        let http_error = await this.fetchMasterNodeBookingAction(this.generateRequestBooking());

        // is gateway ok ?
        if (http_error) return await this.handleHttpError(http_error);

        // getters init
        let { status, data, message, error_message, created_at } = this.stake_booking_getters;

        // has been decline ?
        if (status === false) return await this.handleDecline(data, error_message, created_at);

        // add type booking
        data.type = this.type;

        return await this.handleSuccess(message, data);
      },

      /**
       *
       * make payload booking request
       */
       generateRequestBooking() {
        // init coin
        let { ticker, coin_per_seat } = this.coin;

        // init user input
        let { seat } = this.input;

        return {
          ticker          : ticker,
          amount          : seat * coin_per_seat,
          seat            : Number(seat),
          coin_per_seat   : parseFloat(coin_per_seat),
          is_instant      : this.type === MASTER_NODE_TYPE_INSTANT
        }
      },

      /**
       *
       * sanitize before request
       */
      async bookingValidation() {

        if (this.input.seat === 0) {
          this.$emit('bookingInterface', {
            message: `The amount of seats that you want to contribute is not valid.`
          })
          this.notification.title = `Sorry!`;
          this.notification.message = `The amount of seats that you want to contribute is not valid.`
          await this.$bvModal.show('modal-error');
          return this.notification;
        }

        // is seat instant available
        if (MASTER_NODE_TYPE_INSTANT === this.type && this.input.seat > this.seat_available) return this.$toasted.error(MASTER_NODE_BOOKING_SEAT_NOT_ENOUGH);

        // is seat shared available
        if (MASTER_NODE_TYPE_SHARED === this.type && this.input.seat > this.seat_available) return this.$toasted.error(MASTER_NODE_BOOKING_SEAT_NOT_ENOUGH);

        //TODO: handle for unknown type

        return true;
      },

      /**
       *
       * HANDLE INPUT SEAT
       * ***************************************************************************************************************
       */

      handleInputSeat() {
        if (this.input.seat > this.seat_available) this.input.seat = this.seat_available;

        return this.input.seat === this.seat_available
      },

      handleInputSeatIncrement() {
        if (this.input.seat > 0) this.input.seat -- ;

        return this.input.seat
      },

      handleInputSeatDecrement() {
        if (this.input.seat < this.seat_available) this.input.seat ++;


        return this.input.seat
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
        this.$emit('bookingInterface', {});

        // stop waiting
        return this.$wait.end('booking');
      },

      /**
       *
       * @param message
       * @param data
       */
      async handleSuccess(message, data) {

        //TODO: handle success properly

        // send event to parent
        this.$emit('bookingInterface', data);

        // stop waiting
        return this.$wait.end('booking');
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
        this.$emit('bookingInterface', false);

        // stop waiting
        this.$wait.end('booking');

        // send event to parent
        this.$emit('bookingInterface', {});

        // set error message decline
        this.$toast.error(message_error || DEFAULT_REQUEST_DECLINE);

      },

    }

  }
</script>
