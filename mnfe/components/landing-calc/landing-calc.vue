<template>
  <div class="col-sm-12 col-lg-7 colstyle">
    
    <div 
      :class="get_grade_color(coin1.grade)" 
      class="tokensinfo1 greenrow1">
      
      <div class="row h-100 rowsecond1">
        <div class="col-12 col-sm-3 choose">
          <div class="row imgchoose"><img
            :src="coininfo.image"
            class="logo" 
            style="width: 11vh; height: 11vh;"></div>
          <div 
            class="btn-group" 
            style="width: 120%;">
            <select 
              id="filter_my_mn" 
              class="col option-control text-uppercase" 
              @change="changeUrl">
              <!-- <option value="0">XZC</option>
              <option value="1">DASH</option>
              <option value="2">SMART</option>
              <option value="3">PIVX</option> -->
              <option value="">{{ coininfo.name }}</option>
            
              <template v-for="(Coindata, index) in coinAll" >
                <option 
                  v-if="Coindata.ticker !== ticker && Coindata.is_mn===true"
                  :key="index" 
                  :value="Coindata.ticker">{{ Coindata.name }}</option>
              </template>
                
            </select>
          </div>
        </div>
        <div 
          class="col-12 col-sm-9" 
          style="padding:5vh">
          <div class="row">
            <div class="col grade">
              <p 
                :class="get_grade_color(coininfo.grade)" 
                class="first">{{ checkgrade(coininfo.grade) }}</p>
              <div class="line"/>
              <p class="firstbottom">GRADE</p>
            </div>
            <div class="col annualyield">
              <p class="second">≈{{ coininfo.roi }}%</p>
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
                <span class="fourthmid d-block">({{ decimal(coininfo.price_hnst*coininfo.mn_min) }} HNST)</span>
              </p>
              <div class="line"/>
              <p class="fourthbottom">SIZE/SEAT</p>
            </div>
          </div>
        </div>
        
      </div>
      
      
    </div>
    <div class="containerdown">
      <div class="row rowtop">
        <div class="col">
          <p class="stakingcalc">STAKING CALCULATOR</p>
        </div>
      </div>
      <div class="row rowmid">
        <div class="col-12 col-sm-9 pl-0 pr-0">
          <no-ssr><vue-slider 
            v-bind="options" 
            v-model="value"/>
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
            <ul class="scale">
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
          
        <div 
          class="col-12 col-sm-3 seatinfo" 
          style="padding-right: 0px;">
          <p class="seat"><input 
            v-model="value" 
            type="number" 
            style="width: 46%; border-radius: 6%; border: solid black 0px; color: #03a2de;"> /{{ options.max }} <span style="font-size:1.5vh; color: white;">SEAT</span></p>
        </div>
      </div>
      <div class="row rowbot">
        <div class="col tdborder">
          <p>Total Deposit</p>
          <p class="calcnum">{{ coininfo.mn_min*value }}</p>
          <p class="calcinfo">{{ coininfo.name }}</p>
        </div>
        <div class="col infoborder">
          <p>Daily Reward</p>
          <p class="calcnum">{{ decimal(value*coininfo.reward_daily_every_seat) }}</p>
          <p class="calcinfo">{{ coininfo.name }}</p>
        </div>
        <div class="col infoborder">
          <p>Weekly Reward</p>
          <p class="calcnum">{{ decimal(value*coininfo.reward_daily_every_seat*7) }}</p>
          <p class="calcinfo">{{ coininfo.name }}</p>
        </div>
        <div class="col infoborder">
          <p >Monthly Reward</p>
          <p class="calcnum">{{ decimal(value*coininfo.reward_daily_every_seat*30) }}</p>
          <p class="calcinfo">{{ coininfo.name }}</p>
        </div>
        <div class="col">
          <p>Yearly Reward</p>
          <p class="calcnum">{{ decimal(value*coininfo.reward_daily_every_seat*365) }}</p>
          <p class="calcinfo">{{ coininfo.name }}</p>
        </div>
      </div>
  </div></div>
</template>
<script>
  
  import { mapGetters, mapActions } from 'vuex'
  import { DEFAULT_REQUEST_DECLINE, HTTP_INTERNAL_SERVER_ERROR } from '../../utils/Messages';
  import * as Cookies from 'js-cookie';
   
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
        if (process.client) { 
          Cookies.remove('auth');
        }

        //TODO: you can make ssr
        await this.requestCoin('');
        this.coinAll = this.coins
        await this.requestCoin(this.ticker);
        this.coin1 = this.coins
        
        this.options.max = Number(this.coininfo.needed)/Number(this.coininfo.coin_per_seat);
        
        
      },

      methods : {
        ...mapActions({
          fetchCoinList: 'fetchCoinList',
          
        }),
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

