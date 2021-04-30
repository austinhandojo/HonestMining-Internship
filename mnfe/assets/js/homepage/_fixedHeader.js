export default (el) => {
  if (process.client) {
    $(window).unbind('scroll.header').bind('scroll.header', () => {
      let scroll = $(window).scrollTop();

      if (scroll > 10) {
        $(el).addClass('stick');
      }
      else {
        $(el).removeClass('stick');
      }
    });
  }
}
