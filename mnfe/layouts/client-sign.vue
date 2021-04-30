<template>
  <div>
    <div class="splash active">
      <div class="icon"/>
    </div>

    <div class="wrapper">
      <header class="main-header">
        <div class="container">
          <div class="logo-img alpha">
            <a 
              href="/" 
              class="d-inline-block">
              <img 
                src="/img/logo-HM-Alpha-01.svg" 
                alt="Honest Mining">
            </a>
          </div>
        </div>
      </header>

      <div class="inner">
        <div class="container">
          <nuxt/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Honest Mining',
      script: [
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
        class: 'main-section layout-client-sign bg-curve bg-clouds '
      }
    };
  }
};
</script>
