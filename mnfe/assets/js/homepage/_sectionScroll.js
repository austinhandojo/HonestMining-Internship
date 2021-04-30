export default () => {
  let $sections = $('.section-scroll');
  let $container = $('.container').first();

  let offset = $container.offset();

  $sections.find('.space-left, .space-right').css('flex-basis', offset.left + 10 + 'px');
}
