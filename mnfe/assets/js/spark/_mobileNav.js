export default (mode) => {
  let $menu = $('.nav-mobile');
  let $toggle = $('.sidebar-open');
  let $close = $('.header--close');

  let open = () => {
    $menu.show().addClass('open');
  };

  let close = () => {
    $menu.removeClass('open');

    setTimeout(() => {
      $menu.hide();
    }, 200);
  };

  if (mode === 'open') {
    return open();
  }

  if (mode === 'close') {
    return close();
  }

  $toggle.on('click', () => {
    open();
  });

  $close.on('click', () => {
    close();
  });
}
