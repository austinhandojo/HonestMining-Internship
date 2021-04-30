if (process.client) {
  require('~/node_modules/jquery-ui/ui/effect.js');
}

export default (anchor, offset = 0) => {
  let $anchor = $(anchor);

  if (!$anchor.length) {
    return;
  }

  let top = ($anchor.offset()).top;

  $('html, body').animate({
    scrollTop: top + offset + 1
  }, 800, 'easeInOutExpo');

  $('body').trigger('click');

  let $menu = $('.nav-mobile');

  $menu.removeClass('open');

  setTimeout(() => {
    $menu.hide();
  }, 200);
};
