<template>
  <div
    :class="{'active': $store.state.global.splash || !$store.state.global.loaded}"
    class="splash"
  >
    <div class="icon"/>
  </div>
</template>

<style lang="scss" scoped>
.splash {
  .icon {
    transition-delay: 1s;
    transition-timing-function: cubic-bezier(1, 0, 0, 1);

    &:after {
      box-sizing: border-box;
      position: absolute;
      left: 50%;
      display: block;
      border: 6px solid #fff;
      border-radius: 50%;
      content: '';
      top: 50%;
      margin-left: -28px;
      margin-top: -28px;
      width: 56px;
      height: 56px;
      border-top-color: rgba(0, 0, 0, 0.2);
      animation: pace-theme-corner-indicator-spin 1.2s linear infinite;
      opacity: 0;
      transition: opacity 0s 1s;
    }
  }

  &.active {
    .icon {
      transition-delay: 0s;
      transition: 0s;

      &:after {
        opacity: 1;
        transition: 0s;
      }
    }
  }
}
</style>


