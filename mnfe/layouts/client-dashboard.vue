<template>
  <div>
    <splash :show="$global.splash" />

    <nav-mobile
      :navs="menus"
      :page="page" />

    <div class="wrapper">
      <top-header :page="page" />

      <div class="content">
        <div class="page-body">
          <div class="container-fluid d-flex">
            <page-sidebar
              :navs="menus"
              :page="page" />

            <div class="page-content">
              <nuxt />
            </div>
          </div>
        </div>
      </div>

      <footer class="site-footer text-center font-size-12-px font-size-lg-4">
        <div class="container">
          Copyright © {{ (new Date()).getFullYear() }} Honest Mining.
          <span
            class="d-none d-lg-inline"
          >All trademarks and copyrights belong to their respective owners.</span>
        </div>
      </footer>

      <modal-logout />
    </div>
  </div>
</template>

<script>
import Spark from '~/assets/js/spark';

import navMobile from '~/components/layouts/navMobile';
import topHeader from '~/components/layouts/topHeader';
import pageSidebar from '~/components/layouts/pageSidebar';
import modalLogout from '~/components/layouts/modalLogout';

if (process.client) {
  require('~/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js');
}

export default {
  head() {
    return {
      bodyAttrs: {
        class: 'layout-client-dashboard with-mobile-nav'
      }
    };
  },

  middleware: 'authenticate',

  components: {
    'nav-mobile': navMobile,
    'top-header': topHeader,
    'page-sidebar': pageSidebar,
    'modal-logout': modalLogout
  },

  data() {
    return {
      menus: [
        {
          id: 'dashboard',
          icon: 'hm-icon-home',
          label: 'Dashboard',
          route: '/dashboard'
        },
        {
          id: 'stake-coin',
          icon: 'hm-icon-nodes',
          label: 'Stake Coin',
          route: '/join'
        },
        {
          id: 'masternode-my',
          icon: 'hm-icon-briefcase',
          label: 'Stakefolio',
          route: '/stakefolio'
        },
        // {
        //   id: 'masternode-information',
        //   icon: 'fas fa-chart-area',
        //   label: 'MN Information',
        //   route: '/masternode-information'
        // },
        {
          id: 'wallet',
          icon: 'hm-icon-wallet',
          label: 'Wallet',
          route: '/wallet'
        },
        {
          id: 'swap',
          icon: 'hm-icon-arrow-swap',
          label: 'HNST Swap',
          route: '/swap'
        },
        {
          id: 'tx',
          icon: 'hm-icon-file-search',
          label: 'TX History',
          route: '/tx'
        },
        {
          id: 'referral',
          icon: 'hm-icon-chain',
          label: 'Referral',
          route: '/referral'
        },
        {
          id: 'faq',
          icon: 'hm-icon-question-mark',
          label: 'FAQ',
          route: '/faq',
          target: '_blank'
        }
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

  watch: {
    $route: {
      async handler() {
        let $navs = $('#sidebar-stacked').find('a.nav-link');

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

    if (!this.$nuxt.$options.context.isDev) {
      let index = this.menus.findIndex(item => item.id === 'swap');

      this.$delete(this.menus, index);
    }
  },

  async mounted() {
    await this.$nextTick();

    Spark.generalFunctions();
    Spark.createSidebar();
    Spark.mobileNav();

    this.$store.dispatch('global/toggleSplash', false);
  }
};
</script>

<style lang="scss" scoped>
@import '~/assets/style/revs/mixins/_breakpoint.scss';

.mainNav .nav-item.active .nav-link {
  &:hover,
  &:focus {
    color: #1e97d4;
  }
}

.logo-img {
  cursor: pointer;
}

.nav-muted {
  opacity: 0.5;
  cursor: default;
}

.text-bold {
  font-weight: 700;
}

@include breakpoint('to-md') {
  .page-content {
    margin-top: -35px;
  }
}


</style>

<style lang="scss">
@import '~/assets/style/revs/mixins/_breakpoint.scss';

@include breakpoint('md~') {
  .page-content {
    margin-top: -40px;
  }

  .page-sidebar {
    margin-top: -40px;
  }
}
</style>




