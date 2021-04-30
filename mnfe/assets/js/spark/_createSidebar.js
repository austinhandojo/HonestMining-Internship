export default () => {
  $('.sidebar-collapse').on('click', () => {
    $('.page-body').toggleClass('collapsed');
  });

  $('.sidebar-open').on('click', () => {
    $('.page-sidebar').removeClass('toggled');
  });

  $('.sidebar-close').on('click', () => {
    $('.page-sidebar').addClass('toggled');
  });

  $('.nav-stacked').on('show.bs.collapse', () => {
    $('.nav-stacked .in').collapse('hide');
  });
};
