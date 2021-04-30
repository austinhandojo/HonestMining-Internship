<template>
  <div class="top-wrapper bg-primary">
    <div class="container-fluid mt-3 mt-lg-0">
      <div class="top-header py-0 pt-lg-4 mb-lg-4">
        <img
          :src="$assets.logoWhiteAlpha"
          :srcset="$assets.logoWhiteAlpha_2x"
          class="logo-img cursor-pointer d-none d-lg-block"
          @click="toHome()"
        >
        <span
          class="d-flex align-items-center d-lg-none font-size-25-px h-25-px"
          @click="toHome()">
          <i class="hm-icon-brand text-white" />
        </span>
      </div>

      <nav
        class="navbar navbar-spark navbar-toggleable navbar-expand-md bg-primary py-0 pb-lg-50-px"
      >
        <div class="d-block d-lg-flex w-100 justify-content-between align-items-start">
          <div class="navbar-brand d-none d-lg-inline-block">
            <div class="page-title-wrapper">
              <h1 class="page-title">{{ page.title }}</h1>

              <header-breadcrumb :page="page" />
            </div>
          </div>

          <div class="header-content">
            <div class="row">
              <div class="col-0 col-lg-8 d-flex justify-content-end">
                <header-balances />
              </div>

              <div class="col-12 col-lg-4 d-flex justify-content-end">
                <ul class="nav navbar-nav d-flex justify-content-end flex-nowrap">
                  <header-wallet :page="page" />
                  <header-notif />
                  <header-user class="d-none d-lg-block" />
                  <button
                    type="button"
                    class="sidebar-open d-lg-none m-0 p-0 ml-3 d-flex flex-column align-items-end justify-content-center"
                  >
                    <span class="icon-bar" />
                    <span class="icon-bar w-15-px mt-5-px" />
                    <span class="icon-bar mt-5-px" />
                  </button>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div class="page-title-mobile w-100 d-lg-none">
        <h1 class="font-weight-normal font-size-6">{{ page.title }}</h1>

        <header-breadcrumb
          :page="page"
          class="mb-2" />
      </div>
    </div>
  </div>
</template>

<script>
import headerBreadcrumb from '~/components/layouts/headerBreadcrumb';
import headerBalances from '~/components/layouts/headerBalances';
import headerUser from '~/components/layouts/headerUser';
import headerNotif from '~/components/layouts/headerNotif';
import headerWallet from '~/components/layouts/headerWallet';

export default {
  components: {
    'header-breadcrumb': headerBreadcrumb,
    'header-balances': headerBalances,
    'header-user': headerUser,
    'header-notif': headerNotif,
    'header-wallet': headerWallet
  },

  props: {
    page: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    user() {
      return this.$store.state.user.user;
    }
  },

  methods: {
    toHome() {
      window.location.href = '/';
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~/assets/style/revs/mixins/_breakpoint.scss';
@import '~/assets/style/revs/_variables.scss';

.navbar {
  padding-bottom: 5rem;
}

.navbar-brand,
.navbar-nav {
  width: 240px;
  margin-top: 5px;
}

.navbar-brand {
  padding: 0;
  margin: 0;
}

.top-header {
  padding-bottom: 1.5rem;
}

@include breakpoint('to-md') {
  .top-wrapper {
    display: flex;
    justify-content: space-between;
    background: $color-primary;
    align-items: center;
    flex-wrap: wrap;
    padding-bottom: 40px;
  }

  .navbar-brand,
  .navbar-nav {
    width: auto;
    margin-top: 0;
  }

  .page-title-mobile {
    color: white;

    h1 {
      font-size: 24px;
    }
  }
}
</style>

<style lang="scss">
@import '~/assets/style/revs/mixins/_breakpoint.scss';

.header-dropdown-icon {
  height: 24px;
  width: 24px;
  object-fit: contain;
}

.nav-muted {
  .header-dropdown-icon {
    opacity: 0.5;
  }
}

.navbar-spark {
  .avatar {
    margin: 0;
    position: relative;
    z-index: 2;
  }

  .navbar-nav {
    .nav-item {
      height: 30px;
    }

    .nav-link {
      padding: 0 !important;
      border: 0 !important;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-left: 20px;
      height: 100%;

      &[aria-expanded='true'] {
        position: relative;
        z-index: 2;

        &:after {
          content: '';
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: white;
          position: absolute;
          top: calc(100% + 3px);
          left: calc(50% - 2.5px);
          display: block;
          border: 0;
          margin: 0;
        }

        &:before {
          content: '';
          width: 20px;
          height: 20px;
          border-radius: 4px;
          background: white;
          position: absolute;
          top: calc(100% + 15px);
          left: auto;
          transform: rotate(45deg);
        }
      }
    }
  }

  .dropdown-menu {
    margin-top: 20px !important;
    margin-right: -25px;
    border: 0;
    border-radius: 6px !important;
    box-shadow: 4px 8px 8px 0px rgba(black, 0.05) !important;

    .dropdown-item {
      &:hover,
      &:focus {
        background: transparent;
      }
    }
  }
}

@include breakpoint('to-md') {
  .header-dropdown-icon {
    width: 22px;
    height: 22px;
  }

  .navbar-nav {
    padding-top: 0 !important;

    .nav-link {
      &[aria-expanded='true'] {
        &:before {
          border-radius: 2px !important;
        }
      }
    }
  }

  .page-title-mobile {
    margin-top: 10px;
  }
}

@include breakpoint('~sm') {
  .navbar-spark {
    .navbar-nav {
      .nav-item {
        position: static !important;
        height: 32px !important;
      }
    }

    .dropdown-md {
      width: calc(100vw - 10px) !important;
      margin-right: 0 !important;
      left: auto !important;
      right: 5px !important;
      margin-top: 20px !important;
      border-radius: 4px !important;
    }
  }
}
</style>
