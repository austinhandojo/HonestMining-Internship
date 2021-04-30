<template>
  <div class="page-sidebar toggled sidebar d-none d-lg-block">
    <nav class="sidebar-collapse d-none d-lg-block">
      <i class="ion ion-ios-arrow-forward show-on-collapsed" />
      <i class="ion ion-ios-arrow-back hide-on-collapsed" />
    </nav>

    <ul 
      id="sidebar-stacked" 
      class="nav nav-pills nav-stacked mainNav d-none d-lg-block">
      <li class="d-lg-none">
        <a 
          href="#" 
          class="sidebar-close">
          <i class="ion ion-ios-arrow-back" />
        </a>
      </li>
      <li
        v-for="menu in navs"
        :key="menu.id"
        :id="'sidebar_menu_'+menu.id"
        :class="{'active': page.nav === menu.id}"
        class="nav-item"
      >
        <nuxt-link
          :to="menu.route"
          :target="menu.target"
          class="nav-link font-size-16-px py-2 d-inline-flex align-items-center"
          style="height: 35px;"
          exact
        >
          <i :class="menu.icon" />
          <span class="nav-text text-uppercase font-size-14-px ml-3 mt-1">{{ menu.label }}</span>
        </nuxt-link>
      </li>
    </ul>
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

<style lang="scss" scoped>
@import '~/assets/style/revs/_variables.scss';

.mainNav {
  .nav-item {
    .nav-link {
      color: $color-font;

      &:hover {
        color: $color-primary;
      }
    }

    &.active {
      .nav-link {
        color: $color-primary;
      }
    }
  }
}
</style>
