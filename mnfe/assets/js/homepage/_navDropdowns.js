export default () => {
  let $navs = $('.nav-dropdown');

  $navs.each((index, el) => {
    let $this = $(el);

    $this.find('.toggle').on('click', e => {
      e.stopPropagation();

      $navs.not($this).removeClass('open');
      $this.toggleClass('open');
    });

    $this.find('.menu').on('click', e => {
      e.stopPropagation();
    });
  });

  $('body').on('click', () => {
    $navs.removeClass('open');
  });
};
