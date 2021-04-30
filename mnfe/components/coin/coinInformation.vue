<template>
  <section>
    <template
      v-for="(coin, index) in coins">
      <div 
        :key="index" 
        
        class="card card-default box">
        <div 
          :class="get_grade_color(coin.grade)" 
          class="card-body box-masternode-detail" >
          <div class="d-flex justify-content-between mb-10">
            <div class="col-6">
              <h3 class="card-title color-primary">COIN INFORMATION</h3>
            </div>
            <div class="col-6 d-flex justify-content-end">
              <div class="available-balance">
                <div class="text-right">
                  Available Balance
                </div>
                <div class="text-right color-primary">
                  {{ decimal(stacked_balanced(coin.ticker)) }} {{ coin.ticker }}
                </div>
              </div>
            </div>
          </div>
          
          <div class="head">
            <div
              v-if="coin.is_mn"
              class="row h-100">
              <div class="col-3 col-md-2">
                <div class="img-box">
                  <img
                    :src="coin.image"
                    class="w-100"
                    alt="">
                </div>
              </div>
              <div class="col-9 col-md-10 font-bold">
                <h3 class="mb-10">{{ coin.name }} ({{ coin.ticker }})</h3>
                <div class="row">
                  <div class="col-auto right-dotted-blue">
                    <div class="font-12 color-black-min font-400 d-flex align-items-center">
                      Grade <span class="info-tooltip ml-1">i</span> 
                    </div>
                    <div 
                      :class="get_grade_color(coin.grade)" 
                      class="grade-text">
                      <h4 class="font-500">{{ have_grade(coin.grade) }}</h4>
                    </div>
                  </div>
                  <div class="col-auto color-primary font-400 right-dotted-blue">
                    <div class="font-12">Annual Yield</div>
                    <h4 class="font-500">≈ {{ coin.roi }}%</h4>
                  </div>
                  <div class="col-auto right-dotted-blue">
                    <div class="font-12 color-black-min font-400">Collateral / MN</div>
                    <h4 class="font-500"> 
                      <template v-if="coin.needed != null">
                        {{ formatNumber(coin.needed) }} seat
                      </template>
                      <template v-else>0</template>
                    </h4>
                  </div>
                  <div class="col-auto">
                    <div class="font-12 color-black-min font-400">Size / Seat</div>
                    <h4 class="font-500">{{ number(coin.coin_per_seat) }} {{ coin.ticker }} ({{ decimal(coin.price_hnst * coin.coin_per_seat) }} HNST)</h4>
                  </div>                    
                </div>
              </div>
            </div>
          
          
          </div>
        </div>
      </div>
    </template>
  </section>
    
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
          coins: []
        }
      },

      computed: {
        ...mapGetters({
          // client side rendering (auto-load)
          coins_getters: 'coins_getters',
          wallet: 'wallet'
        }),
        // check is have grade
        have_grade() {
          return grade => {
            return grade || '???'
          }
        },
        // get grade color
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

        stacked_balanced(){
          return ticker => {
            let wallet = this.wallet.filter(data => {
              return data.coin.ticker === ticker
            })
            return wallet.length > 0 ? wallet[0].amount_available : '0'
          }
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
          fetchListWallet: 'fetchListWallet'
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
          
          // go to 404 if url not ticker
          if (data.coin.length === 0){
            //  console.log(data.coin.length, 'isi data null')
            this.$router.push('/page-404')
          }

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

        /**
         *
         * FORMAT NUMBER
         * ***************************************************************************************************************
         */
        formatNumber(float) {
          if (!float) return 0;
          return this.$filters.numberFormat(float, 8, true);
        },

      }

    }
</script>
