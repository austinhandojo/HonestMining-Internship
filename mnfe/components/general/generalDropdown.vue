<template>
  <div 
    v-click-outside="close" 
    class="d-inline-block position-relative">
    <span
      :class="{'active': open}"
      class="d-inline-block cursor-pointer text-primary bg-white dropdown-trigger border-color-primary"
      @click="toggle()"
    >{{ label }}</span>
    <div
      v-show="open"
      :class="slotClass"
      :style="slotStyle"
      class="border-color-primary p-3 position-absolute dropdown-slot"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },

    align: {
      type: String,
      default: 'right'
    },

    width: {
      type: String,
      default: ''
    },

    classes: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      open: false
    };
  },

  computed: {
    slotClass() {
      return 'align-' + this.align + ' ' + this.classes;
    },

    slotStyle() {
      if (this.width) {
        return {
          minWidth: this.width + 'px'
        };
      }

      return '';
    }
  },

  watch: {
    open(val) {
      if (val) {
        this.$emit('show');
      } else {
        this.$emit('hide');
      }
    }
  },

  methods: {
    toggle(method) {
      if (method == 'hide') return (this.open = false);
      if (method == 'open') return (this.open = true);

      this.open = !this.open;
    },

    close() {
      this.toggle('hide');
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~/assets/style/revs/mixins/_breakpoint.scss';

.dropdown-trigger {
  border: 1px solid transparent;
  padding: 0 20px;
  border-radius: 4px;
  user-select: none;

  &.active {
    border-bottom-right-radius: 0 !important;
    border-bottom-left-radius: 0 !important;

    &:before {
      content: '';
      width: calc(100% - 2px);
      height: 1px;
      background-color: white;
      bottom: 0;
      left: 1px;
      position: absolute;
      z-index: 2;
    }
  }
}

.dropdown-slot {
  min-width: 200px;
  top: calc(100% - 1px);
  background-color: white !important;
  border: 1px solid transparent;
  border-radius: 4px;

  &.align-right {
    right: 0;
    border-top-right-radius: 0;
  }

  &.align-left {
    left: 0;
    border-top-left-radius: 0;
  }
}
</style>
