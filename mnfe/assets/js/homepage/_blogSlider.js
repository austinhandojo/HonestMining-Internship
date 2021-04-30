export default () => {
  let $slider = $('.blog--group .section-scroll');

  let length = $slider.children().length;

  $slider.on('init', () => {
    setTimeout(() => {
      $slider.slick('slickRemove', length - 1).slick('slickRemove', 0);
      $slider.find('.blog--wrapper').css('height', $slider.find('.slick-list').height());
    });
  });

  $slider.slick({
    slidesToShow: 1,
    infinite: false,
    focusOnSelect: false,
    arrows: false,
    centerMode: true,
    dots: true,
    responsive: [{
      breakpoint: 9999,
      settings: 'unslick'
    },
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 1,
        centerPadding: 0
      }
    }]
  });
};
