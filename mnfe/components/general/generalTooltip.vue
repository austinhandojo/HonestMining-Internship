<template>
  <div 
    ref="tooltip" 
    class="d-inline-block cursor-pointer">
    <slot/>
  </div>
</template>

<script>
if (process.client) {
  require('~/node_modules/tooltipster/dist/js/tooltipster.bundle.min.js');
}

export default {
  props: {
    content: {
      type: String,
      default: ''
    },

    theme: {
      type: String,
      default: ''
    },

    placement: {
      type: String,
      default: 'right'
    },

    width: {
      type: String,
      default: '200'
    }
  },

  async mounted() {
    await this.$nextTick();

    let themes = ['tooltipster-noir', 'tooltip', 'blue'];

    themes.push(this.theme);

    $(this.$refs.tooltip).tooltipster({
      trigger: 'custom',
      triggerOpen: {
        mouseenter: true,
        tap: true
      },
      triggerClose: {
        mouseleave: true,
        tap: true
      },
      distance: 14,
      content: this.content,
      side: this.placement,
      delay: [100, 100],
      delayTouch: [100, 100],
      theme: themes,
      arrow: false,
      maxWidth: parseInt(this.width),
      minWidth: 40
    });
  },

  destroyed() {
    $(this.$refs.tooltip).tooltipster('destroy');
  }
};
</script>

<style src="~/node_modules/tooltipster/dist/css/tooltipster.bundle.min.css"/>
