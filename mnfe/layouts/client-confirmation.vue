<template>
  <div>
    <div 
      ref="splash" 
      class="splash active">
      <div class="icon"/>
    </div>

    <div 
      id="nav-mobile" 
      class="d-lg-none nav-mobile" 
      style="display: none;">
      <div class="layer"/>
      <nav>
        <div class="logo alpha">
          <img 
            :src="$assets.logoWhiteAlpha" 
            :srcset="`${ $assets.logoWhiteAlpha_2x } 2x`" 
            alt>
          <div class="header--close">
            <i class="ion ion-ios-arrow-back"/>
          </div>
        </div>

        <ul>
          <li class="has-border"/>

          <li>
            <a
              href="#"
              class="has-border menu-link"
              data-toggle="modal"
              data-target="#logoutModal"
            >Logout</a>
          </li>
        </ul>
      </nav>
    </div>

    <div class="container">
      <div class="wrapper d-flex justify-content-center align-items-center">
        <div class="top-header w-100 d-flex bg-primary">
          <div class="container d-flex align-items-center justify-content-between">
            <button 
              type="button" 
              class="sidebar-open">
              <span class="icon-bar"/>
              <span class="icon-bar"/>
              <span class="icon-bar"/>
            </button>
            <img
              :src="$assets.logoWhiteAlpha"
              :srcset="$assets.logoWhiteAlpha_2x"
              class="logo-img alpha"
              @click="toHome()"
            >
            <a
              href="#"
              data-toggle="modal"
              data-target="#logoutModal"
              class="btn btn-home btn-logout border-radius-30px text-uppercase"
            >Logout</a>
          </div>
        </div>
        <div class="content">
          <nuxt/>
        </div>
        

        
        <modal-logout />
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import Spark from '~/assets/js/spark';
import Lodash from 'lodash';
import modalLogout from '~/components/layouts/modalLogout';

if (process.client) {
  window.jQuery = $;

  require('~/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js');
}

export default {
  head() {
    return {
      bodyAttrs: {
        class:
          'main-section layout-client-confirmation with-mobile-nav bg-curve bg-clouds'
      }
    };
  },
  components: {
    'modal-logout': modalLogout
  },

  data() {
    return {
      menus: [
        {
          id: 'dashboard',
          icon: 'fas fa-home',
          label: 'Dashboard',
          route: '/dashboard'
        },
        {
          id: 'stake-coin',
          icon: 'fab fa-hubspot',
          label: 'Stake Coin',
          route: '/stakecoin'
        },
        {
          id: 'masternode-my',
          icon: 'fas fa-boxes',
          label: 'Stakefolio',
          route: '/stakefolio'
        },
        {
          id: 'masternode-information',
          icon: 'fas fa-chart-area',
          label: 'MN Information',
          route: '/masternode-information'
        },
        {
          id: 'wallet',
          icon: 'fas fa-wallet',
          label: 'Wallet',
          route: '/wallet'
        },
        {
          id: 'referral',
          icon: 'fas fa-link',
          label: 'Referral & Vouchers',
          route: '/referral'
        },
        {
          id: 'faq',
          icon: 'fas fa-question-circle',
          label: 'FAQ',
          route: '/faq'
        },
        // {
        //   id: 'support',
        //   icon: 'fas fa-life-ring',
        //   label: 'Support',
        //   route: '/support'
        // }
      ],
      page: {
        title: '',
        subtitle: '',
        nav: ''
      }
    };
  },

  computed: {
    user() {
      let user = {
        image: {
          avatar: null
        }
      };

      if (this.$store.state.user.user) {
        user = { ...user, ...this.$store.state.user.user };
      }

      return user;
    },

    notifications() {
      if (Array.isArray(this.$store.state.notification.notification)) {
        return Lodash.orderBy(
          JSON.parse(
            JSON.stringify(this.$store.state.notification.notification)
          ),
          ['is_read', 'id'],
          ['asc', 'desc']
        );
      }

      return [];
    },

    unreadNotif() {
      return this.notifications.filter(item => !item.is_read);
    },

    wallets() {
      if (!Array.isArray(this.$store.state.wallet.wallet_header)) return [];

      let data = JSON.parse(
        JSON.stringify(this.$store.state.wallet.wallet_header)
      );

      data = Lodash.orderBy(
        data,
        ['coin.shown_index', 'coin.ticker'],
        ['asc', 'asc']
      );

      data = data.map(item => {
        item.amount_available_formated =
          Math.round(item.amount_available * Math.pow(10, 8)) / Math.pow(10, 8);
        item.amount_available_formated_localed = item.amount_available_formated
          ? item.amount_available_formated.toLocaleString('en')
          : item.amount_available_formated;

        return item;
      });

      return data;
    },

    totalWalletHeader() {
      let data = this.$store.state.wallet.wallet_total;

      let totalWallet = data ? data.amount_hnst_total : null;

      return totalWallet
        ? (
            Math.round(parseFloat(totalWallet) * Math.pow(10, 8)) /
            Math.pow(10, 8)
          ).toLocaleString('en')
        : 0;
    }
  },

  watch: {
    $route: {
      async handler() {
        let $navs = $(this.$refs.sidebar).find('a.nav-link');

        await this.$nextTick();

        $navs.blur();
        Spark.mobileNav('close');
      },
      deep: true
    }
  },

  created() {
    this.$root.$on('page::updated', page => {
      this.page = { ...this.page, ...page };
    });
  },

  async mounted() {
    await this.$nextTick();

    $(this.$refs.splash).removeClass('active');

    Spark.generalFunctions();
    Spark.createSidebar();
    Spark.mobileNav();

    $(this.$refs.notifDropdown).on('hidden.bs.dropdown', async () => {
      if (!this.unreadNotif.length) return;

      let ids = this.notifications
        .filter(notif => !notif.is_read)
        .map(notif => notif.id);

      await this.$store.dispatch('readNotification', ids.join(','));

      this.$store.dispatch('forceReadNotif', ids);
    });
  },

  methods: {
    toHome() {
      window.location.href = '/';
    }

    // async logout() {
    //   let logout = await this.$store.dispatch('postLogout');

    //   if (logout.status === true) {
    //     window.location.href = '/login';
    //   }
    //   // else {
    //   //   Swal(this.logout.message, '', 'error');
    //   // }
    // }
  }
};
</script>

<style lang="scss" scoped>
.mainNav .nav-item.active .nav-link {
  &:hover,
  &:focus {
    color: #1e97d4;
  }
}

.logo-img {
  cursor: pointer;
}

.icon-wallet {
  height: 22px;
  width: auto;
  margin-left: 8px;
}

.nav-muted {
  opacity: 0.5;
  cursor: default;
}

.text-bold {
  font-weight: 700;
}
</style>




