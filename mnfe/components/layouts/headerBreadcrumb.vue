<template>
  <div
    v-if="page.breadcrumb"
    class="page-breadcrumb">
    <div class="bc-item">
      <nuxt-link
        to="/dashboard"
        exact>
        <i class="hm-icon-home"/>
      </nuxt-link>
    </div>
    <div
      v-for="(bc, index) in page.breadcrumb"
      :key="index"
      :class="{'active': bc.active}"
      class="bc-item"
    >
      <nuxt-link
        v-if="bc.link"
        :to="bc.link"
        exact>{{ bc.label }}</nuxt-link>
      <span v-else>{{ bc.label }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    page: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~/assets/style/revs/_variables.scss';

.page-breadcrumb {
  display: flex;
  align-items: center;

  .bc-item {
    font-size: 14px;
    opacity: 0.95;

    &:not(:first-child) {
      margin-left: 15px;

      &:before {
        content: '/';
        color: white;
        position: relative;
        left: -7.5px;
      }
    }

    a,
    span {
      color: white;

      &:focus,
      &:active {
        text-decoration: none;
      }
    }

    &.active {
      a,
      span {
        color: $color-yellow;
      }
    }
  }
}
</style>
