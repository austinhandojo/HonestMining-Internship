export default () => {
  $('.widget-minify').on('click', e => {
    e.preventDefault();

    let $this = $(e.currentTarget);

    $this.closest('.widget').toggleClass('collapsed');
    $this.find('i').toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
  });

  $('.widget-close').on('click', e => {
    e.preventDefault();

    let $this = $(e.currentTarget);

    $this.closest('.widget').hide();
  });
}
