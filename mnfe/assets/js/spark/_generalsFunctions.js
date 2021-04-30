export default () => {
  $('[data-toggle="dropdown"]').dropdown();
  $('[data-toggle="tooltip"]').tooltip();

  $('.page-body').css(
    'min-height',
    `calc(100vh - ${$('.top-header').outerHeight(true) +
      $('.navbar').outerHeight(true) +
      $('.site-footer').outerHeight(true)}px)`
  );

  $(document).on('click', '.dropdown-menu', e => e.stopPropagation());

  $('.modal-v2')
    .detach()
    .appendTo('body');

  $('.modal').on('show.bs.modal', () => {
    $('iframe[title="chat widget"]')
      .closest('div')
      .addClass('sr-only');
  });

  $('.modal').on('hidden.bs.modal', () => {
    $('iframe[title="chat widget"]')
      .closest('div')
      .removeClass('sr-only');
  });

  $('body').trigger('click');
};
