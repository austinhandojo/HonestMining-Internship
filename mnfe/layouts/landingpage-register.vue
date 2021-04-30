<template>
  <div>
    <div class="splash active">
      <div class="icon"/>
    </div>

    <div 
      :class="getClass()"
      class="wrapper">
      <header class="main-header headerlanding">
        <div class="landing">
          <div class="logo-img">
            <a 
              href="/" 
              class="d-inline-block">
              <img 
                class="hmlogo" 
                src="/img/logo-HM-Alpha-01.svg" 
                alt="Honest Mining">
            </a>
          </div>
        </div>
      </header>

      <div class="inner innerlanding mb-0">
       
        
        <div class="container landingform">
          <nuxt/>
        </div>
      </div>
    </div>
    <footer class="landing-footer text-center">
      <div
        class="container"
      >Copyright © {{ (new Date()).getFullYear() }} Honest Mining. All trademarks and copyrights belong to their respective owners.</div>
    </footer>
  </div>
  
</template>

<script>
export default {
  head() {
    return {
      title: 'Honest Mining',
      script: 
          [
        {
          src:
            'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js',
          type: 'text/javascript'
        },
        {
          src:
            'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js',
          type: 'text/javascript'
        },
        {
          src:
            'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.1/js/bootstrap.min.js',
          type: 'text/javascript'
        },
        {
          src: '/vendor/md-snackbars/md-snackbars.min.js',
          type: 'text/javascript'
        },
        {
          src:
            'https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.17.0/jquery.validate.min.js',
          type: 'text/javascript'
        },
        { src: '/js/spark.js', type: 'text/javascript' },
        {
          src: 'https://www.google.com/recaptcha/api.js',
          type: 'text/javascript'
        }
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://brick.a.ssl.fastly.net/Montserrat:300,400,500,600,700'
        },
        {
          rel: 'stylesheet',
          href:
            'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.1/css/bootstrap.min.css'
        },
        {
          rel: 'stylesheet',
          href:
            'https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css'
        },
        {
          rel: 'stylesheet',
          href:
            'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
        },
        {
          rel: 'stylesheet',
          href: '/vendor/md-snackbars/md-snackbars.min.css'
        },
        { rel: 'stylesheet', href: '/css/placeholder.css' }
      ],
      bodyAttrs: {
        class: 'layout-client-sign bg-clouds'
      }
    };
  },
  computed: {
      getTickerUrl: function() {
        let arrVars = this.$route.path.split("/")
        return arrVars[2];
      }
    },

  async created(){
    this.ticker = this.getTickerUrl;
  },
    methods:{
    getClass(ticker){
      return {
        'bg-landing_dash': this.getTickerUrl === 'dash',
        'bg-landing_xzc': this.getTickerUrl === 'xzc',
        'bg-landing_smart': this.getTickerUrl === 'smart',
        'bg-landing_pivx': this.getTickerUrl === 'pivx'
      }
    }
  }
};
</script>
