const webpack = require('webpack');

require('dotenv').config();

module.exports = {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  env: {
    GOOGLECAPTCHA: process.env.GOOGLECAPTCHA,
    GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
    GOOGLE_SITE_VERIFICATION: process.env.GOOGLE_SITE_VERIFICATION
  },
  head: {
    title: 'Honest Mining',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Discover the Future of Crypto Mining with Honest Mining. Our mission is building trustworthy and easy crypto mining that is accessible to everyone.'
      },
      {
        hid: 'keyword',
        name: 'keyword',
        content:
          'HNST, honest token, honest, honest mining, honest staking, staking pool, staking as a service, cryptocurrency,  crypto mining, cryptocurrency mining, crypto staking, cryptocurrency staking, masternode mining, masternodes mining, proof of stake mining, proof-of-stake mining, proof of stake, proof-of-stake, masternode, masternodes, DASH, dashcoin, XZC, ZCoin, SMART, SmartCash, Ethereum, Ether, ETH, mining, bitcoin, cloud mining, mining pool, shared pool, shared mining, shared masternode, shared masternode service, pooled service, instant masternode, Passive Rewards, lawrence samantha, edy senjaya, dionisius evan alam'
      },
      {
        hid: 'og:description',
        name: 'og:description',
        content:
          'Register now at Honest Mining, get 5 FREE HNST  and Discover the Future of Crypto Mining. Our mission is building trustworthy and easy crypto mining that is accessible to everyone.'
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: "Everyone's Crypto Mining Partner"
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content:
          'Discover the Future of Crypto Mining with Honest Mining. Our mission is building trustworthy and easy crypto mining that is accessible to everyone.'
      },
      {
        name: 'google-site-verification',
        content: process.env.GOOGLE_SITE_VERIFICATION
      }
    ],
    __dangerouslyDisableSanitizers: ['script', 'noscript'],
    script: [
      {
        innerHTML: process.env.GTM_ID
          ? `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${
              process.env.GTM_ID
            }');`
          : false
      },
      {
        innerHTML:
          "!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '1845687818989309');fbq('track', 'PageView');"
      }
    ],
    noscript: [
      {
        innerHTML: process.env.GTM_ID
          ? `<iframe src="https://www.googletagmanager.com/ns.html?id=${
              process.env.GTM_ID
            }" height="0" width="0" style="display:none;visibility:hidden"></iframe>`
          : false,
        body: true
      },
      {
        innerHTML:
          '<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1845687818989309&ev=PageView&noscript=1"/>',
        body: true
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff', throttle: 1000 },

  /*
   ** Global CSS
   */
  css: [
    '~/node_modules/@fortawesome/fontawesome-free/css/all.min.css',
    '~/node_modules/ionicons/dist/css/ionicons.min.css',
    '~/node_modules/@icon/themify-icons/themify-icons.css',
    '~/assets/style/new/index.scss'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/lodash',
    '~/plugins/lang',
    '~/plugins/axios',
    { src: '~plugins/vee-validate.js', ssr: true },
    { src: '~plugins/directives.js', ssr: false },
    '~/plugins/assets',
    '~/plugins/global',
    '~/plugins/component',
    '~/plugins/notification',
    '~/plugins/filters',
    '~/plugins/table',
    '~/plugins/vue-spinner',
    '~/plugins/vue-tel-input-fix',
    { src: '~plugins/tawkto.js', ssr: false },
    { src: '~plugins/vue-bootstrap-datetimepicker.js', ssr: false },
    { src: '~plugins/vue-slider-component.js', ssr: false }
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    'bootstrap-vue/nuxt',
    'vue-sweetalert2/nuxt',
    '@nuxtjs/toast',
    ['vue-wait/nuxt', { useVuex: true }],
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    'cookie-universal-nuxt',
    [
      '@nuxtjs/google-analytics',
      {
        id: process.env.GOOGLE_ANALYTICS_ID
      }
    ]
  ],

  router: {
    middleware: ['redirect']
  },

  axios: {
    baseURL: process.env.URL
  },

  /**
   * source: https://github.com/shakee93/vue-toasted
   */
  toast: {
    theme: 'toasted-primary',
    position: 'bottom-right',
    duration: 5000,
    closeOnSwipe: true,
    register: [
      // Register custom toasts
      {
        name: 'INTERNAL SERVER ERROR',
        message: 'please try again latter!',
        options: {
          type: 'error'
        }
      }
    ]
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.devtool = false;
      config.node = {
        fs: 'empty'
      };

      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true
          }
        });
      }
    },

    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery'
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ],

    extractCSS: true
  }
};
