<template>
  <div class="col-12 colstyle_join">
    <div class="containerdown_join">
      <div class="row rowtop">
        <div class="col">
          <p 
            class="stakingcalc_join" 
            style="color: #03a2de;">Put the amount of seeds you want to join.</p>
          <p class="stakingcalc_join">Seat Quantity</p>
        </div>
      </div>
      <div class="row rowmid_join">
        <div 
          class="col-12 col-sm-3 seatinfo" 
          style="padding-right: 0px;">
          <input
            v-model="input_seat"
            class="inputSpinnerCustom"
            type="number"
            min="0"
            max="150"
            step="1"
            style="display: none;"
          >
          <div class="input-group">
         
            <div 
              class="row" 
              style="width: 100%;">
              <input

                v-model="input_seat"
                type="text"
                style="text-align: center"
                class="form-control"
                @change="handleInputSeat">
            </div>
            <div 
              class="row" 
              style="width: 100%;"> <div 
                class="col input-group-prepend" 
                style="padding: 0%;">
                <button
                  :disabled="is_min_seat"
                  style="width: 100%"
                  class="btn-decrement"
                  type="button"
                  @click="handleInputSeatIncrement"
                >
                  <strong>-</strong>
                </button>
              </div>
              <div 
                class="col input-group-append" 
                style="padding: 0%;">
                <button
                  :disabled="is_max_seat"
                  style="width: 100%"
                  class="btn-decrement"
                  type="button"
                  @click="handleInputSeatDecrement"
                >
                  <strong>+</strong>
                </button>
              </div>
            </div>
          
          </div>
          <input
            v-model="input_seat"
            class="inputSpinnerCustom"
            type="number"
            min="0"
            max="150"
            step="1"
            style="display: none;"
          >
          <!-- <p class="seat"><input 
            v-model="input_seat" 
            type="number" 
            style="width: 46%; border-radius: 6%; border: solid black 0px; color: #03a2de;"> /{{ options.max }} <span style="font-size:1.5vh; color: white;">SEAT</span></p> -->
        </div>
        <div class="col-12 col-sm-9 pl-0 pr-0">
          <no-ssr><vue-slider 
            v-bind="options"
            v-model="input_seat" 
            class="slider_join"/>
          </no-ssr>
          <!-- <div 
            class="row" 
            style="position: absolute;height: 1vh;padding: 0%;margin: 0%;">
            <div 
              class="col numline" 
              style="right: 2vw;"/>
            <div 
              class="col numline" 
              style="right: -5.3vw;"/>
            <div 
              class="col numline" 
              style="right: -12.6vw;"/>
            <div 
              class="col numline" 
              style="right: -19.9vw;"/>
            <div 
              class="col numline" 
              style="right: -27.2vw;"/>
          </div> -->
          <div 
            class="row ml-0 mr-0" 
            style="padding-bottom: 3%;padding-top: 0vh;font-size: 2vh;">
            <ul class="scale_join">
              <li 
                class="point option1"
                
              ><span>0</span></li>
              <li 
                class="point option2" 
              ><span>{{ options.max*0.25 }}</span></li>
              <li 
                class="point option3" 
              ><span>{{ options.max*0.5 }}</span></li>
              <li 
                class="point option4 " 
              ><span>{{ options.max*0.75 }}</span></li>
              <li 
                class="point option5" 
              >{{ options.max }}</li>
            </ul>
          </div>
        </div>
          
        
      </div>
      <div class="row rowbot_join">
        <div class="col tdborder_join">
          <div 
            class="row" 
            style="padding-left: 14%; background: #03a2de;">
            <p style="color: white; padding-top: 0.5em;">Total Deposit</p>
          </div>
          <div 
            class="row calcnum_join" 
            style="display: contents;">  
            <p style="margin-bottom: 0rem;">{{ coininfo.mn_min*input_seat }}</p>
          </div>
          <div 
            class="row calcinfo_join" 
            style="display: contents;">
            <p>{{ coininfo.name }}</p>
          </div>  
        </div>
        <div class="col infoborder">
          <p style="padding-top: 0.5em;">Daily Reward</p>
          <p class="calcnum_join">{{ decimal(input_seat*coininfo.reward_daily_every_seat) }}</p>
          <p class="calcinfo_join">{{ coininfo.name }}</p>
        </div>
        <div class="col infoborder">
          <p style="padding-top: 0.5em;">Weekly Reward</p>
          <p class="calcnum_join">{{ decimal(input_seat*coininfo.reward_daily_every_seat*7) }}</p>
          <p class="calcinfo_join">{{ coininfo.name }}</p>
        </div>
        <div class="col infoborder">
          <p style="padding-top: 0.5em;">Monthly Reward</p>
          <p class="calcnum_join">{{ decimal(input_seat*coininfo.reward_daily_every_seat*30) }}</p>
          <p class="calcinfo_join">{{ coininfo.name }}</p>
        </div>
        <div class="col">
          <p style="padding-top: 0.5em;">Yearly Reward</p>
          <p class="calcnum_join">{{ decimal(input_seat*coininfo.reward_daily_every_seat*365) }}</p>
          <p class="calcinfo_join">{{ coininfo.name }}</p>
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
        <v-wait style="width: 100%;">
          
          <template 
            slot="waiting" 
          >
            <div 
              class="text-center" >
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
        

          <div 
            class="text-center" 
          >
            <button
              :disabled="is_allow_booking"
              :id="'next_join_mn_'+coin.ticker+'_'+type"
              type="submit"
              class="btn-primary border-radius-30px next-step"
              @click="requestBookingMasterNode()" >Next</button>
          </div>
        </v-wait>
        <!-- The modal -->
    

      </div>
  </div></div>



</template>
<script>
 
  import MasterNodeTermCondition from './MasterNodeTermCondition';
  import {    MASTER_NODE_BOOKING_SEAT_NOT_ENOUGH
  } from '../../utils/Messages';
  import NotificationError from './notification/NotificationError';
  import { MASTER_NODE_TYPE_INSTANT, MASTER_NODE_TYPE_SHARED } from '../../utils/master_node/MasterNodeInterface';
  import { mapGetters, mapActions } from 'vuex'
  import { DEFAULT_REQUEST_DECLINE, HTTP_INTERNAL_SERVER_ERROR } from '../../utils/Messages';
  import * as Cookies from 'js-cookie';
   
    export default {
      name: 'CoinInformation',
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
         input_seat:{
        type: Number,
        default: () => 0
      },
        ticker: {
          type: String,
          default: () => 'DASH'
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
        },
          coin1: {},
          coinAll: {},
          value: 0,
          options: {
          max: 0,
        },
          coins: [],
          coininfo : {}
        }
      },
      computed: {
        get_grade_color(){
      return grade => {
        let check_grade = grade ? grade.substring(0,1) : '?'
        switch (check_grade) {
          case 'A':
            return 'grade_color_a'
          case 'B':
            return 'grade_color_b'
          case 'C':
            return 'grade_color_c'
          default:
            return 'grade_color_0'
        }
      }
      
    },
        checkgrade(){
          return grade => {
            return grade || '???'
          }
        },
        ...mapGetters({
          
          coin: 'coin',
          // client side rendering (auto-load)
          coins_getters: 'coins_getters',
            // client side rendering on-submit
        stake_booking_getters: 'stake_booking_getters'
        }),

        is_max_seat: function() {
        return this.seat_available === this.input_seat
      },
      is_min_seat: function() {
        return this.input_seat === 0
      },
      is_allow_booking: function(){
        return typeof this.coin === 'object' && this.coin.disallow_join_hnst && this.coin.disallow_join_coin
      },
        /**
         *
         * @return {function(*=): number}
         */
        number() {
          return number => parseFloat(number)
        },
        /**
         *
         * @return {function(*=, *=): string}
         */
        decimal() {
          return (number, digit = 3) => parseFloat(number).toFixed(digit)
        },
      },
      mounted(){
      //   var slider = document.getElementById("myRange");
      //     var output = document.getElementById("demo");
      //     output.innerHTML = slider.value;

      //     slider.oninput = function() {
      //       output.innerHTML = this.value;
      //     }
       },
      async created() {

        //TODO: you can make ssr
        await this.requestCoin('');
        this.coinAll = this.coins
        await this.requestCoin(this.ticker);
        this.coin1 = this.coins
        
        this.options.max = Number(this.coininfo.needed)/Number(this.coininfo.coin_per_seat);
        
        
      },

      methods : {
        ...mapActions({
          // client side rendering on-submit
        fetchMasterNodeBookingAction  : 'fetchMasterNodeBookingAction',

          fetchCoinList: 'fetchCoinList',
          
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

        if (this.input_seat === 0) {
          this.$emit('bookingInterface', {
            message: `The amount of seats that you want to contribute is not valid.`
          })
          this.notification.title = `Sorry!`;
          this.notification.message = `The amount of seats that you want to contribute is not valid.`
          await this.$bvModal.show('modal-error');
          return this.notification;
        }

        // is seat instant available
        if (MASTER_NODE_TYPE_INSTANT === this.type && this.input_seat > this.seat_available) return this.$toasted.error(MASTER_NODE_BOOKING_SEAT_NOT_ENOUGH);

        // is seat shared available
        if (MASTER_NODE_TYPE_SHARED === this.type && this.input_seat > this.seat_available) return this.$toasted.error(MASTER_NODE_BOOKING_SEAT_NOT_ENOUGH);

        //TODO: handle for unknown type

        return true;
      },

      /**
       *
       * HANDLE INPUT SEAT
       * ***************************************************************************************************************
       */

      handleInputSeat() {
        if (this.input_seat > this.seat_available) this.input_seat = this.seat_available;

        return this.input_seat === this.seat_available
      },

      handleInputSeatIncrement() {
        if (this.input_seat > 0) this.input_seat -- ;

        return this.input_seat
      },

      handleInputSeatDecrement() {
        if (this.input_seat < this.seat_available) this.input_seat ++;


        return this.input_seat
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
      

      /**
       *
       * @param data
       * @param message_error
       * @param created_at
       * @returns {Promise<void>}
       *
       * code: 4XX
       */
      
        async changeUrl(event){
          if(event.target.value){
            this.$router.push('/landing-calc/' + event.target.value);
          }
        },

        /**
         * TAKING DATA FROM COINS BECAUSE PRICES ARE ALWAYS CERTAIN
         *
         * @param ticker
         * @returns {Promise<String.data|getters.coins_getters.data|{}>}
         */
        async requestCoin(ticker) {
          let http_error = await this.fetchCoinList(this.generateRequestWithPaginate({ search_key: ticker }, {
            current_page: 1,
            per_page: 1
          }));

          // is gateway ok ?
          if (http_error) return this.handleHttpError(http_error);

          let { status, data, message, message_error, created_at } = this.coins_getters;

          // has been decline ?
          if (status === false) return this.handleDecline(data, message_error, created_at);

          this.setCoin(data);

          return this.handleSuccess(message, data);
        },

        /**
         * SETTER
         * ***************************************************************************************************************
         */

        setCoin(data) {
          let { coin } = data;
          this.coins = Array.isArray(coin) ? coin : [];
          this.coininfo = this.coins[0];
        },

        /**
         * REQUEST GENERATOR
         * ***************************************************************************************************************
         */

        generateRequestWithPaginate(option = {}, paginate = {}) {
          option.paginate = paginate;
          return option;
        },

        /**
         *
         * HANDLE RESPONSE
         * ***************************************************************************************************************
         */


        /**
         *
         * @param message
         * @param data
         */
        async handleSuccess(message, data) {

          //TODO: handle success properly

          // init data
          let { coin } = data;

          // send event to parent
          this.$emit('coinInterface', coin && coin.length > 0 ? coin[0] : {});

          // stop waiting
          return this.$wait.end('coins');
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
          this.$emit('coinInterface', {});

          // stop waiting
          this.$wait.end('trade');

          // set error message decline
          this.$toast.error(message_error || DEFAULT_REQUEST_DECLINE);
        },
      }

    }
</script>

