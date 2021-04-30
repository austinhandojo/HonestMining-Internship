if (process.client) {
  require('~/node_modules/tooltipster/dist/css/tooltipster.bundle.min.css');
  require('~/node_modules/tooltipster/dist/js/tooltipster.bundle.min.js');
}

export default () => {
  let $toolstips = $('[data-toggle="tooltip"]');

  $toolstips.each((index, el) => {
    let $this = $(el);

    let theme = $this.attr('data-theme') || 'blue';
    let side = $this.attr('data-placement');

    let themes = ['tooltipster-noir'];

    themes.push(theme);

    $this.tooltipster({
      trigger: 'custom',
      triggerOpen: {
        mouseenter: true,
        tap: true
      },
      triggerClose: {
        mouseleave: true,
        tap: true
      },
      side: side || 'right',
      delay: [100, 100],
      delayTouch: [100, 100],
      theme: themes,
      arrow: false,
      maxWidth: 200
    });
  });
};
