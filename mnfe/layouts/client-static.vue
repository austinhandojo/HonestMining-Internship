<template>
  <div>
    <splash :show="$global.splash" />

    <header 
      id="master-header" 
      ref="masterHeader" 
      class="master-header">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-4">
            <div class="header--nav d-none d-lg-block">
              <nav>
                <div class="nav-dropdown">
                  <div class="toggle">
                    <span>About</span>
                    <i class="icon-font ion ion-ios-arrow-down" />
                  </div>
                  <div class="menu">
                    <ul>
                      <li>
                        <span @click="handleMenu('#section-about', -100)">About</span>
                      </li>
                      <li>
                        <span @click="handleMenu('#section-features', -120)">Features</span>
                      </li>
                      <li>
                        <span @click="handleMenu('#section-how', -80)">How We Work</span>
                      </li>
                      <li>
                        <span @click="handleMenu('#section-why', -100)">Why Choose Us</span>
                      </li>
                      <li>
                        <span @click="handleMenu('#section-coins', -120)">Supported Coins</span>
                      </li>
                      <li>
                        <span @click="handleMenu('#section-masternode')">Our Masternodes</span>
                      </li>
                      <li>
                        <span @click="handleMenu('#section-currency', -80)">Honest / HNST</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div>
                  <a href="https://honestmining.com/blog">Honest Blog</a>
                </div>
                <div v-if="$route.name !== 'faq'">
                  <a href="/faq">FAQ</a>
                </div>
              </nav>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="header--logo">
              <img
                v-if="$route.name === 'index'"
                :src="$assets.logoBlue"
                :srcset="`${ $assets.logoBlue_2x } 2x`"
                alt="Honest Mining"
              >
              <a 
                v-else 
                href="/">
                <img
                  :src="$assets.logoBlue"
                  :srcset="`${ $assets.logoBlue_2x } 2x`"
                  alt="Honest Mining"
                >
              </a>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="header--user header--nav d-none d-lg-flex">
              <a
                v-if="!userData"
                :id="'login_static_'+ticker"
                href="/login"
                class="btn btn-home btn-primary btn-outline border-radius-30px text-uppercase"
              >Login</a>
              <a
                v-if="userData"
                href="/dashboard"
                class="btn btn-home btn-primary btn-outline border-radius-30px text-uppercase"
              >Dashboard</a>

              <div 
                v-if="userData" 
                class="nav-dropdown right-align no-dot">
                <div class="toggle">
                  <span class="avatar">
                    <img 
                      :src="userData.image.avatar" 
                      :srcset="`${ userData.image.avatar } 2x`" 
                      alt >
                  </span>
                </div>
                <div class="menu">
                  <ul>
                   
                    <li>
                      <a href="/setting">Settings</a>
                    
                    </li>
                    <li>
                      <span 
                        class="d-inline-block" 
                        @click="logoutModal()">Logout</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="d-lg-none header--mobile">
          <div class="header--toggle">
            <span class="icon-bar" />
            <span class="icon-bar" />
            <span class="icon-bar" />
          </div>
          <img
            v-if="userData"
            :src="userData.image.avatar"
            :srcset="`${ userData.image.avatar } 2x`"
            alt
          >
        </div>
      </div>
    </header>

    <div class="static-container">
      <nuxt />
    </div>

    <footer 
      id="master-footer" 
      class="master-footer">
      <div class="container">
        <div class="d-flex justify-content-between flex-wrap align-items-start">
          <div class="footer--left footer-col-1">
            <div class="footer--logo">
              <img
                :src="$assets.logoWhite"
                :srcset="`${ $assets.logoWhite_2x } 2x`"
                alt="Honest Mining"
              >
            </div>
            <div class="d-flex flex-nowrap flex-md-wrap flex-xl-nowrap">
              <a
                :id="'signup_footer_static_'+ticker"
                href="/register"
                class="btn btn-yellow btn-sm-lg btn-sm-shorter btn-sm-radius-small border-radius-30px text-uppercase has-shadow mr-lg-2 mr-3 mb-2"
              >Sign Up</a>
              <a
                v-if="!userData"
                :id="'login_footer_static_'+ticker"
                href="/login"
                class="btn btn-white btn-sm-lg btn-sm-shorter btn-sm-radius-small btn-outline border-radius-30px text-uppercase mb-lg-2 mr-3"
              >Login</a>
            </div>
          </div>
          <div class="footer-col-2">
            <ul class="footer--link">
              <li>
                <a 
                  href="#about" 
                  @click.prevent="handleMenu('#section-about', -100)">About</a>
              </li>
              <li>
                <a 
                  href="#feature" 
                  @click.prevent="handleMenu('#section-features', -120)">Features</a>
              </li>
              <li>
                <a 
                  href="#how" 
                  @click.prevent="handleMenu('#section-how', -80)">How It Works</a>
              </li>
              <li>
                <a 
                  href="#why" 
                  @click.prevent="handleMenu('#section-why', -100)">Why Choose Us</a>
              </li>
              <li class="d-lg-none">
                <a 
                  href="#coins" 
                  @click.prevent="handleMenu('#section-coins', -120)">Supported Coins</a>
              </li>
              <li class="d-lg-none">
                <a 
                  href="#masternode" 
                  @click.prevent="handleMenu('#section-masternode')">
                  Honest Mining
                  <span class="d-inline d-md-none">
                    <br >
                  </span> Masternodes
                </a>
              </li>
            </ul>
          </div>
          <div class="footer-col-3">
            <ul class="footer--link">
              <li class="d-none d-lg-block">
                <a 
                  href="#coins" 
                  @click.prevent="handleMenu('#section-coins', -120)">Supported Coins</a>
              </li>
              <li class="d-none d-lg-block">
                <a 
                  href="#masternode" 
                  @click.prevent="handleMenu('#section-masternode')">
                  Honest Mining
                  <span class="d-inline d-md-none">
                    <br >
                  </span> Masternodes
                </a>
              </li>
              <li>
                <a 
                  href="#currency" 
                  @click.prevent="handleMenu('#section-currency', -80)">
                  Honest / HNST
                  <span class="d-inline d-md-none">
                    <br >
                  </span> Token
                </a>
              </li>
              <li>
                <a href="https://honestmining.com/blog">Honest Blog</a>
              </li>
              <li class="d-lg-none">
                <a href="/faq">FAQ</a>
              </li>
              <li class="d-lg-none">
                <a href="/privacy-policy">Privacy Policy</a>
              </li>
              <li class="d-lg-none">
                <a href="/tos">Terms of Service</a>
              </li>
            </ul>
          </div>
          <div class="footer-col-4 d-none d-lg-block">
            <ul class="footer--link">
              <li>
                <a href="/faq">FAQ</a>
              </li>
              <li>
                <a href="/privacy-policy">Privacy Policy</a>
              </li>
              <li>
                <a href="/tos">Terms of Service</a>
              </li>
            </ul>
          </div>
          <div class="footer-col-5">
            <div class="footer--group">
              <h4>Follow Us</h4>

              <ul class="footer--social">
                <li>
                  <a href="https://twitter.com/honestmining">
                    <i class="fab fa-twitter" />
                  </a>
                </li>
                <li>
                  <a href="https://facebook.com/honestmining">
                    <i class="fab fa-facebook-square" />
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com/honestmining">
                    <i class="fab fa-instagram" />
                  </a>
                </li>
              </ul>
            </div>

            <div class="footer--group">
              <h4>Join Our Community</h4>

              <ul class="footer--social">
                <li>
                  <a href="https://t.me/honestmining">
                    <i class="fab fa-telegram-plane" />
                  </a>
                </li>
                <li>
                  <a href="https://medium.com/@honestmining">
                    <i class="fab fa-medium" />
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/honestmining">
                    <i class="fab fa-youtube" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="copyright">
        <div class="container">
          <div>{{ `Copyright © ${ (new Date()).getFullYear() } Honest Mining. All trademarks and copyrights belong to their respective owners.` }}</div>
        </div>
      </div>
    </footer>

    <nav-mobile 
      :user="userData" 
      @handle-menu="handleMenu($event.section, $event.offset)" />

    <modal-logout />
  </div>
</template>

<script>
import Homepage from '~/assets/js/homepage';
import Spark from '~/assets/js/spark';

import splash from '~/components/layouts/splash';
import modalLogout from '~/components/layouts/modalLogout';
import navMobile from '~/components/layouts/navMobileStatic';

if (process.client) {
  require('~/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js');
}

export default {
  head() {
    return {
      htmlAttrs: {
        class: 'font-size-10-px font-size-md-16-px'
      },

      bodyAttrs: {
        class: 'layout-client-static page-static with-mobile-nav'
      }
    };
  },

  components: {
    splash,
    'modal-logout': modalLogout,
    'nav-mobile': navMobile
  },

  data() {
    return {
      ticker: ''
    };
  },

  computed: {
    userData() {
      return this.$store.state.user.user;
    }
  },

  async mounted() {
    await this.$nextTick();

    $(window).scroll();

    Homepage.navDropdowns();
    Homepage.mobileNav();
    Homepage.fixedHeader(this.$refs.masterHeader);
    Spark.generalFunctions();

    this.homeSection();

    this.$store.dispatch('global/toggleSplash', false);
  },

  async created() {
    this.ticker = this.getTickerFromUrl();
  },

  methods: {
    scrollTo(el, offset) {
      Homepage.scrollTo(el, offset);
    },

    handleMenu(section, offset = 0) {
      if (this.$route.name === 'index') {
        let width = window.screen.width;

        if (width <= 575) {
          offset += 50;
        }

        this.scrollTo(section, offset);
      } else {
        window.location.href = `/${section},${offset}`;
      }
    },

    homeSection() {
      if (this.$route.name !== 'index') return;

      if (!this.$route.fullPath.substring(0, 2).includes('#')) return;

      let path = this.$route.fullPath.replace('/', '');

      let section = path.split(',')[0];
      let offset = path.split(',')[1];

      if ($(section).length)
        this.handleMenu(section, offset ? parseInt(offset) : 0);
    },

    logoutModal() {
      $('#logoutModal').modal('toggle');
    },

    getTickerFromUrl() {
      let split_path = this.$route.path.split('/');
      console.log(split_path, 'split');
      return split_path[1];
    }
  }
};
</script>
