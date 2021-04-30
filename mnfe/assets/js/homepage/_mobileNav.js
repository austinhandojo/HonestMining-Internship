export default () => {
  let $menu = $('.nav-mobile');
  let $toggle = $('.header--toggle');
  let $close = $('.header--close, .nav-mobile .layer');

  $toggle.on('click', () => {
    $menu.show().addClass('open');
  });

  $close.on('click', () => {
    $menu.removeClass('open');

    setTimeout(() => {
      $menu.hide();
    }, 200);
  });
};
