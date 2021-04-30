<template>
  <div
    id="nav-mobile"
    class="d-lg-none nav-mobile font-size-14-px"
    style="display: none;">
    <div class="layer" />
    <nav class="overflow-hidden border-radius-20-px border-radius-tl-0 border-radius-bl-0">
      <div class="p-30-px pl-40-px">
        <div class="header--close font-size-30-px h-20-px d-flex justify-content-end">
          <i class="ion ion-ios-close" />
        </div>
        <img
          :src="$assets.logoBlue"
          :srcset="`${ $assets.logoBlue_2x } 2x`"
          class="h-50-px"
          alt >
      </div>

      <ul class="overflow-auto">
        <li
          v-for="menu in navs"
          :key="menu.id"
          :class="{'active': page.nav === menu.id}"
          class="px-40-px"
        >
          <nuxt-link
            :id="'mobile_menu_'+menu.id"
            :to="menu.route"
            class="d-inline-flex align-items-center font-size-4 text-default"
            exact
          >
            <i
              :class="menu.icon"
              class="menu-icon mr-3" />
            <span class="text-uppercase">{{ menu.label }}</span>
          </nuxt-link>
        </li>
        <li class="px-40-px">
          <hr class="border-color-10 my-1" >
        </li>
        <li
          :class="{'active': page.nav === 'account-setting'}"
          class="px-40-px">
          <nuxt-link
            to="/setting"
            class="d-inline-flex align-items-center font-size-4 text-default"
            exact
          >
            <i class="menu-icon hm-icon-gear mr-3" />
            <span class="text-uppercase">Settings</span>
          </nuxt-link>
        </li>
        <li class="px-40-px">
          <span
            class="d-inline-flex align-items-center font-size-4 text-default text-uppercase"
            data-toggle="modal"
            data-target="#logoutModal"
          >
            <i class="menu-icon fas fa-power-off mr-3" /> Sign Out
          </span>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    navs: {
      type: Array,
      default: () => []
    },

    page: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>

<style lang="scss" >
@import '~/assets/style/revs/_variables.scss';
@import '~/assets/style/revs/mixins/_breakpoint.scss';

.layout-client-dashboard.with-mobile-nav {
  .nav-mobile {
    nav {
      width: 100vw;
      left: -100vw;
      background: white;

      ul {
        li.active {
          a {
            color: $color-primary !important;
          }
        }
      }
    }

    &.open {
      nav {
        left: 0;
      }
    }
  }
}

@include breakpoint('md~') {
  .layout-client-dashboard.with-mobile-nav {
    .nav-mobile {
      nav {
        width: 300px;
        left: -300px;
      }
    }
  }
}
</style>
