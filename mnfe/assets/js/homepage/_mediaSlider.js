export default () => {
  let $slider = $('.section-media .media--slider .slider');

  let $prev = $('.media--slider .slider-prev');
  let $next = $('.media--slider .slider-next');

  $slider.slick({
    slidesToShow: 5,
    infinite: true,
    centerMode: true,
    focusOnSelect: false,
    arrows: false,
    responsive: [{
      breakpoint: 1600,
      settings: {
        slidesToShow: 5,
        infinite: true
      }
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        infinite: true
      }
    },
    {
      breakpoint: 575,
      settings: {
        slidesToShow: 2,
        infinite: true
      }
    }]
  });

  $prev.on('click', () => $slider.slick('prev'));
  $next.on('click', () => $slider.slick('next'))
}
