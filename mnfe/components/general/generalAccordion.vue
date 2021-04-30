<template>
  <div>
    <div ref="panel">
      <slot
        :collapsed="collapsed"
        name="panel" />
    </div>
    <div
      :style="style"
      style="transition: height 0.3s; overflow: hidden;">
      <div ref="content">
        <slot
          :collapsed="collapsed"
          name="content" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      collapsed: false
    };
  },

  computed: {
    style() {
      let contentHeight = this.$refs.content
        ? this.$refs.content.clientHeight
        : 0;

      return {
        height: this.collapsed ? `${contentHeight}px` : 0
      };
    }
  },

  methods: {
    toggle(mode) {
      if (!mode) this.collapsed = !this.collapsed;

      if (mode === 'open') this.collapsed = true;

      if (mode === 'close') this.collapsed = false;
    }
  }
};
</script>
