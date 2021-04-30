<template>
  <div class="col-sm-12 col-lg-7 colstyle"> <h1>Register on Honest Mining for FREE 5 HNST and join staking <span class="text-uppercase">{{ coininfo.name }}</span> now!</h1>
    <div 
      :class="get_grade_color(coininfo.grade)" 
      class="tokensinfo greenrow">
      <div class="row h-100 rowtext">
        <div class="col-3 col-sm-2">
          <img
            :src="coininfo.image"
            class="logo">
        </div>
        <div class="col-9 col-sm-10">

          <p class="mb-0 fontname text-uppercase">{{ coininfo.name }}</p>
          <p class="fontname text-uppercase">({{ coininfo.ticker }})</p>
        </div>
      </div>
      <div class="row h-100 rowsecond">
        <div class="col grade">
          <p 
            :class="get_grade_color(coininfo.grade)" 
            class="first">{{ checkgrade(coininfo.grade) }}</p>
          <div class="line"/>
          <p class="firstbottom">GRADE</p>
        </div>
        <div class="col annualyield">
          <p class="second">≈ {{ coininfo.roi }}%</p>
          <div class="line"/>
          <p class="secondbottom">EST. ANNUAL YIELD</p>
        </div>
        <div class="col collateral">
          <p class="third">{{ number(coininfo.needed) }}</p>
          <div class="line"/>
          <p class="thirdbottom">COLLATERAL MN</p>
        </div>
        <div class="col">
          <p class="fourth text-uppercase">{{ number(coininfo.mn_min) }} {{ coininfo.ticker }} 
            <span class="fourthmid d-block">({{ coininfo.price_hnst*coininfo.mn_min }} HNST)</span>
          </p>
          <div class="line"/>
          <p class="fourthbottom">SIZE/SEAT</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

  import { mapGetters, mapActions } from 'vuex'
  import { DEFAULT_REQUEST_DECLINE, HTTP_INTERNAL_SERVER_ERROR } from '../../utils/Messages';

    export default {
      name: 'CoinInformation',
      props: {
        ticker: {
          type: String,
          default: () => 'DASH'
        },
      },

      data() {
        return {
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
          // client side rendering (auto-load)
          coins_getters: 'coins_getters',
        }),
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
          return (number, digit = 2) => parseFloat(number).toFixed(digit)
        },
      },

      async created() {
        //TODO: you can make ssr
        await this.requestCoin(this.ticker);

      },

      methods : {
        ...mapActions({
          fetchCoinList: 'fetchCoinList',
        }),

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
         * @param http_error (bad gateway code: 5XX)
         */
        async handleHttpError(http_error) {

          //TODO handle bad gateway properly

          this.$toast.error(HTTP_INTERNAL_SERVER_ERROR);

          // send event to parent
          this.$emit('coinInterface', {});

          // stop waiting
          return this.$wait.end('coins');
        },

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

